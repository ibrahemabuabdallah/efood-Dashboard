import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ])

    const newOrdersCount = await Order.countDocuments({ orderStatus: 'pending' })

    const totalProducts = await Product.countDocuments({ isActive: true })

    const lowStockProducts = await Product.countDocuments({
      isActive: true,
      stock: { $lte: 10 }
    })

    const totalCustomers = await User.countDocuments({ role: 'user' })

    const newCustomers = await User.countDocuments({
      role: 'user',
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    })

    res.json({
      totalSales: totalSales[0]?.total || 0,
      newOrdersCount,
      totalProducts,
      lowStockProducts,
      totalCustomers,
      newCustomers
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    res.status(500).json({ message: 'حدث خطأ في جلب الإحصائيات' })
  }
}

/**
 * Get all orders (Admin)
 */
export const getAllOrders = async (req, res) => {
  try {
    const { status, limit = 20, page = 1 } = req.query
    const query = {}

    if (status) {
      query.orderStatus = status
    }

    const skip = (Number(page) - 1) * Number(limit)

    const orders = await Order.find(query)
      .populate('user', 'phone name')
      .populate('items.product', 'nameAr')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip)

    const total = await Order.countDocuments(query)

    res.json({
      orders,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    res.status(500).json({ message: 'حدث خطأ في جلب الطلبات' })
  }
}

/**
 * Get all users (Admin)
 */
export const getAllUsers = async (req, res) => {
  try {
    const { role, limit = 20, page = 1 } = req.query
    const query = {}

    if (role) {
      query.role = role
    }

    const skip = (Number(page) - 1) * Number(limit)

    const users = await User.find(query)
      .select('-verificationCode -codeExpiry')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip)

    const total = await User.countDocuments(query)

    res.json({
      users,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ message: 'حدث خطأ في جلب المستخدمين' })
  }
}

/**
 * Get sales report
 */
export const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query

    const matchQuery = { paymentStatus: 'paid' }
    if (startDate || endDate) {
      matchQuery.createdAt = {}
      if (startDate) matchQuery.createdAt.$gte = new Date(startDate)
      if (endDate) matchQuery.createdAt.$lte = new Date(endDate)
    }

    // Monthly sales
    const monthlySales = await Order.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ])

    // Top products
    const topProducts = await Order.aggregate([
      { $match: matchQuery },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      }
    ])

    res.json({
      monthlySales,
      topProducts
    })
  } catch (error) {
    console.error('Error fetching sales report:', error)
    res.status(500).json({ message: 'حدث خطأ في جلب التقرير' })
  }
}
