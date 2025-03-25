import { logApiMiddleware } from '../middlewares/log-api-middleware.js'
import { pool } from '../database/config.js'
import { request, response } from 'express'
import { REST } from '../config/api.js'

export const getCompanyByUser = logApiMiddleware(async (req = request, res = response) => {
  const { limit = REST.defaultLimit, from = 1 } = req.query
  const info = req.info?.uid
  const identifier = info?.identifier ?? ''
  const user = info?.user ?? ''

  try {
    const result = await pool.query(
      'SELECT * FROM companies WHERE created_by_user_id = $1 OFFSET $2 LIMIT $3',
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

export const create = logApiMiddleware(async (req = request, res = response) => {
  const { rtn, name, address, email, phones, ownerName, planId } = req.body
  const info = req.info?.uid

  const user = info?.user ?? 0
  const identifier = info?.identifier

  try {
    const result = await pool.query(
      'SELECT * FROM insert_company($1,$2,$3,$4,$5,$6,$7,$8)',
      [user, rtn, name, address, email, phones, ownerName, planId]
    )
    const userId = result?.rows[0]?.userid
    const errorCode = result?.rows[0]?.errorcode

    if (errorCode !== '0000') {
    // eslint-disable-next-line
    throw { status: 400, code: errorCode }
    }

    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000']
    res.locals.trm3 = ['', `email=${identifier}`]
    res.locals.trm4 = ['', `${userId}|${rtn}|${name}|${address}|${email}|${phones}|${ownerName}|${planId}`]

    res.json({
      count: result.rowCount,
      limit: REST.defaultLimit,
      values: [{
        rtn,
        name,
        address,
        email,
        phones,
        ownerName,
        isActive: true,
        planId
      }]
    })
  } catch (error) {
    // eslint-disable-next-line
   throw { status: error.status ?? 500, code: error.code, message: error.message }
  }
})

export const update = logApiMiddleware(async (req = request, res = response) => {
  const { rtn } = req.params
  const { name, address, email, phones, ownerName, planId } = req.body
  const info = req.info?.uid

  const user = info?.user ?? 0
  const identifier = info?.identifier

  try {
    const result = await pool.query(
      'SELECT * FROM update_company($1,$2,$3,$4,$5,$6,$7,$8)',
      [user, rtn, name, address, email, !phones ? {} : phones, ownerName, planId]
    )
    const userId = result?.rows[0]?.userid
    const errorCode = result?.rows[0]?.errorcode

    if (errorCode !== '0000') {
    // eslint-disable-next-line
    throw { status: 400, code: errorCode }
    }

    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000']
    res.locals.trm3 = ['', `email=${identifier}`]
    res.locals.trm4 = ['', `${userId}|${rtn}|${name}|${address}|${email}|${phones}|${ownerName}|${planId}`]
    res.json({
      count: result.rowCount,
      limit: REST.defaultLimit,
      values: [{
        rtn,
        name,
        address,
        email,
        phones,
        ownerName,
        isActive: true,
        planId
      }]
    })
  } catch (error) {
    // eslint-disable-next-line
   throw { status: error.status ?? 500, code: error.code, message: error.message }
  }
})
