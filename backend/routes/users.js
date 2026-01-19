import express from 'express'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Protected routes for user profile
router.get('/me', authenticate, async (req, res) => {
  res.json({ user: req.user })
})

export default router
