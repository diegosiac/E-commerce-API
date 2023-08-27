import request from 'supertest'
import app from '../../src/app.js'
import dbConnection from '../../src/database/config.js'
import { deleteUserAdmin, registerUserAdmin, createAccount, validateTokenAdmin } from '../helpers/index.js'
import { userAdmin, user } from '../fixtures/index.js'

describe('Admin route testing', () => {
  let db, token

  beforeAll(async () => {
    db = await dbConnection()
    const admin = await registerUserAdmin(userAdmin)
    token = admin.token
  })

  afterAll(async () => {
    await deleteUserAdmin({ email: userAdmin.email })
    await db.disconnect()
  })

  validateTokenAdmin({ app, method: 'get', path: '/api/admin' })

  describe('Try in the path "/delete/user"', () => {
    test('You must delete a user correctly', async () => {
      await createAccount(user)

      const { body } = await request(app)
        .delete('/api/admin/delete/user')
        .set({ Authorization: token })
        .send({ email: user.email })
        .expect(200)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: true,
        msg: 'The user was deleted successfully'
      })
    })

    test('it should send a user that doesnt exist and return an error', async () => {
      const { body } = await request(app)
        .delete('/api/admin/delete/user')
        .set({ Authorization: token })
        .send({ email: 'noexist@gmail.com' })
        .expect(404)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'The user does not exist with that email'
      })
    })
  })
})
