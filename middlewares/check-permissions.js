import { pool } from '../database/config.js'

export const checkPermissions = async (req, res, next) => {
  try {
    const role = req.info?.uid?.role // Obtiene el role del usuario autenticado
    const { method, originalUrl } = req // Método HTTP y endpont
    if (!role) {
      return res.status(403).json({
        error: {
          msg: 'No tienes permiso para acceder a este recurso',
          details: []
        }
      })
    }
    const query = `
      SELECT 1 
      FROM up_permissions 
      WHERE role_id = $1 AND action = $2
      LIMIT 1
    `
    const action = `API::${originalUrl.split('?')[0]}::${method}`
    const values = [role, action]
    const { rowCount } = await pool.query(query, values)
    if (rowCount === 0) {
      return res.status(403).json({
        error: {
          msg: 'No tienes permiso para acceder a este recurso',
          details: []
        }
      })
    }

    next() // Permitir acceso si tiene permisos
  } catch (error) {
    console.error('Error verificando permisos:', error.message)
    res.status(500).json({
      error: {
        msg: 'Error interno del servidor',
        details: []
      }
    })
  }
}
