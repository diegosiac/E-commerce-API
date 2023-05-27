import { Schema, model } from 'mongoose'
import { DataProductSchema } from './DataProductSchema.js'

const TransactionSchema = Schema({
  order_id: {
    type: String,
    require: true,
    unique: true,
    alias: 'orderId'
  },
  transaccion_id: {
    type: String,
    trim: true,
    require: false,
    alias: 'transaccionId'
  },
  payer_id: {
    type: String,
    trim: true,
    alias: 'payerId'
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
    min: 1,
    alias: 'netAmount'
  },
  portal: {
    type: String,
    require: true,
    trim: true
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
