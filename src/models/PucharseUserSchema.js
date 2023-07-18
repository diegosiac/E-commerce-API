import { Schema } from 'mongoose'
import { DataProductSchema } from './DataProductSchema.js'

export const PucharseUserSchema = new Schema({
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
  products: {
    type: [DataProductSchema],
    required: true
  },
  amount: {
    type: Number,
    require: true,
    min: 1
  },
  dateShop: {
    type: String,
    required: true
  },
  delivery: {
    status: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  }
})

PucharseUserSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  object.id = _id
  return object
})
