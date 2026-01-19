import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    city: '',
    area: '',
    street: '',
    building: '',
    apartment: '',
    paymentMethod: 'cash',
    notes: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setLoading(true)

    // Here you would create the order via API
    // const order = {
    //   items: cartItems,
    //   shippingAddress: formData,
    //   paymentMethod: formData.paymentMethod,
    //   totalAmount: getCartTotal()
    // }

    // Simulate API call
    setTimeout(() => {
      clearCart()
      alert('تم إنشاء الطلب بنجاح!')
      navigate('/')
    }, 1000)
  }

  const total = getCartTotal()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-900 mb-8">إتمام الطلب</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <h2 className="text-xl font-bold text-amber-900 mb-4">تفاصيل الشحن</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المدينة *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة *</label>
                <input
                  type="text"
                  name="area"
                  required
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الشارع *</label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المبنى</label>
                <input
                  type="text"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الشقة</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">طريقة الدفع *</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
              >
                <option value="cash">كاش عند الاستلام</option>
                <option value="card">بطاقة ائتمانية</option>
                <option value="wallet">محفظة إلكترونية</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-green text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'جاري إنشاء الطلب...' : 'تأكيد الطلب'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-amber-900 mb-4">ملخص الطلب</h2>

            <div className="space-y-3 mb-6">
              {cartItems.map((item) => {
                const price = item.product.discountPrice || item.product.price
                return (
                  <div key={item.product._id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.product.nameAr} x {item.quantity}</span>
                    <span className="text-gray-700">{price * item.quantity} ريال</span>
                  </div>
                )
              })}

              <div className="border-t pt-3 flex justify-between text-lg font-bold text-amber-900">
                <span>الإجمالي</span>
                <span>{total} ريال</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
