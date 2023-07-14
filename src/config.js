import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT,
  DB_CNN: process.env.DB_CNN,
  API_PAYPAL: 'https://api-m.sandbox.paypal.com',
  API_TOKEN_PAYPAL: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
  CLIENT_PAYPAL: process.env.CLIENT_PAYPAL,
  SECRET_PAYPAL: process.env.SECRET_PAYPAL,
  SECRET_JWT_SEED: process.env.SECRET_JWT_SEED,
  SECRET_JWT_SEED_ADMIN: process.env.SECRET_JWT_SEED_ADMIN,
  SECRET_JWT_SEED_PORTAL: process.env.SECRET_JWT_SEED_PORTAL,
  SECRET_AUTH_ADMIN: process.env.SECRET_AUTH_ADMIN,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
  GOOGLE_KEY: process.env.GOOGLE_KEY,
  GOOGLE_URL: process.env.GOOGLE_URL
}
