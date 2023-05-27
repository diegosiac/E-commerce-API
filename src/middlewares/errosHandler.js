
export const logErrors = (err, req, res, next) => {
  console.log(err)
  next(err)
}

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    ok: false,
    msg: 'Please talk to the administrator'
  })
}
