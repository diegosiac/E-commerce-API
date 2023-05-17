import app from './app.js'
import dbConnection from './database/config.js'

dbConnection()

app.listen(3000, () => {
  console.log('server ON padre')
})
