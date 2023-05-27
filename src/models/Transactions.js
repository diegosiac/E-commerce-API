import { Schema, model } from 'mongoose'
import { DataProductSchema } from './DataProductSchema.js'

const TransactionSchema = Schema({
  transaccion_id: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    alias: 'transaccionID'
  },
  status: {
    type: String,
    trim: true,
    require: true
  },
  amount: {
    type: Number,
    require: true,
    min: 1
  },
  net_amout: {
    type: Number,
    require: true,
    min: 1,
    alias: 'netAmount'
  },
  buyer_email: {
    type: String,
    require: true,
    trim: true,
    alias: 'buyerEmail'
  },
  total_products: {
    type: Number,
    require: true,
    min: 1,
    alias: 'totalProducts'
  },
  list_products: {
    type: [DataProductSchema],
    require: true,
    alias: 'listProducts'
  }

}, {
  versionKey: false,
  timestamps: true
})

export default model('Transactions', TransactionSchema)
