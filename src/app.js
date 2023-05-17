import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import products from './routes/products.js'
import adminProducts from './routes/adminProducs.js'
import auth from './routes/auth.js'

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use( express.static('public') );

app.use('/api/products', products)

app.use('/api/admin/products', adminProducts)

app.use('/api/auth', auth)

// app.get('*', (req, res) => {
// //   res.sendFile(__dirname + '/public/index.html')
//   res.sendFile(`${__dirname}/public/index.html`)
// })

export default app
