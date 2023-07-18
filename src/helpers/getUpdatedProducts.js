import Product from '../models/Product.js'

export const getUpdatedProducts = async (basket) => {
  if (basket.length === 0) return []

  const products = await Product.find()

  const newBasket = products.map(product => {
    const isBasketProduct = basket.find((item) => item.id_product === String(product._id))

    if (isBasketProduct) {
      const { name, thumbnail, value, stock, id, description, category } = product

      return {
        name,
        thumbnail,
        value,
        stock,
        id_product: id,
        description,
        category,
        quantity: isBasketProduct.quantity
      }
    }

    return null
  })

  return newBasket.filter((doc) => doc !== null)
}
