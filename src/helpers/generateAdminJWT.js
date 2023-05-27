import jwt from 'jsonwebtoken'
import config from '../config.js'

export const generateAdminJWT = async (uid, email) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, email }

    jwt.sign(payload, config.SECRET_JWT_SEED_ADMIN, {
      expiresIn: '3d'
    }, (err, token) => {
      if (err) {
        reject(new Error('Cant generate token'))
      }
      resolve(token)
    })
  })
}
