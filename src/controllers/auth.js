import { response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateJWT } from '../helpers/generateJWT.js'

export const createUser = async (req, res = response) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'The user already exists with that email'
      })
    }
    user = new User(req.body)

    const salt = bcrypt.genSaltSync(5)
    user.password = bcrypt.hashSync(password, salt)

    const token = await generateJWT(user.id, user.name)

    await user.save()

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    })
  }
}

export const loginUser = async (req, res = response) => {
  const { email, password } = req.body

  try {

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    })
  }
}
