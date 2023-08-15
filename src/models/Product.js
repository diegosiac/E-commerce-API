import { Schema, model } from 'mongoose'

const ProductSchema = Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  thumbnail: {
    type: String,
    require: true,
    trim: true
  },
  value: {
    type: Number,
    require: true,
    min: 1
  },
  category: {
    type: String,
    require: true,
    trim: true
  },
  keywords: {
    type: [String],
    validate: {
      validator: (value) => Array.isArray(value) && value.every(item => typeof item === 'string'),
      message: 'The field must be an array that only contains elements of type String.'
    }
  },
  stock: {
    type: Number,
    require: true
  }
}, {
  versionKey: false,
  timestamps: true
})

ProductSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  object.id = _id
  return object
})

export default model('Product', ProductSchema)
