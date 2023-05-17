import { categories } from '../data/categories.js'

export const isValidCategory = (value, { req }) => {
  const category = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()

  const isExist = categories[category]

  if (!isExist) return false

  req.body.category = isExist

  return true
}
