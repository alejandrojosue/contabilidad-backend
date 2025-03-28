import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { JWT_SECRET } from '../config/admin.js'
const signAsync = promisify(jwt.sign)

export const generate = async (uid = '', expire = false) => {
  const payload = { uid }

  try {
    let token = null
    if (expire) {
      token = await signAsync(payload, JWT_SECRET, { expiresIn: '4h' })
    } else {
      token = await signAsync(payload, JWT_SECRET, { expiresIn: '4h' })
    }
    return token
  } catch (err) {
    console.error('Error al generar JWT: ' + err.message)
    return null
  }
}

export const decodeToken = (token) => {
  return jwt.decode(token)
}

export const decodeAndVerifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return null
    }
    return decoded
  })
}
