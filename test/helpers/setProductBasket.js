import User from '../../src/models/User'
import { setProductDb } from './setProductDb'

export const setProductBasket = async ({ email, products }) => {
  const productList = await setProductDb({ products })
  const user = await User.findOne({ email })

  const data = productList.map(({ name, thumbnail, value, stock, id, description, category }) => {
    return {
      name,
      thumbnail,
      value,
      stock,
      id_product: id,
      quantity: 1,
      description,
      category
    }
  })

  user.basket = data

  await user.save()

  return productList
}
