import { response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateJWT } from '../helpers/generateJWT.js'

export const createUser = async (req, res = response, next) => {
  const { email, password } = req.body

  try {
    const findUser = await User.findOne({ email })
    if (findUser) {
      return res.status(400).json({
        ok: false,
        msg: 'The user already exists with that email'
      })
    }

    const user = new User(req.body)

    const passwordhash = await bcrypt.hash(password, 10)
    user.password = passwordhash

    const token = await generateJWT(user.id, user.name)

    await user.save()

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res = response, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'The user does not exist with that email'
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Wrong password'
      })
    };

    const token = await generateJWT(user.id, user.name)

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    next(error)
  }
}
