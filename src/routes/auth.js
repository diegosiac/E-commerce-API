import { Router } from 'express'
import validateFields from '../middlewares/validateFields.js'
import { createUser, loginUser } from '../controllers/auth.js'
import { check } from 'express-validator'

const router = Router()

router.post('/new',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'The password must be 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  createUser
)

router.post('/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'The password must be 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  loginUser
)

export default router
