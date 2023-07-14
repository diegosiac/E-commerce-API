import { Schema, model } from 'mongoose'
import { DataProductSchema } from './DataProductSchema.js'

const TransactionSchema = Schema({
  order_id: {
    type: String,
    require: true,
    unique: true,
    alias: 'orderId'
  },
  address: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    address1: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    countryRegion: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    locality: {
      type: String,
      required: true
    },
    sublocality: {
      type: String,
      required: true
    }
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
  buyer_email: {
    type: String,
    require: true,
    trim: true,
    alias: 'buyerEmail'
  },
  list_products: {
    type: Array,
    require: true,
    // TODO agregar el schema del array
    alias: 'listProducts'
  },
  delivery: {
    status: {
      type: String,
      required: false
    },
    date: {
      type: String,
      required: false
    }
  }

}, {
  versionKey: false,
  timestamps: true
})

export default model('Transactions', TransactionSchema)
