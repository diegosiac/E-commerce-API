import axios from 'axios'
import config from '../config.js'

export const createTokenPPL = async () => {
  try {
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    const { data } = await axios.post(config.API_TOKEN_PAYPAL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: config.CLIENT_PAYPAL,
        password: config.SECRET_PAYPAL
      }
    })
    return data.access_token
  } catch (error) {
    return new Error(error)
  }
}
