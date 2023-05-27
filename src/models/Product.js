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
  image_url: {
    type: String,
    require: true,
    trim: true,
    alias: 'imageUrl'
  },
  price: {
    type: Number,
    require: true
  },
  category: {
    type: String,
    require: true,
    trim: true
  },
  sub_category: {
    type: String,
    require: true,
    trim: true,
    alias: 'subCategory'
  },
  shipment: {
    type: { shippingTime: String, shippingFrom: String },
    require: true
  },
  keywords: {
    type: Array
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
