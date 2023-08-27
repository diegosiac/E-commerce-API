import { index } from '../../src/algolia/config'

export const createRecord = async ({ name, description, thumbnail, value, stock, category, id }) => {
  try {
    await index.saveObject({
      name,
      description,
      thumbnail,
      value,
      stock,
      category,
      objectID: id
    })
  } catch (error) {
    return new Error(error)
  }
}

export const deleteRecord = async ({ id }) => {
  try {
    await index.deleteObject(id)
  } catch (error) {
    return new Error(error)
  }
}

export const deleteRecords = async ({ products }) => {
  try {
    await Promise.all(products.map(async (product) => {
      await deleteRecord({ id: product.id })
    }))
  } catch (error) {
    return new Error(error)
  }
}
