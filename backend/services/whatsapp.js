import axios from 'axios'
import config from '../config/config.js'

/**
 * Send verification code via WhatsApp
 * @param {string} phoneNumber - Phone number with country code
 * @param {string} code - Verification code
 * @returns {Promise<boolean>}
 */
export const sendVerificationCode = async (phoneNumber, code) => {
  try {
    // TODO: Replace with actual WhatsApp API integration
    // Example with Twilio or WhatsApp Business API
    
    const message = `مرحباً بك في رحيق للعسل الطبيعي 🍯

رمز التحقق الخاص بك هو: ${code}

هذا الرمز صالح لمدة 5 دقائق.
لا تشارك هذا الرمز مع أحد.`

    // Placeholder for WhatsApp API call
    // const response = await axios.post(WHATSAPP_API_URL, {
    //   to: phoneNumber,
    //   body: message
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`
    //   }
    // })

    // For development, log the code instead
    if (process.env.NODE_ENV === 'development') {
      console.log(`[WhatsApp] Verification code for ${phoneNumber}: ${code}`)
      console.log(`Message: ${message}`)
    }

    return true
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
    throw new Error('فشل إرسال رمز التحقق')
  }
}

export default {
  sendVerificationCode
}
