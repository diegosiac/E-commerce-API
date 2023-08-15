import { Router } from 'express'
import { check } from 'express-validator'
import validateFields from '../middlewares/validateFields.js'
import validateAdminProductsJWT from '../middlewares/validateAdminProductsJWT.js'
import { deleteUser } from '../controllers/admin.js'

const router = Router()

router.use(validateAdminProductsJWT)

router.delete('/delete/user',
  [
    check('email', 'El email no es válido').isEmail(),
    validateFields
  ],
  deleteUser
)

export default router
