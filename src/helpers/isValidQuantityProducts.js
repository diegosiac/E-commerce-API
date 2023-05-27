
export const isValidQuantityProducts = (value) => {
  if (value.length < 1) {
    throw new Error('The quantity of products must be greater than or equal to 1')
  }

  return true
}
