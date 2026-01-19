import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import axios from 'axios'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      setProduct(response.data.product)
      if (response.data.product.images?.length > 0) {
        setSelectedImage(0)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      alert('تم إضافة المنتج للسلة')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-amber-800">جاري التحميل...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600">المنتج غير موجود</p>
      </div>
    )
  }

  const price = product.discountPrice || product.price
  const originalPrice = product.discountPrice ? product.price : null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="aspect-square bg-amber-100 rounded-xl overflow-hidden mb-4">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[selectedImage]}
                alt={product.nameAr}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-9xl">🍯</div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-amber-600' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`${product.nameAr} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-amber-900 mb-4">{product.nameAr}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400 text-xl">
              {'★'.repeat(Math.floor(product.rating || 0))}
              {'☆'.repeat(5 - Math.floor(product.rating || 0))}
            </span>
            <span className="text-gray-600">({product.reviewsCount || 0} تقييم)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold gradient-gold bg-clip-text text-transparent">
              {price} ريال
            </span>
            {originalPrice && (
              <span className="text-xl text-gray-400 line-through mr-3">
                {originalPrice} ريال
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-amber-900 mb-2">الوصف</h2>
            <p className="text-gray-700 leading-relaxed">{product.descriptionAr}</p>
          </div>

          {/* Weight */}
          <div className="mb-6">
            <p className="text-gray-700"><strong>الوزن:</strong> {product.weight}</p>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">الكمية</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border-2 border-amber-300 rounded-lg hover:bg-amber-100"
              >
                -
              </button>
              <span className="text-xl font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border-2 border-amber-300 rounded-lg hover:bg-amber-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full gradient-green text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all mb-4"
          >
            أضف للسلة
          </button>

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="mt-8 p-4 bg-amber-50 rounded-lg">
              <h3 className="font-bold text-amber-900 mb-2">الفوائد</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <h3 className="font-bold text-amber-900 mb-2">المكونات</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
