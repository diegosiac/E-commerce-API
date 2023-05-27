import { Router } from 'express'
import { check, query } from 'express-validator'
import { cancelPayment, createPayment, executePayment } from '../controllers/payments.js'
import validateFields from '../middlewares/validateFields.js'
import { isValidQuantityProducts } from '../helpers/isValidQuantityProducts.js'

const router = Router()

// router.use( validarJWT )

router.post('/',
  [
    check('items', 'The quantity of products must be greater than or equal to 1').isArray().custom(isValidQuantityProducts),
    check('items.*.name', 'Product name is required').notEmpty().isString(),
    check('items.*.description', 'The product description is mandatory and must be of type String').isString(),
    check('items.*.quantity', 'The quantity of the product is mandatory and must be an integer greater than zero').isInt({ min: 1 }),
    check('items.*.unit_amount.currency_code', 'The currency code is mandatory and must be "MXN"').equals('MXN'),
    check('items.*.unit_amount.value', 'The product value is required and must be a number greater than or equal to zero').isNumeric({ min: 1 }),
    check('totalValue', 'Total value is required and must be a number greater than or equal to zero').isNumeric({ min: 1 }),
    validateFields
  ],
  createPayment
)

router.get('/execute_payment',
  [
    query('token', 'The token is required').notEmpty(),
    validateFields
  ],
  executePayment
)

router.get('/cancel_payment',
  [
    query('token', 'The token is required').notEmpty(),
    validateFields
  ],
  cancelPayment
)

export default router
