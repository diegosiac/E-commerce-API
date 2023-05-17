import { Schema, model } from 'mongoose'

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
  }
}, {
  versionKey: false,
  timestamps: true
})

export default model('User', UserSchema)
