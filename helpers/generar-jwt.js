import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const signAsync = promisify(jwt.sign)

const generarJWT = async (uid = '') => {
  const payload = { uid }

  try {
    const token = await signAsync(payload, process.env.JWT_SECRET, { expiresIn: '4h' })
    return token
  } catch (err) {
    console.error(err)
    throw new Error('No se pudo generar el Token')
  }
}

export {
  generarJWT
}
