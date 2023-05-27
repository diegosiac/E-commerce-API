import Transactions from '../models/Transactions.js'
import { statusTransaction } from './statusTransaction.js'

export const createTransaction = async (items, totalValue, orderPaypal, buyerEmail, portal) => {
  const listProducts = items.map(({ name, description, quantity, ...item }) => {
    const newItem = {
      name,
      description,
      quantity,
      amount: item.unit_amount.value
    }

    return newItem
  })

  const totalProducts = items.reduce((accum, item) => accum + item.quantity, 0)

  try {
    const body = {
      orderId: orderPaypal.id,
      status: statusTransaction.PENDING,
      amount: totalValue,
      portal,
      buyerEmail,
      totalProducts,
      listProducts
    }

    const transactions = new Transactions(body)

    await transactions.save()
  } catch (error) {
    throw new Error({
      status: 'Error dataBase Transaction',
      error
    })
  }
}

export const executeTrasaction = async (orderPaypal, payerId) => {
  const captures = orderPaypal.purchase_units[0].payments.captures[0]

  try {
    const body = {
      transaccion_id: captures.id,
      payer_id: payerId,
      status: statusTransaction.COMPLETE,
      net_amout: captures.seller_receivable_breakdown.net_amount.value
    }

    await Transactions.findOneAndUpdate({ order_id: orderPaypal.id }, body)
  } catch (error) {
    throw new Error({
      status: 'Error dataBase Transaction',
      error
    })
  }
}

export const cancelTransaction = async (token) => {
  try {
    const body = {
      status: statusTransaction.CANCEL
    }

    await Transactions.findOneAndUpdate({ order_id: token }, body)
  } catch (error) {
    throw new Error({
      status: 'Error dataBase Transaction',
      error
    })
  }
}
