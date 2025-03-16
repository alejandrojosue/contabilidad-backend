import { pool } from '../database/config.js'

export const errorMessages = async ({ errorCode }) => {
  try {
    const result = await pool.query('SELECT public.get_error_message($1) AS msgerror', [errorCode])
    return result.rows[0].msgerror
  } catch (error) {
    console.log('Error al obtener mensaje error')
    return 'Falló la función errorMessages de la API.'
  }
}
