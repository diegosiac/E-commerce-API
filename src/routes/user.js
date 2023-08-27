import { Router } from 'express'
import { body, query } from 'express-validator'
import { validateUserJWT } from '../middlewares/validateUserJWT.js'
import validateFields from '../middlewares/validateFields.js'
import { addProductBasket, consultOrder, updateBasket } from '../controllers/user.js'

const router = Router()

router.use(validateUserJWT)

router.put('/update/basket',
  [
    body('newBasket')
      .notEmpty().withMessage('newBasket cannot be empty')
      .isArray().withMessage('newBasket must be an array'),
    validateFields
  ],
  updateBasket
)

router.put('/update/add',
  [
    body('id')
      .notEmpty().withMessage('id cannot be empty')
      .isString().withMessage('id must be an string'),
    validateFields
  ],
  addProductBasket
)

router.get('/consult/order',
  [
    query('orderId')
      .notEmpty().withMessage('orderId cannot be empty')
      .isString().withMessage('orderId must be an string'),
    validateFields
  ],
  consultOrder)

export default router
