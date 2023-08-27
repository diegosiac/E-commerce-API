import request from 'supertest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import app from '../../src/app.js'
import config from '../../src/config.js'
import dbConnection from '../../src/database/config.js'
import { validateTokenUserJWT, createAccount, deleteAccount, setProductBasket, deleteProductsDb, deleteTransaction, setTransaction, createTransaction, deleteRecords } from '../helpers/index.js'
import { address, oneProduct, transaction, user } from '../fixtures/index.js'

describe('Payments route testing', () => {
  let db, userData, products, mockAxios

  beforeAll(async () => {
    mockAxios = new MockAdapter(axios)
    db = await dbConnection()
    userData = await createAccount(user)
    products = await setProductBasket({ email: userData.email, products: [oneProduct] })
  })

  afterAll(async () => {
    await deleteAccount({ email: userData.email })
    await deleteProductsDb({ products })
    await db.disconnect()
  })

  afterEach(() => {
    mockAxios.reset()
  })

  describe('Tests on path POST "/"', () => {
    test('You must create a transaction correctly and return the url to process the payment', async () => {
      const responseUrlPayment = {
        links: [
          {
            method: 'GET',
            href: 'https://pagePayment.com'
          },
          {
            method: 'POST',
            href: 'https://pagePayment.com'
          }
        ],
        id: '345734573547'
      }

      mockAxios.onGet(config.GOOGLE_URL).reply(200, { status: 'OK' })
      mockAxios.onPost(config.API_TOKEN_PAYPAL).reply(201, { access_token: '29hf293f923hf9' })
      mockAxios.onPost(`${config.API_PAYPAL}/v2/checkout/orders`).reply(201, responseUrlPayment)

      const { body } = await request(app)
        .post('/api/payments')
        .set({ 'x-token': userData.token })
        .send({ address })
        .expect(201)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        order: {
          link: responseUrlPayment.links[1]
        }
      })

      await deleteTransaction({ orderId: responseUrlPayment.id })
    })

    validateTokenUserJWT({ app, method: 'post', path: '/api/payments' })

    test('It must make the request and return an error for not containing the expected elements', async () => {
      const { body } = await request(app)
        .post('/api/payments')
        .set({ 'x-token': userData.token })
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        errors: {
          'address.firstName': {
            msg: 'Name is required',
            location: 'body',
            value: 'address.firstName'
          },
          'address.lastName': {
            msg: 'Name is required',
            location: 'body',
            value: 'address.lastName'
          },
          'address.address1': {
            msg: 'The address1 field is required',
            location: 'body',
            value: 'address.address1'
          },
          'address.phoneNumber': {
            msg: 'The phoneNumber is required',
            location: 'body',
            value: 'address.phoneNumber'
          },
          'address.countryRegion': {
            msg: 'The countryRegion is required',
            location: 'body',
            value: 'address.countryRegion'
          },
          'address.zip': {
            msg: 'Zip code is required',
            location: 'body',
            value: 'address.zip'
          },
          'address.state': {
            msg: 'State is required',
            location: 'body',
            value: 'address.state'
          },
          'address.locality': {
            msg: 'Locality is required',
            location: 'body',
            value: 'address.locality'
          },
          'address.sublocality': {
            msg: 'sublocality is required',
            location: 'body',
            value: 'address.sublocality'
          }
        }
      })
    })
  })

  describe('Tests on path GET "/execute_payment"', () => {
    let transaction
    const tokenId = '854gh19g5h02gh092'
    const PayerID = '34vp4h98hv'

    beforeAll(async () => {
      transaction = await setTransaction({ orderId: tokenId, address, email: userData.email })
    })

    afterAll(async () => {
      await deleteTransaction({ orderId: transaction.order_id })
    })

    test('You must do the validation to complete a transaction and redirect to the web store', async () => {
      const transaction = '8230954239857'
      const mockExecuteData = {
        purchase_units: [
          {
            payments: {
              captures: [
                {
                  id: transaction,
                  seller_receivable_breakdown: {
                    net_amount: {
                      value: 350
                    }
                  }
                }
              ]
            }
          }
        ]
      }

      mockAxios.onPost(config.API_TOKEN_PAYPAL).reply(201, { access_token: '29hf293f923hf9' })
      mockAxios.onPost(`${config.API_PAYPAL}/v2/checkout/orders/${tokenId}/capture`).reply(201, mockExecuteData)

      const response = await request(app)
        .get('/api/payments/execute_payment')
        .query({ token: tokenId, PayerID })
        .expect(302)
        .expect('Content-Type', /text\/plain/g)

      expect(response.header.location).toBe(`${config.URL_FRONT}/checkout/execute_payment?id=${tokenId}`)

      await deleteRecords({ products })
    })

    test('You must make the request and return an error for the invalid token', async () => {
      const { body } = await request(app)
        .get('/api/payments/execute_payment')
        .query({ token: '346346346346346', PayerID })
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'The token is invalid'
      })
    })
  })

  describe('Tests on path GET "/cancel_payment"', () => {
    let transactionData

    beforeAll(async () => {
      transactionData = await createTransaction(transaction)
    })

    test('You must cancel the purchase correctly and redirect to the web store', async () => {
      const response = await request(app)
        .get('/api/payments/cancel_payment')
        .query({ token: transactionData.order_id })
        .expect(302)
        .expect('Content-Type', /text\/plain/g)

      expect(response.header.location).toBe(`${config.URL_FRONT}/cart`)
    })

    test('You must make the request and return an error for the invalid token', async () => {
      const { body } = await request(app)
        .get('/api/payments/cancel_payment')
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        errors: {
          token: {
            msg: 'The token is required',
            location: 'query',
            value: 'token'
          }
        }
      })
    })
  })
})
