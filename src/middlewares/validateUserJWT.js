import { response } from 'express'
import jwt from 'jsonwebtoken'

export const validateUserJWT = (req, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'x-token token is missing'
    })
  }

  try {
    const { name, email } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    )

    req.name = name
    req.email = email
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    })
  }

  next()
}
