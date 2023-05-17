import { response, request } from 'express'
import Product from '../models/Product.js'

export const getProducts = async (req = request, res = response) => {
  try {
    const products = await Product.find()

    if (products.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No products available'
      })
    }

    res.status(201).json({
      ok: true,
      data: {
        products,
        pagination: '1'
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    })
  }
}

export const getProductByIdAndTitle = async (req = request, res = response) => {
  try {
    const product = req.query.id
      ? await Product.findById(req.query.id)
      : await Product.findOne({ title: req.query.title })

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: 'The product does not exist with the provided identifier'
      })
    }

    res.status(201).json({
      ok: true,
      data: {
        product
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    })
  }
}

export const getProductsByCategory = async (req = request, res = response) => {
  const category = req.params.category

  try {
    const products = await Product.find({ category })

    if (products.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'There are no products with the category provided'
      })
    }

    res.status(201).json({
      ok: true,
      data: {
        category,
        products
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    })
  }
}

export const createProduct = async (req = request, res = response) => {
  try {
    const product = new Product(req.body)
    await product.save()

    res.status(201).json({
      ok: true,
      msg: 'The product was successfully saved',
      data: {
        title: product.title,
        id: product.id
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    })
  }
}

export const deleteProduct = async (req = request, res = response) => {
  const productId = req.query.id

  try {
    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: 'There is no product with the provided id'
      })
    }

    res.status(201).json({
      ok: true,
      msg: 'The product was successfully removed'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    })
  }
}

export const updateProduct = async (req = request, res = response) => {
  const productId = req.query.id

  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true })

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: 'There is no product with the provided id'
      })
    }

    res.status(201).json({
      ok: true,
      data: {
        product
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    })
  }
}
