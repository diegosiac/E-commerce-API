import request from 'supertest'

export const validateTokenUserJWT = ({ app, method = 'post', path = '' }) => {
  describe('Tests on "x-token" token headers', () => {
    test('The request should return an error due to the lack of "x-token" in the headers', async () => {
      const { body } = await request(app)[method](path)
        .expect(401)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'x-token token is missing'
      })
    })

    test('The request should return an error because the "x-token" in the headers is invalid', async () => {
      const { body } = await request(app)
        .get('/api/user/consult/order')
        .set({ 'x-token': '924h3f029hf20938hf0g342qh0v29jq' })
        .expect(401)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'Invalid token'
      })
    })
  })
}
