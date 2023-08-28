import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

export const isValidID = (value) => {
  const validId = ObjectId.isValid(value)
  const equalId = (String)(new ObjectId(value)) === value

  if (validId && equalId) return true

  return false
}
