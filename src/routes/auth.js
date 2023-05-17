import { Router } from 'express'
import validateFields from '../middlewares/validateFields.js'
import { createUser, loginUser } from '../controllers/auth.js'

const router = Router()

router.post('/new',
  [
    validateFields
  ],
  createUser
)

router.post('/',
  [
    validateFields
  ],
  loginUser
)

export default router
