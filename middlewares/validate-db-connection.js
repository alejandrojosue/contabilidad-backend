import { getConnectionStatus } from '../database/config.js'

export const validateDBConnection = (req, res, next) => {
  if (!getConnectionStatus()) {
    return res.status(503).json({
      error: {
        msg: 'Servicio no disponible.',
        details: []
      }
    })
  }
  next()
}
