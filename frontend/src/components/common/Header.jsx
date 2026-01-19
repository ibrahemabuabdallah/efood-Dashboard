import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartItemsCount } = useCart()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="gradient-green text-white text-sm py-2 text-center">
          <p>🎉 خصم 20% على جميع منتجات العسل الطبيعي - عرض لفترة محدودة</p>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-800">رحيق</h1>
              <p className="text-xs text-amber-600">العسل الطبيعي الأصيل</p>
            </div>
          </Link>

          {/* Search Bar (Hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="ابحث عن منتجات العسل..." 
                className="w-full px-4 py-2 pr-10 border-2 border-amber-200 rounded-full focus:outline-none focus:border-amber-400"
              />
              <button className="absolute left-2 top-1/2 -translate-y-1/2 gradient-gold text-white p-2 rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link to="/favorites" className="p-2 hover:bg-amber-100 rounded-full relative">
              <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </Link>

            <Link to="/cart" className="p-2 hover:bg-amber-100 rounded-full relative">
              <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 gradient-green text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            <Link to="/login" className="gradient-green text-white px-4 py-2 rounded-full text-sm hover:opacity-90 hidden md:block">
              تسجيل الدخول
            </Link>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`hidden md:flex items-center justify-center gap-8 py-3 border-t ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <Link to="/" className="text-amber-800 hover:text-amber-600 font-medium">الرئيسية</Link>
          <Link to="/products" className="text-amber-800 hover:text-amber-600 font-medium">المنتجات</Link>
          <Link to="/categories" className="text-amber-800 hover:text-amber-600 font-medium">التصنيفات</Link>
          <Link to="/offers" className="text-amber-800 hover:text-amber-600 font-medium">العروض الخاصة</Link>
          <Link to="/about" className="text-amber-800 hover:text-amber-600 font-medium">من نحن</Link>
          <Link to="/contact" className="text-amber-800 hover:text-amber-600 font-medium">اتصل بنا</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col p-4 space-y-2">
            <Link to="/" className="text-amber-800 hover:text-amber-600 font-medium py-2">الرئيسية</Link>
            <Link to="/products" className="text-amber-800 hover:text-amber-600 font-medium py-2">المنتجات</Link>
            <Link to="/categories" className="text-amber-800 hover:text-amber-600 font-medium py-2">التصنيفات</Link>
            <Link to="/offers" className="text-amber-800 hover:text-amber-600 font-medium py-2">العروض الخاصة</Link>
            <Link to="/about" className="text-amber-800 hover:text-amber-600 font-medium py-2">من نحن</Link>
            <Link to="/contact" className="text-amber-800 hover:text-amber-600 font-medium py-2">اتصل بنا</Link>
            <Link to="/login" className="text-amber-800 hover:text-amber-600 font-medium py-2">تسجيل الدخول</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
