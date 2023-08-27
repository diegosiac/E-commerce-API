import request from 'supertest'
import app from '../../src/app.js'
import dbConnection from '../../src/database/config.js'
import { createAccount, createTransaction, deleteAccount, deleteProductsDb, deleteTransaction, setProductDb, validateTokenUserJWT } from '../helpers/index.js'
import { oneProduct, secondUser, transaction, user, userBasket } from '../fixtures/index.js'

const expectProductsBasket = {
  name: expect.any(String),
  thumbnail: expect.any(String),
  value: expect.any(Number),
  quantity: expect.any(Number),
  stock: expect.any(Number),
  description: expect.any(String),
  category: expect.any(String),
  id_product: expect.any(String),
  id: expect.any(String)
}

describe('User route testing', () => {
  let db, token

  beforeAll(async () => {
    db = await dbConnection()
    const newUser = await createAccount(user)

    token = newUser.token
  })

  afterAll(async () => {
    await deleteAccount({ email: user.email })
    await db.disconnect()
  })

  validateTokenUserJWT({ app, method: 'get', path: '/api/user/consult/order' })

  describe('Test on path "/update/basket"', () => {
    test('must modify a users Basket correctly', async () => {
      const { body } = await request(app)
        .put('/api/user/update/basket')
        .set({ 'x-token': token })
        .send({ newBasket: userBasket })
        .expect(200)
        .expect('Content-Type', /json/)

      const expectBasket = userBasket.map(product => {
        return {
          ...product,
          id: expect.any(String)
        }
      })

      expect(body).toEqual({
        ok: true,
        user: {
          products: expectBasket
        }
      })
    })

    test('The request must return an error due to the lack of the basket to be modified', async () => {
      const { body } = await request(app)
        .put('/api/user/update/basket')
        .set({ 'x-token': token })
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        errors: {
          newBasket: {
            msg: 'newBasket cannot be empty',
            location: 'body',
            value: 'newBasket'
          }
        }
      })
    })
  })

  describe('Test on path "/update/add"', () => {
    let products

    beforeAll(async () => {
      const data = await setProductDb({ products: [oneProduct] })
      products = data
    })

    afterAll(async () => {
      await deleteProductsDb({ products })
    })

    test('must correctly add a product to a users cart', async () => {
      const { body } = await request(app)
        .put('/api/user/update/add')
        .set({ 'x-token': token })
        .send({ id: products[0].id })
        .expect(200)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        user: {
          products: expect.arrayContaining([expectProductsBasket])
        }
      })

      const { keywords, ...restExpectProduct } = products[0]

      expect(body.user.products).toContainEqual({
        ...restExpectProduct,
        quantity: expect.any(Number),
        id: expect.any(String),
        id_product: expect.any(String)
      })
    })

    test('The request should return an error due to the lack of a product id', async () => {
      const { body } = await request(app)
        .put('/api/user/update/add')
        .set({ 'x-token': token })
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        errors: {
          id: {
            msg: 'id cannot be empty',
            location: 'body',
            value: 'id'
          }
        }
      })
    })
  })

  describe('Test on path "/consult/order"', () => {
    let secondToken, transactionData

    beforeAll(async () => {
      const newUser = await createAccount(secondUser)
      const newTransaction = await createTransaction(transaction)

      secondToken = newUser.token
      transactionData = newTransaction
    })

    afterAll(async () => {
      await deleteAccount({ email: secondUser.email })
      await deleteTransaction({ orderId: transactionData.orderId })
    })

    test('must consult a purchase order correctly', async () => {
      const { body } = await request(app)
        .get('/api/user/consult/order')
        .set({ 'x-token': token })
        .query({ orderId: transactionData.orderId })
        .expect(200)
        .expect('Content-Type', /json/)

      const transactionObj = transactionData.toObject()

      const { id, stock, ...restBasketExpect } = expectProductsBasket

      const expectOrder = {
        address: transactionObj.address,
        amount: transactionObj.amount,
        dateShop: transactionObj.createdAt.toJSON(),
        products: expect.arrayContaining([{ ...restBasketExpect, _id: id }]),
        id: String(transactionObj._id),
        delivery: transactionObj.delivery
      }

      expect(body).toEqual({
        ok: true,
        user: {
          order: expectOrder
        }
      })
    })

    test('must make a request and not find a purchase order', async () => {
      const { body } = await request(app)
        .get('/api/user/consult/order')
        .set({ 'x-token': token })
        .query({ orderId: '2LH77588EN0346346' })
        .expect(404)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'No order found'
      })
    })

    test('The request must return an error for not having authorization to consult the purchase order', async () => {
      const { body } = await request(app)
        .get('/api/user/consult/order')
        .set({ 'x-token': secondToken })
        .query({ orderId: transactionData.orderId })
        .expect(403)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'You are not authorized to read the transaction'
      })
    })
  })
})
