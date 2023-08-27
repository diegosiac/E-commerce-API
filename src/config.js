import dotenv from 'dotenv'

dotenv.config()

const dbCnn = () => {
  const env = process.env.NODE_ENV

  if (env === 'production') {
    return process.env.DB_CNN_PRODUCTION
  } else if (env === 'development') {
    return process.env.DB_CNN_DEVEPLOMENT
  } else if (env === 'test') {
    return process.env.DB_CNN_TEST
  }
}

const algoliaENV = () => {
  const env = process.env.NODE_ENV

  if (env === 'production') {
    return process.env.ALGOLIA_INDEX_NAME_PROD
  } else {
    return process.env.ALGOLIA_INDEX_NAME_DEV
  }
}

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  URL_BACK: process.env.URL_BACK,
  URL_FRONT: process.env.URL_FRONT,
  DB_CNN: dbCnn(),
  API_PAYPAL: 'https://api-m.sandbox.paypal.com',
  API_TOKEN_PAYPAL: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
  CLIENT_PAYPAL: process.env.CLIENT_PAYPAL,
  SECRET_PAYPAL: process.env.SECRET_PAYPAL,
  SECRET_JWT_SEED: process.env.SECRET_JWT_SEED,
  SECRET_JWT_SEED_ADMIN: process.env.SECRET_JWT_SEED_ADMIN,
  SECRET_AUTH_ADMIN: process.env.SECRET_AUTH_ADMIN,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME: algoliaENV(),
  GOOGLE_KEY: process.env.GOOGLE_KEY,
  GOOGLE_URL: process.env.GOOGLE_URL
}
