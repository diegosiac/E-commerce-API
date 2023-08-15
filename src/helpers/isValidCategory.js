import { CATEGORIES } from '../data/categories.js'

export const isValidCategory = (value, { req }) => {
  const category = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()

  const isValid = CATEGORIES[category]

  if (!isValid) return false

  req.body.category = isValid.name

  return true
}
