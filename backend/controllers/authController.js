import User from '../models/User.js'
import config from '../config/config.js'
import jwt from 'jsonwebtoken'
import { sendVerificationCode } from '../services/whatsapp.js'

// Generate 5-digit verification code
const generateVerificationCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

/**
 * Send verification code
 */
export const sendCode = async (req, res) => {
  try {
    const { phone, countryCode } = req.body
    const fullPhone = countryCode ? `${countryCode}${phone}` : phone

    // Validate phone number
    if (!phone || phone.length < 9) {
      return res.status(400).json({ message: 'رقم الهاتف غير صحيح' })
    }

    // Generate verification code
    const code = generateVerificationCode()
    const codeExpiry = new Date(Date.now() + config.VERIFICATION_CODE_EXPIRE)

    // Find or create user
    let user = await User.findOne({ phone: fullPhone })
    
    if (!user) {
      user = await User.create({
        phone: fullPhone,
        verificationCode: code,
        codeExpiry
      })
    } else {
      // Update verification code
      user.verificationCode = code
      user.codeExpiry = codeExpiry
      await user.save()
    }

    // Send code via WhatsApp
    await sendVerificationCode(fullPhone, code)

    res.json({
      message: 'تم إرسال رمز التحقق بنجاح',
      phone: fullPhone.substring(0, fullPhone.length - 4).replace(/\d/g, 'X') + fullPhone.substring(fullPhone.length - 4)
    })
  } catch (error) {
    console.error('Error sending verification code:', error)
    res.status(500).json({ message: 'حدث خطأ في إرسال رمز التحقق' })
  }
}

/**
 * Verify code and login/register
 */
export const verifyCode = async (req, res) => {
  try {
    const { phone, countryCode, code } = req.body
    const fullPhone = countryCode ? `${countryCode}${phone}` : phone

    // Find user
    const user = await User.findOne({ phone: fullPhone }).select('+verificationCode +codeExpiry')

    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' })
    }

    // Check if code matches
    if (user.verificationCode !== code) {
      return res.status(400).json({ message: 'رمز التحقق غير صحيح' })
    }

    // Check if code expired
    if (new Date() > user.codeExpiry) {
      return res.status(400).json({ message: 'انتهت صلاحية رمز التحقق' })
    }

    // Clear verification code
    user.verificationCode = undefined
    user.codeExpiry = undefined
    user.isVerified = true
    await user.save({ validateBeforeSave: false })

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRE }
    )

    // Remove sensitive data
    const userObj = user.toObject()
    delete userObj.verificationCode
    delete userObj.codeExpiry

    res.json({
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user: userObj
    })
  } catch (error) {
    console.error('Error verifying code:', error)
    res.status(500).json({ message: 'حدث خطأ في التحقق من الرمز' })
  }
}

/**
 * Resend verification code
 */
export const resendCode = async (req, res) => {
  try {
    const { phone, countryCode } = req.body
    const fullPhone = countryCode ? `${countryCode}${phone}` : phone

    const user = await User.findOne({ phone: fullPhone })

    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' })
    }

    // Check resend delay (optional - can be enforced client-side)
    const code = generateVerificationCode()
    const codeExpiry = new Date(Date.now() + config.VERIFICATION_CODE_EXPIRE)

    user.verificationCode = code
    user.codeExpiry = codeExpiry
    await user.save()

    // Send code via WhatsApp
    await sendVerificationCode(fullPhone, code)

    res.json({
      message: 'تم إعادة إرسال رمز التحقق بنجاح',
      phone: fullPhone.substring(0, fullPhone.length - 4).replace(/\d/g, 'X') + fullPhone.substring(fullPhone.length - 4)
    })
  } catch (error) {
    console.error('Error resending code:', error)
    res.status(500).json({ message: 'حدث خطأ في إعادة إرسال رمز التحقق' })
  }
}
