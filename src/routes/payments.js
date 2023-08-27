import { Router } from 'express'
import { body, query } from 'express-validator'
import { cancelPayment, createPayment, executePayment } from '../controllers/payments.js'
import validateFields from '../middlewares/validateFields.js'
import { isValidOption, isValidZip } from '../helpers/index.js'
import { validateUserJWT } from '../middlewares/validateUserJWT.js'

const router = Router()

router.post('/', validateUserJWT,
  [
    body('address.firstName')
      .notEmpty().withMessage('Name is required')
      .matches(/^[\p{L}´¨()\-\s]+$/u).withMessage('The name is invalid')
      .isLength({ max: 50 }).withMessage('The name must have a maximum of 50 characters'),
    body('address.lastName')
      .notEmpty().withMessage('Name is required')
      .matches(/^[\p{L}´¨()\-\s]+$/u).withMessage('The name is invalid')
      .isLength({ max: 50 }).withMessage('The name must have a maximum of 50 characters'),
    body('address.address1')
      .notEmpty().withMessage('The address1 field is required')
      .isLength({ min: 6 }).withMessage('The address1 must be at least 6 characters'),
    body('address.phoneNumber')
      .notEmpty().withMessage('The phoneNumber is required')
      .matches(/^\+?\d{10,}$/).withMessage('The phoneNumber number is invalid'),
    body('address.countryRegion')
      .notEmpty().withMessage('The countryRegion is required')
      .custom(isValidOption),
    body('address.zip')
      .notEmpty().withMessage('Zip code is required')
      .matches(/^[0-9A-Za-z\s-]+$/).withMessage('Invalid zip code')
      .custom(isValidZip),
    body('address.state')
      .notEmpty().withMessage('State is required')
      .isLength({ max: 40 }).withMessage('State must be at least 40 characters'),
    body('address.locality')
      .notEmpty().withMessage('Locality is required')
      .isLength({ max: 40 }).withMessage('Locality must be at least 40 characters'),
    body('address.sublocality')
      .notEmpty().withMessage('sublocality is required')
      .isLength({ max: 40 }).withMessage('sublocality must be at least 40 characters'),
    validateFields
  ],
  createPayment
)

router.get('/execute_payment',
  [
    query('token', 'The token is required').notEmpty(),
    query('PayerID', 'The PayerID is required').notEmpty(),
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
