import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginForm from '../components/auth/LoginForm'
import VerificationForm from '../components/auth/VerificationForm'

const Login = () => {
  const [step, setStep] = useState('phone')
  const [phoneData, setPhoneData] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handlePhoneSubmit = (data) => {
    setPhoneData(data)
    setStep('verification')
  }

  const handleVerificationSuccess = (token, user) => {
    login(token, user)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-amber-50">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2">تسجيل الدخول</h1>
          <p className="text-gray-600">
            {step === 'phone' 
              ? 'أدخل رقم جوالك لإتمام عملية التحقق'
              : 'أدخل رمز التحقق المرسل إليك'
            }
          </p>
        </div>

        {step === 'phone' ? (
          <LoginForm onSubmit={handlePhoneSubmit} />
        ) : (
          <VerificationForm
            phone={phoneData?.phone}
            countryCode={phoneData?.countryCode}
            onSuccess={handleVerificationSuccess}
            onBack={() => setStep('phone')}
          />
        )}
      </div>
    </div>
  )
}

export default Login
