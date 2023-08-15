import mongoose from 'mongoose'
import config from '../config.js'

const dbConnection = async () => {
  try {
    await mongoose.connect(config.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('DB online :/')
  } catch (error) {
    console.log(error)
    throw new Error('Error a la hora de inicializar DB')
  };
}

export default dbConnection
