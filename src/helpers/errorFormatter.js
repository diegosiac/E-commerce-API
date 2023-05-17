export const errorFormatter = ({ location, msg, path }) => {
  return {
    msg,
    location,
    value: path
  }
}
