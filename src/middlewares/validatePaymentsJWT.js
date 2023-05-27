import { response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config.js'

export const validatePaymentsJWT = (req, res = response, next) => {
  const token = req.header('Authorization')
  const portalToken = req.header('x-portal')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Authorization token is missing'
    })
  }

  if (!portalToken) {
    return res.status(401).json({
      ok: false,
      msg: 'x-portal token is missing'
    })
  }

  try {
    const { portal } = jwt.verify(
      portalToken,
      config.SECRET_JWT_SEED_PORTAL
    )

    const { id, email } = jwt.verify(
      token,
      config.SECRET_JWT_SEED
    )

    req.portal = portal
    req.uid = id
    req.email = email
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid tokens headers'
    })
  }
  next()
}
