import { response } from 'express'
import { index } from '../algolia/config.js'

export const getSearchProducts = async (req, res = response, next) => {
  try {
    const { hits } = await index.search(req.query.query, { filters: 'stock >= 1' })

    const transformedResults = hits.map(({ _highlightResult, objectID, ...rest }) => {
      return {
        id: objectID,
        ...rest
      }
    })

    res.status(200).json({
      ok: true,
      queries: transformedResults
    })
  } catch (error) {
    next(error)
  }
}
