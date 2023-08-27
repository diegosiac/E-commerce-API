import { statusTransaction } from '../../src/helpers'
import Transactions from '../../src/models/Transactions'
import { findAccount } from './index.js'

export const createTransaction = async (transactionData) => {
  try {
    const transaction = new Transactions(transactionData)

    await transaction.save()

    return transaction
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteTransaction = async ({ orderId }) => {
  try {
    await Transactions.findOneAndDelete({ order_id: orderId })
  } catch (error) {
    throw new Error(error)
  }
}

export const setTransaction = async ({ orderId, address, email }) => {
  try {
    const user = await findAccount({ email })

    const value = user.basket.reduce((accum, item) => accum + (item.value * item.quantity), 0)

    const body = {
      orderId,
      address,
      listProducts: user.basket,
      buyerEmail: email,
      amount: value,
      status: statusTransaction.PENDING
    }

    const create = await createTransaction(body)

    return create
  } catch (error) {
    throw new Error(error)
  }
}
