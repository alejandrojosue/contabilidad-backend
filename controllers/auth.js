import { logApiMiddleware } from '../middlewares/log-api-middleware.js'
import { pool } from '../database/config.js'
import bcryptjs from 'bcryptjs'
import { request, response } from 'express'
import { decodeToken, generate } from '../helpers/jwt-generate.js'
import { sendConfirmationEmail } from '../helpers/send-email.js'

export const login = logApiMiddleware(async (req = request, res = response) => {
  const { identifier, password } = req.body

  try {
    const result = await pool.query('SELECT public.get_user_credentials($1) AS user', [identifier])
    const user = result?.rows[0]?.user?.split(',')[0].replace('(', '')
    const pass = result?.rows[0]?.user?.split(',')[1]
    const username = result?.rows[0]?.user?.split(',')[2]
    const errorCode = result?.rows[0]?.user?.split(',')[3].replace(')', '')

    // eslint-disable-next-line
    if (errorCode !== '0000') { throw { status: 401, code: errorCode } }

    const isMatch = await bcryptjs.compare(password, pass)

    // eslint-disable-next-line
    if (!isMatch) { throw { status: 401, code: 'USR01' } }
    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000']
    res.locals.trm3 = ['', `${user}|${identifier}|${username}`]

    res.json({
      id: user,
      email: identifier,
      username
    })
  } catch (error) {
  // eslint-disable-next-line
  throw { status: error.status ?? 500, code: error.code, message: error.message }
  }
})

export const register = logApiMiddleware(async (req = request, res = response) => {
  const { username, email, password, idRol, idUserCreator = 1, uType = 'ADMIN' } = req.body
  try {
    const salt = await bcryptjs.genSalt(process.env.API_SALT)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const jwt = await generate(`${email}|${username}`)

    const result = await pool.query('SELECT * from public.register_user($1,$2,$3,$4,$5,$6,$7)', [username, email, hashedPassword, jwt, idRol, idUserCreator, uType])
    const userId = result?.rows[0]?.userid
    const errorCode = result?.rows[0]?.errorcode
    const suggestedUsername = result?.rows[0]?.suggestedusername

    // eslint-disable-next-line
    if (suggestedUsername) throw { status: 409, code: errorCode, message: `El nombre de usuario ya existe, se sugiere usar: ${suggestedUsername}`}

    // eslint-disable-next-line
    if (errorCode === 'USR08') throw { status: 409, code: errorCode}

    // eslint-disable-next-line
    if (!userId) throw { status: 409, code: errorCode }

    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000', `${userId}|${email}|${username}`]
    await sendConfirmationEmail(username, email, jwt)
    res.status(201).json({
      id: userId,
      email,
      username
    })
  } catch (error) {
    // eslint-disable-next-line
    throw { status: error.status ?? 500, code: error.code, message: error.message }
  }
})

export const logout = logApiMiddleware(async (req = request, res = response) => {

})

export const forgotPassword = logApiMiddleware(async (req = request, res = response) => {

})

export const confirmation = logApiMiddleware(async (req = request, res = response) => {
  const { token } = req.body
  const { uid } = decodeToken(token)
  try {
    const email = uid.split('|')[0]
    const result = await pool.query('select * from public.confirm_user($1,$2)', [email, token])
    const userId = result?.rows[0]?.userid
    const errorCode = result?.rows[0]?.errorcode

    // eslint-disable-next-line
    if (!userId) throw { status: 400, code: errorCode }
    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000', `${userId}|${email}`]
    res.status(200).json({
      id: userId,
      email
    })
  } catch (error) {
    // eslint-disable-next-line
    throw { status: error.status ?? 500, code: error.code, message: error.message }
  }
})
