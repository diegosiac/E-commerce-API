
export const isValidShipment = (value) => {
  if (value.shippingTime && value.shippingFrom && typeof value.shippingTime === 'string' && typeof value.shippingFrom === 'string') return true

  return false
}
