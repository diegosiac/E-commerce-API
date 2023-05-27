import jwt from 'jsonwebtoken'
import config from '../config.js'

export const generateJWT = async (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }

    jwt.sign(payload, config.SECRET_JWT_SEED, {
      expiresIn: '3w'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject(new Error('Cant generate token'))
      }
      resolve(token)
    })
  })
}
