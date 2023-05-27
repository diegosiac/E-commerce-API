import jwt from 'jsonwebtoken'
import config from '../config.js'

export const generatePortalJWT = async (portal) => {
  return new Promise((resolve, reject) => {
    const payload = { portal }

    jwt.sign(payload, config.SECRET_JWT_SEED_PORTAL, {
      expiresIn: '4w'
    }, (err, token) => {
      if (err) {
        reject(new Error('Cant generate token'))
      }
      resolve(token)
    })
  })
}
