import { Router } from 'express'
import { param, query } from 'express-validator'
import { getProducts, getProductById, getProductsByCategory } from '../controllers/products.js'
import validateFields from '../middlewares/validateFields.js'
import { isValidID, isValidCategory } from '../helpers/index.js'

const router = Router()

router.get('/', getProducts)

router.get('/unique',
  [
    query('id', 'The id is required, it must be of type number and must have 12 or 24 characters').notEmpty().custom(isValidID),
    validateFields
  ],
  getProductById
)

router.get('/category/:category',
  [
    param('category', 'The category param is mandatory and must be valid').exists().custom(isValidCategory),
    validateFields
  ],
  getProductsByCategory
)

export default router
