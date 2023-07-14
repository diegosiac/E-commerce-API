import { Router } from 'express'
import { validateUserJWT } from '../middlewares/validateUserJWT.js'
import { addProductBasket, consultOrder, updateBasket } from '../controllers/user.js'

const router = Router()

router.use(validateUserJWT)

router.put('/update/basket', updateBasket)

router.put('/update/add', addProductBasket)

router.get('/consult/order', consultOrder)

export default router
