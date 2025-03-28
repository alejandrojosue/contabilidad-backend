import { logApiMiddleware } from '../middlewares/log-api-middleware.js'
import { pool } from '../database/config.js'
import bcryptjs from 'bcryptjs'
import { request, response } from 'express'
import { decodeAndVerifyToken, decodeToken, generate } from '../helpers/jwt-generate.js'
import { sendConfirmationEmail, sendRecoveryPassEmail } from '../helpers/send-email.js'
import { API_SALT } from '../config/admin.js'

export const login = logApiMiddleware(async (req = request, res = response) => {
  const { identifier, password, origin = '192.131.41.4', channel = 'W', uType = 'USER' } = req.body
  try {
    const result = await pool.query('SELECT public.get_user_credentials($1) AS user', [identifier])
    const user = result?.rows[0]?.user?.split(',')[0].replace('(', '')
    const pass = result?.rows[0]?.user?.split(',')[1]
    const username = result?.rows[0]?.user?.split(',')[2]
    const role = result?.rows[0]?.user?.split(',')[3]
    const errorCode = result?.rows[0]?.user?.split(',')[4].replace(')', '')

    // eslint-disable-next-line
    if (errorCode !== '0000') { throw { status: 401, code: errorCode } }

    const isMatch = await bcryptjs.compare(password, pass)
    // eslint-disable-next-line
    if (!isMatch) { throw { status: 401, code: 'USR01' } }
    const jwt = await generate({ identifier, password, role, user, origin, channel, uType })
    // eslint-disable-next-line
    if (!jwt) throw { status: 500, code: 500, message: 'Error al generar jwt' }

    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000']
    res.locals.trm3 = ['', `${user}|${identifier}|${username}|${role}`]

    res.json({
      id: user,
      email: identifier,
      username,
      jwt
    })
  } catch (error) {
    // eslint-disable-next-line
    throw { status: error.status ?? 500, code: error.code, message: error.message }
  }
})

export const register = logApiMiddleware(async (req = request, res = response) => {
  const { username, email, password, idRol, idUserCreator = 1, uType = 'ADMIN' } = req.body
  try {
    const salt = await bcryptjs.genSalt(API_SALT)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const jwt = await generate(`${email}|${username}`)

    // eslint-disable-next-line
    if (!jwt) throw { status: 500, code: 500, message: 'Error al generar jwt' }

    const result = await pool.query('SELECT * from public.register_user($1,$2,$3,$4,$5,$6,$7)', [username, email, hashedPassword, jwt, idRol, idUserCreator, uType])
    const userId = result?.rows[0]?.userid
    const errorCode = result?.rows[0]?.errorcode
    const suggestedUsername = result?.rows[0]?.suggestedusername

    // eslint-disable-next-line
    if (suggestedUsername) throw { status: 409, code: errorCode, message: `El nombre de usuario ya existe, se sugiere usar: ${suggestedUsername}` }

    // eslint-disable-next-line
    if (errorCode === 'USR08') throw { status: 409, code: errorCode } //El email ya está siendo utilizado por otro usuario.

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

export const forgotPassword = logApiMiddleware(async (req = request, res = response) => {
  const { email } = req.body
  try {
    const jwt = await generate({ email })
    // eslint-disable-next-line
    if (!jwt) throw { status: 500, code: 500, message: 'Error al generar jwt' }
    const result = await pool.query('SELECT * from public.forgot_user($1,$2)', [email, jwt])
    const userId = result?.rows[0]?.userid
    const errorCode = result?.rows[0]?.errorcode

    // eslint-disable-next-line
    if (errorCode !== '0000') throw { status: 400, code: errorCode }

    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000', `${userId}|${email}`]
    await sendRecoveryPassEmail(email, jwt)
    res.status(200).json({
      id: userId,
      email
    })
  } catch (error) {
    // eslint-disable-next-line
    throw { status: error.status ?? 500, code: error.code, message: error.message }
  }
})

export const confirmation = logApiMiddleware(async (req = request, res = response) => {
  const { token } = req.body
  const decoded = decodeToken(token)
  try {
    const email = decoded?.uid.split('|')[0]
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

export const passwordReset = logApiMiddleware(async (req = request, res = response) => {
  const { email, password } = req.body
  try {
    const salt = await bcryptjs.genSalt(API_SALT)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const jwt = await generate(`${email}|${password}`)

    // eslint-disable-next-line
    if (!jwt) throw { status: 500, code: 500, message: 'Error al generar jwt' }

    const result = await pool.query('SELECT * from public.reset_pass_user($1,$2)', [email, hashedPassword])
    const userId = result?.rows[0]?.userid
    const errorCode = result?.rows[0]?.errorcode

    // eslint-disable-next-line
    if (errorCode !== '0000') throw { status: 400, code: errorCode }

    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000', `${userId}|${email}|`]
    res.status(200).json({
      id: userId,
      email
    })
  } catch (error) {
    // eslint-disable-next-line
    throw { status: error.status ?? 500, code: error.code, message: error.message }
  }
})

export const verifyTokenPasswordReset = logApiMiddleware(async (req = request, res = response) => {
  const { token } = req.body
  const decoded = decodeAndVerifyToken(token)
  try {
    // eslint-disable-next-line
    if (!decoded?.uid?.email) throw { status: 400, code: 'USR09' } //El enlace no es válido o ha expirado.
    const result = await pool.query('select id from up_users where reset_password_token = $1', [decoded?.uid])
    // eslint-disable-next-line
    if (result?.rows[0]?.count === 0) throw { status: 400, code: 'USR09'} //El enlace no es válido o ha expirado.
    const email = decoded?.uid?.email
    const userId = result?.rows[0]?.id

    res.locals.trm1 = ['RE', 'DA']
    res.locals.trm2 = ['0000', `${email}`]
    res.status(200).json({
      id: userId,
      email
    })
  } catch (error) {
    // eslint-disable-next-line
    throw { status: error.status ?? 500, code: error.code, message: error.message }
  }
})
