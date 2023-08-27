import Product from '../../src/models/Product'

export const deleteProductsDb = async ({ products }) => {
  const productSave = products.map(async (product) => {
    return await Product.findByIdAndDelete(product.id)
  })

  await Promise.all(productSave)
}
