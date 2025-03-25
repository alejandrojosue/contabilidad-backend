import { pool } from '../database/config.js'
import { request, response } from 'express'
import { REST } from '../config/api.js'

export const get = async (req = request, res = response) => {
  const { code = '' } = req.query
  try {
    const result = await pool.query('SELECT * FROM error_messages WHERE COALESCE(NULLIF($1, \'\'), error_code) = error_code ORDER BY error_code', [code])
    res.json({
      count: result.rowCount,
      limit: REST.defaultLimit,
      values: result.rows.map((row) => {
        return {
          code: row.error_code,
          message: row.error_message
        }
      })
    })
  } catch (error) {
  }
}
