import request from 'supertest'
import app from '../../src/app.js'
import dbConnection from '../../src/database/config.js'
import { expectProductFormat, oneProduct } from '../fixtures/index.js'
import { createRecord, deleteRecord } from '../helpers/index.js'

const { keywords, ...restProduct } = expectProductFormat

describe('Search route testing', () => {
  let db
  beforeAll(async () => {
    db = await dbConnection()
    await createRecord(oneProduct)
  })

  afterAll(async () => {
    await deleteRecord({ id: oneProduct.id })
    await db.disconnect()
  })

  describe('Test on path "/"', () => {
    test('You must make a request with a query and return the products that match', async () => {
      const query = '*'

      const { body } = await request(app)
        .get('/api/search')
        .query({ query })
        .expect(200)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        queries: expect.arrayContaining([
          expect.objectContaining({
            ...restProduct
          })

        ])
      })
    })

    test('You must make a request and the query is not present and return an error', async () => {
      const { body } = await request(app)
        .get('/api/search')
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        errors: {
          query: {
            msg: 'The "query" parameter is required',
            location: 'query',
            value: 'query'
          }
        }
      })
    })
  })
})
