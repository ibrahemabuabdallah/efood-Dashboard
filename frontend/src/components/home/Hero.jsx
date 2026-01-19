import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative h-[500px] overflow-hidden">
      <div className="absolute inset-0 gradient-gold opacity-90"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="text-5xl font-bold text-white mb-4">تمتع بأجود أنواع العسل الطبيعي</h2>
          <p className="text-xl text-white/90 mb-8">منتجات طبيعية 100% من أفضل المناحل حول العالم</p>
          <div className="flex gap-4">
            <Link
              to="/products"
              className="bg-white text-amber-800 px-8 py-3 rounded-full font-bold hover:bg-amber-100 transition-all transform hover:scale-105"
            >
              تسوق الآن
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all"
            >
              اكتشف المزيد
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
