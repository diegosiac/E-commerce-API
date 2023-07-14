import algoliasearch from 'algoliasearch'
import config from '../config.js'

const client = algoliasearch(config.ALGOLIA_APP_ID, config.ALGOLIA_API_KEY)
export const index = client.initIndex(config.ALGOLIA_INDEX_NAME)
