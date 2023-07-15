import { request, response } from 'express'
import User from '../models/User.js'
import Product from '../models/Product.js'
import { consultTransaction } from '../helpers/transactions.js'

export const updateBasket = async (req, res = response, next) => {
  const { email, body } = req

  try {
    const user = await User.findOne({ email })

    user.basket = body

    await user.save()

    res.status(200).json({
      ok: true,
      user: {
        products: user.basket
      }
    })
  } catch (error) {
    next(error)
  }
}

export const addProductBasket = async (req, res = response, next) => {
  const { email, body } = req

  try {
    const products = await Product.findById(body.id)
    const user = await User.findOne({ email })

    const { name, thumbnail, value, stock, id } = products

    const newProduct = {
      name,
      thumbnail,
      value,
      quantity: 1,
      stock,
      id_product: id,
      id: '64963881a9ab7991b9e4a7e8'
    }

    user.basket = [...user.basket, newProduct]

    await user.save()

    res.status(200).json({
      ok: true,
      user: {
        products: user.basket
      }
    })
  } catch (error) {
    next(error)
  }
}

export const consultOrder = async (req = request, res = response, next) => {
  const { email } = req

  try {
    const order = await consultTransaction({ orderId: req.query.orderId })

    if (!order) return res.status(404).json({ ok: false, msg: 'No order found' })

    if (order.buyer_email !== email) {
      return res.status(403).json({
        ok: false,
        msg: 'You are not authorized to read the transaction'
      })
    }

    const newOrder = {
      address: order.address,
      amount: order.amount,
      dateShop: order.createdAt,
      products: order.list_products,
      id: order._id,
      delivery: order.delivery
    }

    res.status(200).json({
      ok: true,
      user: {
        order: newOrder
      }
    })
  } catch (error) {
    next(error)
  }
}
