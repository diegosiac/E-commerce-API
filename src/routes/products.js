import { Router } from 'express'
import { param, query } from 'express-validator'
import { getProducts, getProductByIdAndTitle, getProductsByCategory } from '../controllers/products.js'
import validateFields from '../middlewares/validateFields.js'
import { isValidID, isValidCategory, isContainIDorTitle } from '../helpers/index.js'

const router = Router()

router.get('/', getProducts)

router.get('/unique',
  [
    query('id', 'The id is required, it must be of type number and must have 12 or 24 characters').optional().custom(isValidID),
    query('name').optional().isLength({ min: 2 }),
    query('id or the name', 'You must send the id or the name').custom(isContainIDorTitle),
    validateFields
  ],
  getProductByIdAndTitle
)

router.get('/category/:category',
  [
    param('category', 'The category param is mandatory and must be valid').exists().custom(isValidCategory),
    validateFields
  ],
  getProductsByCategory
)

export default router
