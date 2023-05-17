import { Router } from 'express'
import { check, query } from 'express-validator'
import { createProduct, deleteProduct, updateProduct } from '../controllers/products.js'
// import validateAdminProductsJWT from '../middlewares/validateAdminProductsJWT.js'
import validateFields from '../middlewares/validateFields.js'
import { isValidCategory, isValidShipment, isValidSubCategory, isValidID } from '../helpers/index.js'

const router = Router()

// router.use(validateAdminProductsJWT)

router.post('/',
  [
    check('title', 'The title is required').notEmpty(),
    check('description', 'The description is required and must have a minimum of 6 characters').notEmpty().isLength({ min: 6 }),
    check('imageUrl', 'Image url is required').notEmpty().trim().isURL(),
    check('price', 'The price is required and must be of type number').notEmpty().isNumeric(),
    check('category', 'The category does not exist').notEmpty().custom(isValidCategory),
    check('subCategory', 'Subcategory does not exist').notEmpty().custom(isValidSubCategory),
    check('shipment', 'The delivery format is invalid').notEmpty().custom(isValidShipment),
    check('keywords', 'An array with the keywords must be sent').optional().isArray(),
    check('stock', 'Stock is required and must be of type Number').notEmpty().isNumeric(),
    validateFields
  ],
  createProduct
)

router.delete('/',
  [
    query('id').notEmpty().custom(isValidID).withMessage('The id is required, it must be of type number and must have 12 or 24 characters'),
    validateFields
  ],
  deleteProduct
)

router.put('/',
  [
    query('id').notEmpty().custom(isValidID).withMessage('The id is required, it must be of type number and must have 12 or 24 characters'),
    check('title', 'The title is required').optional(),
    check('description', 'The description is required and must have a minimum of 6 characters').optional().isLength({ min: 6 }),
    check('imageUrl', 'Image url is required').optional().trim().isURL(),
    check('price', 'The price is required and must be of type number').optional().isNumeric(),
    check('category', 'The category does not exist').optional().custom(isValidCategory),
    check('subCategory', 'Subcategory does not exist').optional().custom(isValidSubCategory),
    check('shipment', 'The delivery format is invalid').optional().custom(isValidShipment),
    check('keywords', 'An array with the keywords must be sent').optional().isArray(),
    check('stock', 'Stock is required and must be of type Number').optional().isNumeric(),
    validateFields
  ],
  updateProduct
)

export default router
