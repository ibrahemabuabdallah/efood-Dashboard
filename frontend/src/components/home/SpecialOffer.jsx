import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SpecialOffer = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white flex-1"
          >
            <h2 className="text-4xl font-bold mb-4">عرض خاص لفترة محدودة!</h2>
            <p className="text-xl mb-6">احصل على خصم 30% عند شراء 3 منتجات أو أكثر</p>
            <Link
              to="/products"
              className="inline-block bg-white text-amber-900 px-8 py-3 rounded-full font-bold hover:bg-amber-100 transition-all transform hover:scale-105"
            >
              اشترِ الآن واستفد
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-9xl"
          >
            🎁
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SpecialOffer
