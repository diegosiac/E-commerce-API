import { response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import UserAdmin from '../models/UserAdmin.js'
import { generateAuthJWT, generateAdminJWT, getUpdatedProducts } from '../helpers/index.js'

export const createUser = async (req, res = response, next) => {
  const { email, password } = req.body

  try {
    const findUser = await User.findOne({ email })
    if (findUser) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario ya existe con ese usuario'
      })
    }

    const user = new User(req.body)

    const passwordhash = await bcrypt.hash(password, 10)
    user.password = passwordhash
    const token = await generateAuthJWT({ email: user.email, name: user.name })

    await user.save()

    res.status(201).json({
      ok: true,
      user: {
        token,
        name: user.name,
        email: user.email,
        basket: {
          products: user.basket
        },
        pucharses: user.pucharses || []
      }
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

    const token = await generateAuthJWT({ name: user.name, email: user.email })

    const products = await getUpdatedProducts(user.basket)

    user.basket = products

    await user.save()
    res.status(200).json({
      ok: true,
      user: {
        token,
        name: user.name,
        email: user.email,
        basket: {
          products: user.basket
        },
        pucharses: user.pucharses || []
      }
    })
  } catch (error) {
    next(error)
  }
}

export const revalidateToken = async (req, res = response, next) => {
  const { name, email } = req
  const token = await generateAuthJWT({ name, email })
  const user = await User.findOne({ email })

  const products = await getUpdatedProducts(user.basket)

  user.basket = products

  await user.save()
  res.status(200).json({
    ok: true,
    user: {
      token,
      name,
      email,
      basket: {
        products: user.basket
      },
      pucharses: user.pucharses || []
    }
  })
}

export const createAdminUser = async (req, res = response, next) => {
  const { email, password } = req.body

  try {
    const findUser = await UserAdmin.findOne({ email })
    if (findUser) {
      return res.status(400).json({
        ok: false,
        msg: 'The user already exists with that email'
      })
    }

    const userAdmin = new UserAdmin(req.body)

    const passwordhash = await bcrypt.hash(password, 10)
    userAdmin.password = passwordhash

    const token = await generateAdminJWT(userAdmin.id, userAdmin.email)

    await userAdmin.save()

    res.status(201).json({
      ok: true,
      uid: userAdmin.id,
      name: userAdmin.name,
      token
    })
  } catch (error) {
    next(error)
  }
}

export const loginAdminUser = async (req, res = response, next) => {
  const { email, password } = req.body

  try {
    const user = await UserAdmin.findOne({ email })

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

    const token = await generateAdminJWT(user.id, user.email)

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
