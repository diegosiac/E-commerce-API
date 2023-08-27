import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import products from './routes/products.js'
import adminProducts from './routes/adminProducs.js'
import authAdmin from './routes/authAdmin.js'
import auth from './routes/auth.js'
import user from './routes/user.js'
import payments from './routes/payments.js'
import search from './routes/search.js'
import admin from './routes/admin.js'
import { errorHandler, logErrors } from './middlewares/errosHandler.js'

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.disable('x-powered-by')

app.use('/api/products', products)

app.use('/api/search', search)

app.use('/api/payments', payments)

app.use('/api/auth', auth)

app.use('/api/user', user)

app.use('/api/admin/products', adminProducts)

app.use('/api/admin/auth', authAdmin)

app.use('/api/admin', admin)

app.use(logErrors)
app.use(errorHandler)

export default app
