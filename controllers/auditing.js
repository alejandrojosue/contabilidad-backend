import { response, request } from 'express'
import { pool } from '../database/config.js'
import { REST } from '../config/api.js'
import { processAPI, processAPIDetails } from '../helpers/api_call.js'
export const get = async (req = request, res = response) => {
  const { limit = REST.defaultLimit, from = 100 } = req.query
  const { user, origin, channel, uType } = req.body
  const ref = await processAPI({
    chn: channel,
    origin,
    uri: req.originalUrl,
    useri: user,
    uType,
    act: 'GET'
  })
  try {
    const result = await pool.query(
      'SELECT * FROM VAULOG offset $1 LIMIT $2',
      [from, limit > REST.maxLimit ? REST.maxLimit : limit]
    )
    await processAPIDetails({ ref: ref.rows[0].insert_api_call, trm1: 'RE', trm2: '0000', trm4: 'OK' })

    res.json({
      count: result.rowCount,
      limit,
      values: result.rows
    // fields: result.fields.map(field => field.name)
    })
  } catch (error) {
    await processAPIDetails({ ref: ref.rows[0].insert_api_call, trm1: 'RE', trm2: 'status: 500', trm3: error.code, trm4: error.message })
    res.status(500).json({
      msg: 'Error interno del servidor',
      error: error.message
    })
  }
}
