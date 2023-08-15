import { index } from '../algolia/config.js'
import Product from '../models/Product.js'
import Transactions from '../models/Transactions.js'
import User from '../models/User.js'
import { statusTransaction } from './statusTransaction.js'

export const createTransaction = async ({ address, orderId, items, email, value }) => {
  try {
    const body = {
      orderId,
      address,
      listProducts: items,
      buyerEmail: email,
      amount: value,
      status: statusTransaction.PENDING
    }

    const transactions = new Transactions(body)

    await transactions.save()
  } catch (error) {
    throw new Error('Error dataBase Transaction')
  }
}

export const executeTrasaction = async ({ transaccionId, payerId, netAmount, orderId }) => {
  try {
    const products = await Product.find({}).select('-createdAt -updatedAt')
    const transaccion = await Transactions.findOne({ order_id: orderId })
    const dateDelivery = new Date(transaccion.createdAt)

    Promise.all(products.map(async (product) => {
      const item = transaccion.list_products.find((doc) => doc.id_product === String(product._id))

      if (item) {
        product.stock -= item.quantity
        index.saveObject({ ...product, objectID: product.id }).wait()

        await product.save()
      }
    }))

    dateDelivery.setDate(dateDelivery.getDate() + 12)

    const delivery = {
      status: 'PROGRESS',
      date: dateDelivery
    }

    transaccion.transaccion_id = transaccionId
    transaccion.payer_id = payerId
    transaccion.status = statusTransaction.COMPLETE
    transaccion.net_amout = netAmount
    transaccion.delivery = delivery

    const newPurchase = {
      address: transaccion.address,
      amount: transaccion.amount,
      dateShop: transaccion.createdAt,
      products: transaccion.list_products,
      id: transaccion._id,
      delivery
    }

    await User.findOneAndUpdate(
      { email: transaccion.buyer_email },
      {
        $push: { pucharses: { $each: [newPurchase], $position: 0 } },
        basket: []
      }
    )

    await transaccion.save()
  } catch (error) {
    throw new Error('Error dataBase Transaction')
  }
}

export const cancelTransaction = async ({ orderId }) => {
  try {
    await Transactions.findOneAndDelete({ order_id: orderId })
  } catch (error) {
    throw new Error({
      status: 'Error dataBase Transaction',
      error
    })
  }
}

export const consultTransaction = async ({ orderId }) => {
  try {
    const transaction = await Transactions.findOne({ order_id: orderId })

    return transaction
  } catch (error) {
    throw new Error('Error dataBase Transaction')
  }
}
