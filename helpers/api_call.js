import { pool } from '../database/config.js'
export const processAPI = async ({ chn, origin, uri, useri, uType, act }) => {
  try {
    const ref = await pool.query(
      'SELECT insert_api_call($1::CHAR, $2::INET, $3::INTEGER, $4::TEXT, $5::TEXT, $6::TEXT)',
      [chn, origin, useri, uri, uType, act]
    )
    return ref
  } catch (error) {
    console.error('Error al procesar la API:', error.message)
    return {
      rows: [{ insert_api_call: null }]
    }
  }
}

export const processAPIDetails = async ({ ref, trm1 = '', trm2 = '', trm3 = '', trm4 = '' }) => {
  if (!ref) {
    console.error('Referencia de API inválida:', ref)
    return
  }
  try {
    await pool.query('SELECT insert_api_call_detail($1::INTEGER, $2::TEXT, $3::TEXT, $4::TEXT, $5::TEXT)',
      [ref, trm1, trm2, trm3, trm4])
  } catch (error) {
    console.error('Error al procesar la API:', error.message)
  }
}
