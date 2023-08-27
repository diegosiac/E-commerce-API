import request from 'supertest'

export const validateTokenAdmin = ({ app, method = 'post', path = '' }) => {
  describe('Tests on authorization token headers', () => {
    test('You must send the request without the authorization token in the headers', async () => {
      const { body } = await request(app)[method](path)
        .expect(401)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'Authorization token is missing'
      })
    })

    test('You must send the request with an invalid authorization token', async () => {
      const { body } = await request(app)[method](path)
        .set({ Authorization: '924h3f029hf20938hf0g342qh0v29jq' })
        .expect(401)
        .expect('Content-Type', /json/)

      expect(body).toEqual({
        ok: false,
        msg: 'Invalid token Authorization'
      })
    })
  })
}
