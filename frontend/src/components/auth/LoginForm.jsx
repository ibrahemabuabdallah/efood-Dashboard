import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const LoginForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitForm = async (data) => {
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/auth/send-code', {
        phone: data.phone,
        countryCode: data.countryCode
      })

      onSubmit({
        phone: data.phone,
        countryCode: data.countryCode,
        maskedPhone: response.data.phone
      })
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في إرسال رمز التحقق')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-6">
          <label className="block text-amber-900 font-medium mb-2">رقم الجوال</label>
          <div className="flex gap-2">
            <select
              {...register('countryCode', { required: 'مطلوب' })}
              className="px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
            >
              <option value="+962">🇯🇴 +962</option>
              <option value="+966">🇸🇦 +966</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+20">🇪🇬 +20</option>
              <option value="+967">🇾🇪 +967</option>
            </select>
            <input
              type="tel"
              {...register('phone', {
                required: 'رقم الهاتف مطلوب',
                pattern: {
                  value: /^[0-9]{9}$/,
                  message: 'يجب أن يكون الرقم 9 أرقام'
                }
              })}
              placeholder="5 X X X X X X X X"
              className="flex-1 px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
              maxLength="9"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">سنرسل لك رمز التحقق عبر WhatsApp</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Terms */}
        <div className="mb-6">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              required
              className="mt-1 w-5 h-5 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm text-gray-600">
              بالضغط على "إرسال رمز التحقق" فأنت توافق على{' '}
              <a href="/privacy-policy" className="text-amber-600 hover:text-amber-700 font-medium">
                سياسة الخصوصية
              </a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full gradient-green text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            'جاري الإرسال...'
          ) : (
            <>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              إرسال رمز التحقق عبر WhatsApp
            </>
          )}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          لا تملك حساباً؟{' '}
          <a href="#" className="text-amber-600 hover:text-amber-700 font-bold">
            سجّل الآن
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
