import dotenv from 'dotenv'

dotenv.config()

export default {
  DB_CNN: process.env.DB_CNN,
  SECRET_JWT_SEED: process.env.SECRET_JWT_SEED
}
