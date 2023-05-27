import { response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config.js'

export const validatePortalJWT = (req, res = response, next) => {
  const portalToken = req.header('x-portal')

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

    req.portal = portal
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid tokens headers'
    })
  }
  next()
}
