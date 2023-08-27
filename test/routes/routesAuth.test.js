import request from 'supertest'
import app from '../../src/app.js'
import dbConnection from '../../src/database/config.js'
import { generateAuthJWT } from '../../src/helpers/generateAuthJWT.js'
import { createAccount, deleteAccount } from '../helpers/index.js'
import { user } from '../fixtures/index.js'

const expectUserObj = {
  ok: true,
  user: {
    token: expect.any(String),
    name: expect.any(String),
    email: expect.any(String),
    basket: {
      products: expect.any(Array)
    },
    pucharses: expect.any(Array)
  }
}

describe('Auth route testing', () => {
  let db

  beforeAll(async () => {
    db = await dbConnection()
    await createAccount(user)
  })

  afterAll(async () => {
    await deleteAccount({ email: user.email })
    await db.disconnect()
  })

  describe('Test on path "/"', () => {
    test('you must log in successfully', async () => {
      const { body } = await request(app)
        .post('/api/auth')
        .send({ email: user.email, password: user.password })
        .expect(200)
        .expect('Content-Type', /json/)

      expect(body).toEqual(expectUserObj)
    })

    test('You must log in and throw errors of there is no user with the email and do not match the password', async () => {
      const { body: firstResponse } = await request(app)
        .post('/api/auth')
        .send({ email: 'noexistemail@gmail.com', password: user.password })
        .expect(400)
        .expect('Content-Type', /json/)

      const { body: secondResponse } = await request(app)
        .post('/api/auth')
        .send({ email: user.email, password: 'thisIncorrectPassword' })
        .expect(400)
        .expect('Content-Type', /json/)

      expect(firstResponse).toEqual({
        ok: false,
        msg: 'The user does not exist with that email'
      })

      expect(secondResponse).toEqual({
        ok: false,
        msg: 'Wrong password'
      })
    })
  })

  describe('Test on path "/new"', () => {
    beforeAll(async () => {
      await deleteAccount(user)
    })

    test('You must create an account correctly', async () => {
      const { body } = await request(app)
        .post('/api/auth/new')
        .send(user)
        .expect(201)
        .expect('Content-Type', /json/)

      expect(body).toEqual(expectUserObj)
    })

    test('You must create an account and throw an error that a user already exists with the email', async () => {
      const { body } = await request(app)
        .post('/api/auth/new')
        .send(user)
        .expect(400)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'Un usuario ya existe con ese usuario'
      })
    })
  })

  describe('Test on path "/renew"', () => {
    test('You must renew the token correctly', async () => {
      const token = await generateAuthJWT({ name: user.name, email: user.email })

      const { body } = await request(app)
        .get('/api/auth/renew')
        .set({ 'x-token': token })
        .expect(200)
        .expect('Content-Type', /json/)

      expect(body).toEqual(expectUserObj)
    })

    test('You must make a request and not send the "x-token" in the headers and throw an error', async () => {
      const { body } = await request(app)
        .get('/api/auth/renew')
        .expect(401)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'x-token token is missing'
      })
    })

    test('You must make a request and throw an error because the token is invalid', async () => {
      const { body } = await request(app)
        .get('/api/auth/renew')
        .set({ 'x-token': '924h3f029hf20938hf0g342qh0v29jq' })
        .expect(401)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'Invalid token'
      })
    })
  })
})
