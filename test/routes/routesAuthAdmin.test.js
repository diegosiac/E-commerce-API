import request from 'supertest'
import app from '../../src/app.js'
import config from '../../src/config.js'
import dbConnection from '../../src/database/config.js'
import { deleteUserAdmin, registerUserAdmin } from '../helpers/index.js'
import { userAdmin } from '../fixtures/index.js'

describe('AuthAdmin route testing', () => {
  let db

  beforeAll(async () => {
    db = await dbConnection()
  })

  afterAll(async () => {
    await db.disconnect()
  })

  describe('Tests on authorization token headers', () => {
    test('You must send the request without the authorization token in the headers', async () => {
      const { body } = await request(app)
        .post('/api/admin/auth')
        .expect(401)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'Authorization token is missing'
      })
    })

    test('You must send the request with an invalid authorization token', async () => {
      const { body } = await request(app)
        .post('/api/admin/auth')
        .set({ Authorization: 'invalid-token' })
        .expect(401)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'Invalid token Authorization'
      })
    })
  })

  describe('Test on path "/"', () => {
    beforeAll(async () => {
      await registerUserAdmin(userAdmin)
    })

    afterAll(async () => {
      await deleteUserAdmin({ email: userAdmin.email })
    })

    test('you must log in successfully', async () => {
      const { body } = await request(app)
        .post('/api/admin/auth')
        .set({ Authorization: config.SECRET_AUTH_ADMIN })
        .send({ email: userAdmin.email, password: userAdmin.password })
        .expect(200)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        user: {
          name: userAdmin.name,
          token: expect.any(String)
        }
      })
    })

    test('You must log in and return an error because there is no user with the email sent', async () => {
      const { body: firstResponse } = await request(app)
        .post('/api/admin/auth')
        .set({ Authorization: config.SECRET_AUTH_ADMIN })
        .send({ email: 'noexistemail@gmail.com', password: userAdmin.password })
        .expect(400)
        .expect('Content-Type', /json/)

      expect(firstResponse).toEqual({
        ok: false,
        msg: 'The user does not exist with that email'
      })
    })

    test('You must log in and return an error for incorrect password', async () => {
      const { body: secondResponse } = await request(app)
        .post('/api/admin/auth')
        .set({ Authorization: config.SECRET_AUTH_ADMIN })
        .send({ email: userAdmin.email, password: 'thisIncorrectPassword' })
        .expect(400)
        .expect('Content-Type', /json/)

      expect(secondResponse).toEqual({
        ok: false,
        msg: 'Wrong password'
      })
    })
  })

  describe('Test on path "/new"', () => {
    afterAll(async () => {
      await deleteUserAdmin({ email: userAdmin.email })
    })

    test('You must create an account correctly', async () => {
      const { body } = await request(app)
        .post('/api/admin/auth/new')
        .set({ Authorization: config.SECRET_AUTH_ADMIN })
        .send(userAdmin)
        .expect(201)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        user: {
          uid: expect.any(String),
          name: userAdmin.name,
          token: expect.any(String)
        }
      })
    })

    test('You must create an account and throw an error that a user already exists with the email', async () => {
      const { body } = await request(app)
        .post('/api/admin/auth/new')
        .set({ Authorization: config.SECRET_AUTH_ADMIN })
        .send(userAdmin)
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'The user already exists with that email'
      })
    })
  })
})
