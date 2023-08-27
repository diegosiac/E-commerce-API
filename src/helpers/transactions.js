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

export const executeTransaction = async ({ transactionId, payerId, netAmount, transaction }) => {
  try {
    await Promise.all(transaction.list_products.map(async (item) => {
      const product = await Product.findByIdAndUpdate(item.id_product,
        { $inc: { stock: -item.quantity } },
        { new: true }
      )

      await index.saveObject({
        name: product.name,
        description: product.description,
        thumbnail: product.thumbnail,
        value: product.value,
        stock: product.stock,
        category: product.category,
        objectID: product.id
      })
    }))

    const dateDelivery = new Date(transaction.createdAt)

    dateDelivery.setDate(dateDelivery.getDate() + 12)

    const delivery = {
      status: 'PROGRESS',
      date: dateDelivery
    }

    transaction.transaccion_id = transactionId
    transaction.payer_id = payerId
    transaction.status = statusTransaction.COMPLETE
    transaction.net_amout = netAmount
    transaction.delivery = delivery

    const newPurchase = {
      address: transaction.address,
      amount: transaction.amount,
      dateShop: transaction.createdAt,
      products: transaction.list_products,
      _id: transaction._id,
      delivery
    }

    await User.findOneAndUpdate(
      { email: transaction.buyer_email },
      {
        $push: { pucharses: { $each: [newPurchase], $position: 0 } },
        basket: []
      }
    )

    await transaction.save()
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
