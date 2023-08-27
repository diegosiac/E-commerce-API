import Product from '../../src/models/Product'

export const setProductDb = async ({ products }) => {
  const productsData = []

  const productSave = products.map(async (product) => {
    const isExist = await Product.findOne({ name: product.name }).exec()

    if (!isExist) {
      const newProduct = new Product(product)

      const { _id, ...restProduct } = newProduct.toObject()

      productsData.push({ ...restProduct, id: String(_id) })

      return newProduct.save()
    }
  })

  await Promise.all(productSave)

  return productsData
}
