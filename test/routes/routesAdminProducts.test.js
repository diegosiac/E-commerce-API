import request from 'supertest'
import app from '../../src/app.js'
import dbConnection from '../../src/database/config.js'
import { deleteUserAdmin, registerUserAdmin, validateTokenAdmin } from '../helpers/index.js'
import { expectProductFormat, oneProduct, userAdmin } from '../fixtures/index.js'

describe('AdminProducts route testing', () => {
  let db, token, idProduct

  beforeAll(async () => {
    db = await dbConnection()
    const admin = await registerUserAdmin(userAdmin)
    token = admin.token
  })

  afterAll(async () => {
    await deleteUserAdmin({ email: userAdmin.email })
    await db.disconnect()
  })

  validateTokenAdmin({ app, method: 'post', path: '/api/admin/products' })

  describe('Test on path POST "/"', () => {
    test('You must add a product correctly', async () => {
      const { body } = await request(app)
        .post('/api/admin/products')
        .set({ Authorization: token })
        .send(oneProduct)
        .expect(201)
        .expect('Content-Type', /json/)

      const productId = body.data.id

      idProduct = productId

      expect(body).toEqual({
        ok: true,
        data: {
          msg: 'The product was successfully saved',
          name: oneProduct.name,
          id: expect.any(String)
        }
      })
    })

    test('The request for a field error must return an error', async () => {
      const { body } = await request(app)
        .post('/api/admin/products')
        .set({ Authorization: token })
        .send({ ...oneProduct, name: '' })
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        errors: {
          name: {
            msg: 'The name is required',
            location: 'body',
            value: 'name'
          }
        }
      })
    })
  })

  describe('Test on path PATCH "/"', () => {
    const updateProduct = {
      name: 'teemo escuadron omega',
      value: 5731
    }

    test('You must modify a product correctly', async () => {
      const { body } = await request(app)
        .patch('/api/admin/products')
        .set({ Authorization: token })
        .query({ id: idProduct })
        .send(updateProduct)
        .expect(201)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        data: {
          product: {
            ...expectProductFormat,
            ...updateProduct
          }
        }
      })
    })

    test('The request should return an error due to the lack of an "id" in the query params', async () => {
      const { body } = await request(app)
        .patch('/api/admin/products')
        .set({ Authorization: token })
        .send(updateProduct)
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        errors: {
          id: {
            msg: 'The id is required, it must be of type number and must have 12 or 24 characters',
            location: 'query',
            value: 'id'
          }
        }
      })
    })
  })

  describe('Test on path DELETE "/"', () => {
    test('You must delete a product correctly', async () => {
      const { body } = await request(app)
        .delete('/api/admin/products')
        .set({ Authorization: token })
        .query({ id: idProduct })
        .expect(200)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        msg: 'The product was successfully removed'
      })
    })

    test('The request should return an error due to the lack of an "id" in the query params', async () => {
      const { body } = await request(app)
        .delete('/api/admin/products')
        .set({ Authorization: token })
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        errors: {
          id: {
            msg: 'Invalid value',
            location: 'query',
            value: 'id'
          }
        }
      })
    })
  })
})
