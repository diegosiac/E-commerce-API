import { response } from 'express'
import axios from 'axios'
import config from '../config.js'
import User from '../models/User.js'
import { COUNTRIES, cancelTransaction, createTokenPPL, createTransaction, executeTrasaction } from '../helpers/index.js'

export const createPayment = async (req, res, next) => {
  const { email } = req
  const { firstName, lastName, address1, phoneNumber, countryRegion, zip, state, locality, sublocality } = req.body.address

  try {
    const user = await User.findOne({ email })

    const products = user.basket.filter(item => item.stock > 0)

    const items = products.map(({ name, value, quantity }) => {
      return {
        name,
        description: `${name}. Producto de GeekMobile`,
        quantity,
        unit_amount: {
          currency_code: country.currency_code,
          value
        }
      }
    })

    const value = products.reduce((accum, item) => accum + (item.value * item.quantity), 0)

    const country = COUNTRIES.find(item => item.label === countryRegion)

    const order = {
      intent: 'CAPTURE',
      purchase_units: [{
        items,
        amount: {
          currency_code: country.currency_code,
          value,
          breakdown: {
            item_total: {
              currency_code: country.currency_code,
              value
            }
          }
        },
        shipping: {
          type: 'SHIPPING',
          name: {
            full_name: `${firstName} ${lastName}`
          },
          address: {
            address_line_1: address1,
            address_line_2: sublocality,
            admin_area_2: locality,
            admin_area_1: state,
            postal_code: zip,
            country_code: country.code
          },
          phone: {
            phone_number: {
              national_number: phoneNumber
            }
          }
        }
      }],
      application_context: {
        brand_name: 'geekMobile.com',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: 'http://localhost:3000/api/payments/execute_payment',
        cancel_url: 'http://localhost:3000/api/payments/cancel_payment',
        shipping_preference: 'SET_PROVIDED_ADDRESS'
      }
    }

    const tokenAuth = await createTokenPPL()

    const { data } = await axios.post(`${config.API_PAYPAL}/v2/checkout/orders`, order, {
      headers: {
        Authorization: `Bearer ${tokenAuth}`
      }
    })

    await createTransaction({ address: req.body.address, orderId: data.id, items: products, email, value })

    res.status(201).json({
      ok: true,
      order: {
        link: data.links[1]
      }
    })
  } catch (error) {
    next(error)
  }
}

export const executePayment = async (req, res = response, next) => {
  const { token, PayerID } = req.query
  try {
    const tokenAuth = await createTokenPPL()

    const { data } = await axios.post(`${config.API_PAYPAL}/v2/checkout/orders/${token}/capture`, {}, {
      headers: {
        Authorization: `Bearer ${tokenAuth}`
      }
    })

    const capture = data.purchase_units[0].payments.captures[0]

    await executeTrasaction({
      transaccionId: capture.id,
      payerId: PayerID,
      netAmount: capture.seller_receivable_breakdown.net_amount.value,
      orderId: token
    })

    res.redirect(`http://localhost:5173/checkout/execute_payment?id=${token}`)
  } catch (error) {
    next(error)
  }
}

export const cancelPayment = async (req, res, next) => {
  const { token } = req.query
  try {
    await cancelTransaction({ orderId: token })
    res.redirect('http://localhost:5173/cart')
  } catch (error) {
    next(error)
  }
}
