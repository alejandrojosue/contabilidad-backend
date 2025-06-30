import { request, response } from 'express'
import { pool } from '../database/config.js'

export const get = async (req = request, res = response) => {
  const { limit = 10 } = req.query
  const result = await pool.query(
    'select * from api_call_details order by id desc limit $1',
    [limit]
  )
  res.json({
    count: result.rowCount,
    values: result.rows
  })
}
