import bcrypt from 'bcryptjs'
import User from '../../src/models/User.js'
import { generateAuthJWT } from '../../src/helpers/generateAuthJWT.js'

export const createAccount = async ({ name, email, password }) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({ name, email, password: passwordHash })

    await user.save()

    const token = await generateAuthJWT({ email: user.email, name: user.name })

    return {
      name: user.name,
      email: user.email,
      token
    }
  } catch (error) {
    return new Error(error)
  }
}

export const deleteAccount = async ({ email }) => {
  try {
    await User.findOneAndDelete({ email })
  } catch (error) {
    return new Error(error)
  }
}

export const findAccount = async ({ email }) => {
  try {
    const user = await User.findOne({ email })

    return user
  } catch (error) {
    return new Error(error)
  }
}
