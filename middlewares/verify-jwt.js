import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/admin.js'

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] // 'Bearer <token>'
  if (!token) {
    return res.status(401).json({
      error: {
        msg: 'Credenciales inválidas',
        details: []
      }
    })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: {
          msg: 'Credenciales inválidas',
          details: []
        }
      })
    }

    req.info = decoded // Almacenar la información del usuario en req.info
    next()
  })
}
