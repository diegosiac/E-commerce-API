
export const isContainIDorTitle = (value, { req }) => {
  if (!req.query.id && !req.query.title) return false

  return true
}
