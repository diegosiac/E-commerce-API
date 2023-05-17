import { Schema, model } from 'mongoose'

const ProductSchema = Schema({
  title: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  imageUrl: {
    type: String,
    require: true,
    trim: true
  },
  price: {
    type: Number,
    require: true,
    trim: true
  },
  category: {
    type: String,
    require: true,
    trim: true
  },
  subCategory: {
    type: String,
    require: true,
    trim: true
  },
  shipment: {
    type: Object,
    require: true,
    trim: true
  },
  keywords: {
    type: Array,
    trim: true
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
