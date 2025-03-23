import { response, request } from 'express'
import { pool } from '../database/config.js'
import { REST } from '../config/api.js'
import { logApiMiddleware } from '../middlewares/log-api-middleware.js'

export const post = logApiMiddleware(async (req = request, res = response) => {
  const { firstname, lastname, email, username, password, resetPasswordToken, registrationToken, isActive, roles, createdByUserId, updatedByUserId, userType } = req.body

  try {
    await pool.query(
      'SELECT insert_strapi_administrator($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
      [firstname, lastname, email, username, password, resetPasswordToken, registrationToken, isActive, roles, createdByUserId, updatedByUserId, userType]
    )
  } catch (error) {
    // eslint-disable-next-line
    throw { status: 500, code: error.code, message: error.message }
  }
})

export const getPermissionsByRole = logApiMiddleware(async (req = request, res = response) => {
  const info = req.info?.uid
  try {
    const result = await pool.query(
      'SELECT action FROM VUPRM where role = $1',
      [info.role ?? 0]
    )

    res.json({
      count: result.rowCount,
      limit: REST.maxLimit,
      values: result.rows
    })
  } catch (error) {
    // eslint-disable-next-line
      throw { status: 500, code: error.code, message: error.message }
  }
})
