import axios from 'axios'
import config from '../config.js'

export const isValidZip = async (value, { req }) => {
  try {
    const countryRegion = req.body.address.countryRegion

    if (!countryRegion) throw new Error('CountryRegion is needed to validate the zip')

    const components = `country:${countryRegion}|postal_code:${value}`
    const { data } = await axios.get(config.GOOGLE_URL, {
      params: {
        components,
        key: config.GOOGLE_KEY
      }
    })

    if (data.status !== 'OK') throw new Error('The zip code is not valid')

    return true
  } catch (error) {
    throw new Error('There was a problem on the server contact the administrator')
  }
}
