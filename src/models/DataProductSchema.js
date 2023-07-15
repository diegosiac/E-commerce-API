import { Schema } from 'mongoose'

export const DataProductSchema = new Schema({
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
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  value: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  id_product: {
    type: String,
    required: true,
    trim: true
  }
})
