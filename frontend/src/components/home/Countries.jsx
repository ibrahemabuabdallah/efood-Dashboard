import { Link } from 'react-router-dom'

const countries = [
  { name: 'الإمارات', flag: '🇦🇪', description: 'عسل السدر الأصلي' },
  { name: 'السعودية', flag: '🇸🇦', description: 'عسل الطلح' },
  { name: 'اليمن', flag: '🇾🇪', description: 'عسل السدر اليمني' },
  { name: 'مصر', flag: '🇪🇬', description: 'عسل الموالح' },
  { name: 'الأردن', flag: '🇯🇴', description: 'عسل الزعتر' },
  { name: 'نيوزيلندا', flag: '🇳🇿', description: 'عسل المانوكا' },
]

const Countries = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-4">أصناف من بلدان مختلفة</h2>
        <p className="text-center text-gray-600 mb-12">اختر عسلك المفضل من أفضل المناحل حول العالم</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {countries.map((country) => (
            <Link
              key={country.name}
              to={`/products?country=${country.name}`}
              className="text-center group cursor-pointer p-4 rounded-xl hover:bg-amber-50 transition-all"
            >
              <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 border-amber-200 group-hover:border-amber-400 transition-all transform group-hover:scale-110">
                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-4xl">
                  {country.flag}
                </div>
              </div>
              <p className="font-bold text-amber-900">{country.name}</p>
              <p className="text-sm text-gray-500">{country.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Countries
