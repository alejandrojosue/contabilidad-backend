import { logApiMiddleware } from '../middlewares/log-api-middleware.js'
import { pool } from '../database/config.js'
import { request, response } from 'express'
import { REST } from '../config/api.js'

export const getCustomerByUser = logApiMiddleware(async (req = request, res = response) => {
  const { limit = REST.defaultLimit, from = 1 } = req.query
  const info = req.info?.uid
  const identifier = info?.identifier ?? ''
  const user = info?.user ?? 0

  try {
    const result = await pool.query(
      'SELECT * FROM view_customers_by_user WHERE user_id = $1 OFFSET $2 LIMIT $3',
      [user, from, limit > REST.maxLimit ? REST.maxLimit : limit]
    )
    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000']
    res.locals.trm3 = ['', `email=${identifier}`]
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

// export const getBranchesByUser = logApiMiddleware(async (req = request, res = response) => {
//   const { limit = REST.defaultLimit, from = 1 } = req.query
//   const info = req.info?.uid
//   const identifier = info?.identifier ?? ''
//   const user = info?.user ?? ''

//   try {
//     const result = await pool.query(
//       'SELECT * FROM view_branches_by_user WHERE cuu.user_id = $1 OFFSET $2 LIMIT $3',
//       [user, from, limit > REST.maxLimit ? REST.maxLimit : limit]
//     )
//     res.locals.trm1 = ['RE', 'DA']
//     res.locals.trm2 = ['0000']
//     res.locals.trm3 = ['', `email=${identifier}`]
//     res.json({
//       count: result.rowCount,
//       limit,
//       values: result.rows
//     })
//   } catch (error) {
//     // eslint-disable-next-line
//     throw { status: 500, code: error.code, message: error.message }
//   }
// })
