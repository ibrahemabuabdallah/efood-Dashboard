import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { motion } from 'framer-motion'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const price = product.discountPrice || product.price
  const originalPrice = product.discountPrice ? product.price : null
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product, 1)
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden product-card hover-lift"
    >
      <Link to={`/products/${product._id}`} className="relative block">
        <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center relative">
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.nameAr}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-8xl">🍯</span>
          )}
          
          {discountPercentage > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
              خصم {discountPercentage}%
            </span>
          )}
          
          {product.isNew && (
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">
              جديد
            </span>
          )}
          
          {product.isBestSeller && (
            <span className="absolute top-3 right-3 bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-bold">
              الأكثر مبيعاً
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-400">
            {'★'.repeat(Math.floor(product.rating || 0))}
            {'☆'.repeat(5 - Math.floor(product.rating || 0))}
          </span>
          <span className="text-sm text-gray-500">({product.reviewsCount || 0})</span>
        </div>
        
        <Link to={`/products/${product._id}`}>
          <h3 className="font-bold text-amber-900 mb-2 line-clamp-2">{product.nameAr}</h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-3">{product.weight}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold gradient-gold bg-clip-text text-transparent">
              {price} ريال
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through mr-2">
                {originalPrice} ريال
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full gradient-green text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-all"
        >
          أضف للسلة
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard
