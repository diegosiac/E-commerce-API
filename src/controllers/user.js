import { request, response } from 'express'
import User from '../models/User.js'
import Product from '../models/Product.js'
import { consultTransaction } from '../helpers/transactions.js'

export const updateBasket = async (req, res = response, next) => {
  const { email, body } = req

  try {
    const user = await User.findOne({ email })

    user.basket = body.newBasket

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
    const { name, thumbnail, value, stock, id, description, category } = products

    const newProduct = {
      name,
      thumbnail,
      value,
      stock,
      id_product: id,
      quantity: 1,
      description,
      category
    }

    const user = await User.findOneAndUpdate({ email }, { $push: { basket: newProduct } }, { new: true })

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
  const { email, query } = req

  try {
    const order = await consultTransaction({ orderId: query.orderId })

    if (!order) {
      return res.status(404).json({
        ok: false,
        msg: 'No order found'
      })
    }

    if (order.buyer_email !== email) {
      return res.status(403).json({
        ok: false,
        msg: 'You are not authorized to read the transaction'
      })
    }

    const orderDetails = {
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
        order: orderDetails
      }
    })
  } catch (error) {
    next(error)
  }
}
