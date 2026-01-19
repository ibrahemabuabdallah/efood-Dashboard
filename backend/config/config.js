export default {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  VERIFICATION_CODE_EXPIRE: 5 * 60 * 1000, // 5 minutes
  RESEND_CODE_DELAY: 60 * 1000, // 60 seconds
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
}
