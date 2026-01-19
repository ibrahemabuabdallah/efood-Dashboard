import express from 'express'
import { sendCode, verifyCode, resendCode } from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

router.post('/send-code', sendCode)
router.post('/verify-code', verifyCode)
router.post('/resend-code', resendCode)

export default router
