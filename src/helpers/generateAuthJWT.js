import jwt from 'jsonwebtoken'
import config from '../config.js'

export const generateAuthJWT = async (uid, email) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, email }

    jwt.sign(payload, config.SECRET_JWT_SEED, {
      expiresIn: '3w'
    }, (err, token) => {
      if (err) {
        reject(new Error('Cant generate token'))
      }
      resolve(token)
    })
  })
}
