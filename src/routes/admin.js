import { Router } from 'express'
import { check } from 'express-validator'
import validateFields from '../middlewares/validateFields.js'
import validateAdminJWT from '../middlewares/validateAdminJWT.js'
import { deleteUser } from '../controllers/admin.js'

const router = Router()

router.use(validateAdminJWT)

router.delete('/delete/user',
  [
    check('email', 'El email no es válido').isEmail(),
    validateFields
  ],
  deleteUser
)

export default router
