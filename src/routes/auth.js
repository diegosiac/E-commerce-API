import { Router } from 'express'
import { check } from 'express-validator'
import validateFields from '../middlewares/validateFields.js'
import { createUser, loginUser, revalidateToken } from '../controllers/auth.js'
import { validateUserJWT } from '../middlewares/validateUserJWT.js'

const router = Router()

router.post('/new',
  [
    check('name', 'El nombre es requerido').notEmpty().isString().matches(/^[\p{L}´¨()\-\s]+$/u).withMessage('El nombre no es válido'),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
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

router.get('/renew', validateUserJWT, revalidateToken)

export default router
