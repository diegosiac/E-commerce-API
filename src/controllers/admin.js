import { response, request } from 'express'
import User from '../models/User.js'

export const deleteUser = async (req = request, res = response, next) => {
  const { email } = req.body

  try {
    const user = await User.findOneAndDelete({ email })

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'The user does not exist with that email'
      })
    }

    res.status(200).json({
      ok: true,
      msg: 'The user was deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
