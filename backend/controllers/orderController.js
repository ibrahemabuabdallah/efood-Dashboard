import Order from '../models/Order.js'
import Product from '../models/Product.js'

/**
 * Create new order
 */
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, couponCode, notes } = req.body
    const userId = req.user._id

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'السلة فارغة' })
    }

    // Calculate totals and validate products
    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.product)
      if (!product || !product.isActive) {
        return res.status(400).json({ message: `المنتج ${item.product} غير موجود` })
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `المخزون غير كافي للمنتج ${product.nameAr}` })
      }

      const price = product.discountPrice || product.price
      const itemTotal = price * item.quantity
      totalAmount += itemTotal

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price
      })

      // Update stock
      product.stock -= item.quantity
      await product.save()
    }

    // Apply discount if coupon exists
    let discount = 0
    if (couponCode) {
      // TODO: Implement coupon validation
      // discount = calculateCouponDiscount(couponCode, totalAmount)
    }

    // Calculate shipping (default 0 for now)
    const shippingCost = 0

    // Create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'cash',
      couponCode,
      discount,
      shippingCost,
      notes,
      orderStatus: 'pending',
      paymentStatus: 'pending'
    })

    const populatedOrder = await Order.findById(order._id)
      .populate('items.product', 'nameAr images')
      .populate('user', 'phone name')

    res.status(201).json({
      message: 'تم إنشاء الطلب بنجاح',
      order: populatedOrder
    })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ message: 'حدث خطأ في إنشاء الطلب' })
  }
}

/**
 * Get user orders
 */
export const getOrders = async (req, res) => {
  try {
    const userId = req.user._id
    const orders = await Order.find({ user: userId })
      .populate('items.product', 'nameAr images')
      .sort({ createdAt: -1 })

    res.json({ orders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    res.status(500).json({ message: 'حدث خطأ في جلب الطلبات' })
  }
}

/**
 * Get single order
 */
export const getOrder = async (req, res) => {
  try {
    const userId = req.user._id
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'nameAr images descriptionAr')
      .populate('user', 'phone name')

    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' })
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'غير مصرح' })
    }

    res.json({ order })
  } catch (error) {
    console.error('Error fetching order:', error)
    res.status(500).json({ message: 'حدث خطأ في جلب الطلب' })
  }
}

/**
 * Update order status (Admin only)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'حالة الطلب غير صحيحة' })
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    ).populate('items.product', 'nameAr')
      .populate('user', 'phone name')

    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' })
    }

    res.json({
      message: 'تم تحديث حالة الطلب بنجاح',
      order
    })
  } catch (error) {
    console.error('Error updating order status:', error)
    res.status(500).json({ message: 'حدث خطأ في تحديث حالة الطلب' })
  }
}

/**
 * Cancel order
 */
export const cancelOrder = async (req, res) => {
  try {
    const userId = req.user._id
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' })
    }

    if (order.user.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'غير مصرح' })
    }

    if (order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') {
      return res.status(400).json({ message: 'لا يمكن إلغاء هذا الطلب' })
    }

    // Restore stock
    for (const item of order.items) {
      const product = await Product.findById(item.product)
      if (product) {
        product.stock += item.quantity
        await product.save()
      }
    }

    order.orderStatus = 'cancelled'
    await order.save()

    res.json({ message: 'تم إلغاء الطلب بنجاح' })
  } catch (error) {
    console.error('Error cancelling order:', error)
    res.status(500).json({ message: 'حدث خطأ في إلغاء الطلب' })
  }
}
