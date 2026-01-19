import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const VerificationForm = ({ phone, countryCode, onSuccess, onBack }) => {
  const [code, setCode] = useState(['', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(300) // 5 minutes
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  useEffect(() => {
    // Resend timer
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const verificationCode = code.join('')

    if (verificationCode.length !== 5) {
      setError('الرجاء إدخال الرمز كاملاً')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/auth/verify-code', {
        phone,
        countryCode,
        code: verificationCode
      })

      onSuccess(response.data.token, response.data.user)
    } catch (err) {
      setError(err.response?.data?.message || 'رمز التحقق غير صحيح')
      setCode(['', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!canResend) return

    setCanResend(false)
    setResendTimer(60)
    setCode(['', '', '', '', ''])

    try {
      await axios.post('/api/auth/resend-code', {
        phone,
        countryCode
      })
    } catch (err) {
      setError(err.response?.data?.message || 'فشل إعادة الإرسال')
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const maskedPhone = phone 
    ? phone.substring(0, phone.length - 4).replace(/\d/g, 'X') + phone.substring(phone.length - 4)
    : ''

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-amber-900 mb-2">تم إرسال الرمز</h2>
        <p className="text-gray-600 mb-2">أدخل رمز التحقق المرسل إلى رقم</p>
        <p className="text-amber-600 font-bold text-lg">{countryCode} {maskedPhone}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-amber-900 font-medium mb-3 text-center">رمز التحقق</label>
          <div className="flex gap-3 justify-center" dir="ltr">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-amber-400 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Countdown Timer */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            الرمز صالح لمدة: <span className="font-bold text-green-600">{formatTime(countdown)}</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full gradient-green text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-[1.02] disabled:opacity-50"
        >
          {loading ? 'جاري التحقق...' : 'تحقق من الرمز'}
        </button>

        {/* Resend Code */}
        <div className="text-center mt-6">
          <p className="text-gray-600 mb-2">لم يصلك الرمز؟</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend}
            className="text-amber-600 hover:text-amber-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {canResend ? 'إعادة إرسال الرمز' : `إعادة إرسال الرمز (${resendTimer})`}
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-700 font-medium"
          >
            ← تغيير رقم الجوال
          </button>
        </div>
      </form>
    </div>
  )
}

export default VerificationForm
