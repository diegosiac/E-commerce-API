import { Router } from 'express'
import { param, query } from 'express-validator'
import { getProducts, getProductByIdAndTitle, getProductsByCategory } from '../controllers/products.js'
import validateFields from '../middlewares/validateFields.js'
import { isValidID, isValidCategory, isContainIDorTitle } from '../helpers/index.js'

const router = Router()

// router.use( validarJWT )

router.get('/', getProducts)

router.get('/unique',
  [
    query('id').optional().custom(isValidID).withMessage('The id is required, it must be of type number and must have 12 or 24 characters'),
    query('title').optional().isLength({ min: 2 }),
    query('id or the title').custom(isContainIDorTitle).withMessage('You must send the id or the title'),
    validateFields
  ],
  getProductByIdAndTitle
)

router.get('/category/:category',
  [
    param('category').exists().custom(isValidCategory).withMessage('The category param is mandatory and must be valid'),
    validateFields
  ],
  getProductsByCategory
)

export default router
