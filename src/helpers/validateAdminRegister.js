import { response } from 'express'
import config from '../config'

export const validateAdminRegister = (req, res = response, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Authorization token is missing'
    })
  }

  if (token !== config.SECRET_AUTH_ADMIN) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token Authorization'
    })
  }

  next()
}
