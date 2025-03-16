import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { JWT_SECRET } from '../config/admin.js'
const signAsync = promisify(jwt.sign)

export const generate = async (uid = '') => {
  const payload = { uid }

  try {
    const token = await signAsync(payload, JWT_SECRET, { expiresIn: '4h' })
    return token
  } catch (err) {
    console.error('Error al generar JWT: ' + err.message)
    return null
  }
}
