import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const categories = [
  { name: 'عسل الزهور', icon: '🍯', slug: 'flower-honey' },
  { name: 'عسل السدر', icon: '🌸', slug: 'sidr-honey' },
  { name: 'عسل الموالح', icon: '🌺', slug: 'citrus-honey' },
  { name: 'عسل دوار الشمس', icon: '🌻', slug: 'sunflower-honey' },
  { name: 'عسل الحبة السوداء', icon: '🌿', slug: 'black-seed-honey' },
  { name: 'مربى', icon: '🍊', slug: 'jam' },
  { name: 'سكاكر العسل', icon: '🍬', slug: 'honey-candies' },
]

const Categories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">تصفح حسب الفئات</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group cursor-pointer"
            >
              <Link to={`/products?category=${category.slug}`}>
                <div className="w-20 h-20 mx-auto mb-3 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-all transform group-hover:scale-110">
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <p className="font-medium text-amber-800">{category.name}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
