import { response } from 'express'
import { validationResult } from 'express-validator'
import { errorFormatter } from '../helpers/errorFormatter.js'

const validateFields = (req, res = response, next) => {
  const errors = validationResult(req).formatWith(errorFormatter)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })
  }

  next()
}

export default validateFields
