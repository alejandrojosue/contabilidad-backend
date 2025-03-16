import { logApiMiddleware } from '../middlewares/log-api-middleware.js'
import { pool } from '../database/config.js'
import { request, response } from 'express'
import { REST } from '../config/api.js'

export const get = logApiMiddleware(async (req = request, res = response) => {
  const { limit = REST.defaultLimit, from = 100 } = req.query

  try {
    const result = await pool.query(
      'SELECT * FROM VAULOG OFFSET $1 LIMIT $2',
      [from, limit > REST.maxLimit ? REST.maxLimit : limit]
    )

    res.json({
      count: result.rowCount,
      limit,
      values: result.rows
    })
  } catch (error) {
    // eslint-disable-next-line
    throw { status: 500, code: error.code, message: error.message }
  }
})
