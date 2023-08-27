import { Router } from 'express'
import { query } from 'express-validator'
import validateFields from '../middlewares/validateFields.js'
import { getSearchProducts } from '../controllers/search.js'

const router = Router()

router.get('/',
  [
    query('query')
      .exists().withMessage('The "query" parameter is required')
      .isString().withMessage('The "query" parameter must be a string')
      .isLength({ min: 1 }).withMessage('The "query" parameter must have at least 1 character'),
    validateFields
  ],
  getSearchProducts)

export default router
