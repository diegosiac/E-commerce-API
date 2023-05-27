
export const isContainIDorTitle = (value, { req }) => {
  if (!req.query.id && !req.query.name) return false

  return true
}
