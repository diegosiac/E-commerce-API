import { Schema, model } from 'mongoose'
import { BasketUserSchema } from './BasketUserSchema.js'
import { PucharseUserSchema } from './PucharseUserSchema.js'

const UserSchema = Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  basket: {
    type: [BasketUserSchema]
  },
  pucharses: {
    type: [PucharseUserSchema]
  }
}, {
  versionKey: false,
  timestamps: true
})

export default model('User', UserSchema)
