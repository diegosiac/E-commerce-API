import app from './app.js'
import config from './config.js'
import dbConnection from './database/config.js'

dbConnection()

app.listen(config.PORT, () => {
  console.log('server ON')
})
