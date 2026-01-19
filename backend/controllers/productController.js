import Product from '../models/Product.js'
import Category from '../models/Category.js'

/**
 * Get all products with filters
 */
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      country,
      minPrice,
      maxPrice,
      rating,
      sort = 'newest',
      limit = 20,
      page = 1
    } = req.query

    const query = { isActive: true }

    // Category filter
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category })
      if (categoryDoc) {
        query.category = categoryDoc._id
      }
    }

    // Country filter
    if (country) {
      query.country = country
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) }
    }

    // Sort
    let sortOption = {}
    switch (sort) {
      case 'newest':
        sortOption = { createdAt: -1 }
        break
      case 'price-low':
        sortOption = { price: 1 }
        break
      case 'price-high':
        sortOption = { price: -1 }
        break
      case 'rating':
        sortOption = { rating: -1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }

    const skip = (Number(page) - 1) * Number(limit)

    const products = await Product.find(query)
      .populate('category', 'nameAr slug')
      .sort(sortOption)
      .limit(Number(limit))
      .skip(skip)

    const total = await Product.countDocuments(query)

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ message: 'حدث خطأ في جلب المنتجات' })
  }
}

/**
 * Get single product
 */
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'nameAr slug')
      .populate('reviews')

    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'المنتج غير موجود' })
    }

    res.json({ product })
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ message: 'حدث خطأ في جلب المنتج' })
  }
}

/**
 * Create product (Admin only)
 */
export const createProduct = async (req, res) => {
  try {
    const productData = req.body

    // Handle images upload (if using multer)
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(file => file.path)
    }

    const product = await Product.create(productData)

    res.status(201).json({
      message: 'تم إنشاء المنتج بنجاح',
      product
    })
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ message: 'حدث خطأ في إنشاء المنتج' })
  }
}

/**
 * Update product (Admin only)
 */
export const updateProduct = async (req, res) => {
  try {
    const productData = req.body

    // Handle images upload
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(file => file.path)
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    ).populate('category', 'nameAr slug')

    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' })
    }

    res.json({
      message: 'تم تحديث المنتج بنجاح',
      product
    })
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ message: 'حدث خطأ في تحديث المنتج' })
  }
}

/**
 * Delete product (Admin only)
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )

    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' })
    }

    res.json({ message: 'تم حذف المنتج بنجاح' })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ message: 'حدث خطأ في حذف المنتج' })
  }
}
