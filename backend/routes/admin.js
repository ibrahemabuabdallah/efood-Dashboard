import express from 'express'
import {
  getDashboardStats,
  getAllOrders,
  getAllUsers,
  getSalesReport
} from '../controllers/adminController.js'
import { authenticate, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// All admin routes require authentication and admin role
router.use(authenticate)
router.use(isAdmin)

router.get('/stats', getDashboardStats)
router.get('/orders', getAllOrders)
router.get('/users', getAllUsers)
router.get('/reports', getSalesReport)

export default router
