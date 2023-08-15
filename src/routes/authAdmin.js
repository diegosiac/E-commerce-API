import { Router } from 'express'
import { check } from 'express-validator'
import validateFields from '../middlewares/validateFields.js'
import { createAdminUser, revalidateTokenAdmin } from '../controllers/auth.js'
import { validateAdminRegister } from '../helpers/validateAdminRegister.js'

const router = Router()

router.use(validateAdminRegister)

router.post('/new',
  [
    check('name', 'Name is required').isString(),
    check('email', 'Email is required').isEmail(),
    check('password', 'The password must be 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  createAdminUser
)

router.post('/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'The password must be 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  revalidateTokenAdmin
)

export default router
