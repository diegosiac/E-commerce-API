import { response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config.js'

const validateAdminProductsJWT = (req, res = response, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Authorization token is missing'
    })
  }

  try {
    const { id, name } = jwt.verify(
      token,
      config.SECRET_JWT_SEED
    )

    req.uid = id
    req.name = name
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token Authorization'
    })
  }

  next()
}

export default validateAdminProductsJWT
