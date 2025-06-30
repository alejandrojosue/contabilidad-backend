import { pool } from '../database/config.js'
import { REST } from '../config/api.js'

export const create = async ({ body, params, query, user }) => {
  const { rtn, name, address, email, phones, ownerName, planId } = body

  const _user = user?.id ?? 0
  const identifier = user?.identifier

  try {
    const result = await pool.query(
      'SELECT * FROM insert_company($1,$2,$3,$4,$5,$6,$7,$8)',
      [_user, rtn, name, address, email, phones, ownerName, planId]
    )
    const userId = result?.rows[0]?.userid
    const errorCode = result?.rows[0]?.errorcode

    if (errorCode !== '0000') {
      // eslint-disable-next-line
   throw { status: 400, code: errorCode }
    }

    const res = null
    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000']
    res.locals.trm3 = ['', `email=${identifier}`]
    res.locals.trm4 = ['', `${userId}|${rtn}|${name}|${address}|${email}|${phones}|${ownerName}|${planId}`]

    return {
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
    }
  } catch (error) {

  }
}
