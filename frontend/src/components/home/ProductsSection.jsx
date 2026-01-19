import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../products/ProductCard'
import axios from 'axios'

const ProductsSection = ({ title = 'وصل حديثاً', filter = 'new' }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {}
        if (filter === 'new') {
          params.sort = '-createdAt'
        } else if (filter === 'bestseller') {
          params.isBestSeller = true
        }
        params.limit = 4

        const response = await axios.get('/api/products', { params })
        setProducts(response.data.products || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filter])

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-amber-800">جاري التحميل...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-amber-800">{title}</h2>
          <Link to="/products" className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2">
            عرض الكل
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
