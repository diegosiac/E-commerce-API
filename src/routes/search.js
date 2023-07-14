import { Router } from 'express'
import { getSearchProducts } from '../controllers/search.js'

const router = Router()

router.get('/', getSearchProducts)

export default router
