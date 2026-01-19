import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-amber-900 mb-4">سلة التسوق فارغة</h2>
        <p className="text-gray-600 mb-8">ابدأ التسوق لإضافة منتجات إلى سلة التسوق</p>
        <Link
          to="/products"
          className="inline-block gradient-green text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all"
        >
          تصفح المنتجات
        </Link>
      </div>
    )
  }

  const total = getCartTotal()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-900 mb-8">سلة التسوق</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const price = item.product.discountPrice || item.product.price
            return (
              <div key={item.product._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row gap-4">
                <Link to={`/products/${item.product._id}`} className="flex-shrink-0">
                  <div className="w-24 h-24 bg-amber-100 rounded-lg flex items-center justify-center">
                    {item.product.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.nameAr}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-4xl">🍯</span>
                    )}
                  </div>
                </Link>

                <div className="flex-1">
                  <Link to={`/products/${item.product._id}`}>
                    <h3 className="text-lg font-bold text-amber-900 mb-2">{item.product.nameAr}</h3>
                  </Link>
                  <p className="text-gray-600 mb-2">{item.product.weight}</p>
                  <p className="text-xl font-bold text-amber-600">{price} ريال</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="w-8 h-8 border-2 border-amber-300 rounded hover:bg-amber-100"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="w-8 h-8 border-2 border-amber-300 rounded hover:bg-amber-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-xl font-bold text-amber-900">{price * item.quantity} ريال</p>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            مسح السلة بالكامل
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-amber-900 mb-4">ملخص الطلب</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>عدد المنتجات</span>
                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>المجموع الفرعي</span>
                <span>{total} ريال</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>الشحن</span>
                <span>0 ريال</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold text-amber-900">
                <span>الإجمالي</span>
                <span>{total} ريال</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full gradient-green text-white py-3 rounded-lg font-bold text-center hover:opacity-90 transition-all mb-4"
            >
              إتمام الطلب
            </Link>

            <Link
              to="/products"
              className="block w-full text-center text-amber-600 hover:text-amber-700 font-medium"
            >
              متابعة التسوق
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
