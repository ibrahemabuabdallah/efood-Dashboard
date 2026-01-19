import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import ProductsSection from '../components/home/ProductsSection'
import Countries from '../components/home/Countries'
import SpecialOffer from '../components/home/SpecialOffer'
import WhyChooseUs from '../components/home/WhyChooseUs'

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <ProductsSection title="وصل حديثاً" filter="new" />
      <ProductsSection title="الأكثر مبيعاً" filter="bestseller" />
      <Countries />
      <SpecialOffer />
      <WhyChooseUs />
    </div>
  )
}

export default Home
