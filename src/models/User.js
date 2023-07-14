import { Schema, model } from 'mongoose'
import { BasketUserSchema } from './BasketUserSchema.js'

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
    type: Array
  }
}, {
  versionKey: false,
  timestamps: true
})

export default model('User', UserSchema)
