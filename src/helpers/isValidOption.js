import { COUNTRIES } from './index.js'

export const isValidOption = (value) => {
  const isExistOption = COUNTRIES.some(option => option.label === value)
  if (!isExistOption) {
    throw new Error('The countryRegion is invalid or not allowed')
  }
  return true
}
