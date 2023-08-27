import { response, request } from 'express'
import Product from '../models/Product.js'
import { index } from '../algolia/config.js'

export const getProducts = async (req = request, res = response, next) => {
  try {
    const products = await Product.find({ stock: { $gte: 1 } }).select('-createdAt -updatedAt')

    res.status(200).json({
      ok: true,
      data: {
        products,
        results: products.length
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req = request, res = response, next) => {
  try {
    const product = await Product.findById(req.query.id).select('-createdAt -updatedAt')

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: 'The product does not exist with the provided identifier'
      })
    }

    res.status(200).json({
      ok: true,
      data: {
        product
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getProductsByCategory = async (req = request, res = response, next) => {
  const category = req.params.category

  try {
    const products = await Product.find({ category }).select('-createdAt -updatedAt')

    res.status(200).json({
      ok: true,
      data: {
        category,
        products
      }
    })
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req = request, res = response, next) => {
  try {
    const product = new Product(req.body)

    const { name, description, thumbnail, value, stock, _id, category } = product.toObject()

    await index.saveObject({
      name,
      description,
      thumbnail,
      value,
      stock,
      category,
      objectID: _id
    })

    await product.save()
    res.status(201).json({
      ok: true,
      data: {
        msg: 'The product was successfully saved',
        name,
        id: _id
      }
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req = request, res = response, next) => {
  const productId = req.query.id

  try {
    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: 'There is no product with the provided id'
      })
    }

    await index.deleteObject(productId)

    res.status(200).json({
      ok: true,
      msg: 'The product was successfully removed'
    })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req = request, res = response, next) => {
  const productId = req.query.id

  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true }).select('-createdAt -updatedAt')

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: 'There is no product with the provided id'
      })
    }

    const { name, description, thumbnail, value, stock, _id, category } = product.toObject()

    await index.saveObject({
      name,
      description,
      thumbnail,
      value,
      stock,
      category,
      objectID: _id
    })

    res.status(201).json({
      ok: true,
      data: {
        product
      }
    })
  } catch (error) {
    next(error)
  }
}
