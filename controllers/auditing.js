import { response, request } from 'express'
import { pool } from '../database/config.js'

const get = async (req = request, res = response) => {
  const result = await pool.query('SELECT * FROM VAULOG')

  res.json({
    values: result.rows
  })
}
export {
  get
}
