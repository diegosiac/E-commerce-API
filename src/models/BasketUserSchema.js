import { Schema } from 'mongoose'

export const BasketUserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: Number,
    required: true,
    min: 1
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  stock: {
    type: Number,
    required: true
  },
  id_product: {
    type: String,
    required: true,
    alias: 'idProduct'
  }
})

BasketUserSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  object.id = _id
  return object
})
