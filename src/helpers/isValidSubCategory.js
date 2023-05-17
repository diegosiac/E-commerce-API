import { categories } from '../data/categories.js'

export const isValidSubCategory = (value, { req }) => {
  const category = req.body.category
  const subCategory = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()

  const isExist = categories[category].subCategories[subCategory]

  return !!isExist
}
