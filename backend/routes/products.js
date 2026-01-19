import express from 'express'
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js'
import { authenticate, isAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', authenticate, isAdmin, createProduct)
router.put('/:id', authenticate, isAdmin, updateProduct)
router.delete('/:id', authenticate, isAdmin, deleteProduct)

export default router
