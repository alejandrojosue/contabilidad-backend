import { logApiMiddleware } from '../middlewares/log-api-middleware.js'
import { pool } from '../database/config.js'
import { request, response } from 'express'
import { REST } from '../config/api.js'

export const create = logApiMiddleware(async (req = request, res = response) => {
  const { data1, data2 } = req.body
  const info = req.info?.uid

  const user = info?.user ?? 0
  const params = [user, ...[]]
  try {
    const result = await pool.query(
      'PL/SQL',
      [params]
    )
    const userId = result?.rows[0]?.userid
    const errorCode = result?.rows[0]?.errorcode

    if (errorCode !== '0000') {
    // eslint-disable-next-line
    throw { status: 400, code: errorCode }
    }

    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000']
    res.locals.trm3 = ['', `${userId}|${data1}|${data2}`]
    res.json({
      count: result.rowCount,
      limit: REST.defaultLimit,
      values: [{
        data1,
        data2
      }]
    })
  } catch (error) {
    // eslint-disable-next-line
   throw { status: error.status ?? 500, code: error.code, message: error.message }
  }
})
