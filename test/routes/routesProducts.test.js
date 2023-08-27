import request from 'supertest'
import app from '../../src/app.js'
import dbConnection from '../../src/database/config.js'
import { setProductDb, deleteProductsDb } from '../helpers/index.js'
import { oneProduct, expectProductFormat } from '../fixtures/index.js'

describe('Product route testing', () => {
  let db, products

  beforeAll(async () => {
    db = await dbConnection()
    const data = await setProductDb({ products: [oneProduct] })

    products = data
  })

  afterAll(async () => {
    await deleteProductsDb({ products })
    await db.disconnect()
  })

  describe('Test on path "/"', () => {
    test('It must make a request to the route "/" and it must return information', async () => {
      const { body } = await request(app)
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        data: {
          products: expect.arrayContaining([expectProductFormat]),
          results: expect.any(Number)
        }
      })
    })
  })

  describe('Tests on the path "/unique"', () => {
    test('You must make a request, find a product and return it ', async () => {
      const idExpect = products[0].id

      const { body } = await request(app)
        .get('/api/products/unique')
        .query({ id: idExpect })
        .expect(200)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        data: {
          product: expectProductFormat
        }
      })
    })

    test('You must make a request and not find a product', async () => {
      const { body } = await request(app)
        .get('/api/products/unique')
        .query({ id: '64b89dfbbb236bd6fe39b543' })
        .expect(404)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: expect.any(String)
      })
    })
  })

  describe('Tests on routes "/category/:category"', () => {
    test('You must make a request with a category and return the products of that category', async () => {
      const category = products[0].category

      const { body } = await request(app)
        .get(`/api/products/category/${category}`)
        .expect(200)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        data: {
          category,
          products: expect.arrayContaining([expectProductFormat])
        }
      })
    })

    test('You must make a request and the category must not be valid', async () => {
      const { body } = await request(app)
        .get('/api/products/category/no-exist')
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        errors: {
          category: {
            msg: 'The category param is mandatory and must be valid',
            location: 'params',
            value: 'category'
          }
        }
      })
    })
  })
})
