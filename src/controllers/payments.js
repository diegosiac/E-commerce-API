import axios from 'axios'
import config from '../config.js'
import { cancelTransaction, createTokenPPL, createTransaction, executeTrasaction } from '../helpers/index.js'

export const createPayment = async (req, res, next) => {
  const { email, portal } = req
  const { items, totalValue } = req.body

  const orders = {
    intent: 'CAPTURE',
    purchase_units: [{
      items,
      amount: {
        currency_code: 'MXN',
        value: totalValue,
        breakdown: {
          item_total: {
            currency_code: 'MXN',
            value: totalValue
          }
        }
      }
    }],
    application_context: {
      brand_name: 'lapaginadel10.com',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      return_url: 'http://localhost:3000/api/payments/execute_payment',
      cancel_url: 'http://localhost:3000/api/payments/cancel_payment'
    }
  }

  try {
    const tokenAuth = await createTokenPPL()

    const { data } = await axios.post(`${config.API_PAYPAL}/v2/checkout/orders`, orders, {
      headers: {
        Authorization: `Bearer ${tokenAuth}`
      }
    })

    await createTransaction(items, totalValue, data, email, portal)

    res.status(201).json({
      ok: true,
      order: data
    })
  } catch (error) {
    next(error)
  }
}

export const executePayment = async (req, res, next) => {
  const { token, PayerID } = req.query
  try {
    const tokenAuth = await createTokenPPL()

    const { data } = await axios.post(`${config.API_PAYPAL}/v2/checkout/orders/${token}/capture`, {}, {
      headers: {
        Authorization: `Bearer ${tokenAuth}`
      }
    })

    await executeTrasaction(data, PayerID)

    res.status(201).json({
      ok: true,
      data
    })
  } catch (error) {
    next(error)
  }
}

export const cancelPayment = async (req, res, next) => {
  const { token } = req.query
  try {
    await cancelTransaction(token)
    res.status(200).json({
      ok: true
    })
  } catch (error) {
    next(error)
  }
}
