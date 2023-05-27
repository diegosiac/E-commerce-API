import paypal from '@paypal/checkout-server-sdk'

import config from '../config.js'

const clientId = config.CLIENT_PAYPAL
const clientSecret = config.SECRET_PAYPAL

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
export const client = new paypal.core.PayPalHttpClient(environment)
