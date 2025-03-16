import { checkConnection } from '../database/config.js'

export const validateDBConnection = async (req, res, next) => {
  const dbConnected = await checkConnection()
  if (!dbConnected) {
    console.error('La base de datos no está disponible. Saliendo...')
    return res.status(503).json({
      error: {
        msg: 'Servicio no disponible.',
        details: []
      }
    })
  }

  next()
}
