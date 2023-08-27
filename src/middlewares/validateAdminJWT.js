import { response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config.js'

const validateAdminJWT = (req, res = response, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Authorization token is missing'
    })
  }

  try {
    const { id, email } = jwt.verify(
      token,
      config.SECRET_JWT_SEED_ADMIN
    )

    req.uid = id
    req.email = email
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token Authorization'
    })
  }

  next()
}

export default validateAdminJWT
