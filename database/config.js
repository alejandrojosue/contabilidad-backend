import pkg from 'pg'
import DATABASE from '../config/db.js'
const { Pool } = pkg

const pool = new Pool({
  host: DATABASE.host,
  port: DATABASE.port,
  user: DATABASE.user,
  password: DATABASE.password,
  database: DATABASE.database,
  allowExitOnIdle: true // Cierra conexiones inactivas
})

pool.on('error', () => {
  // console.error('Error en la conexión a la base de datos')
})

// Función para verificar si la base de datos está accesible
const checkConnection = async () => {
  try {
    await pool.query('SELECT 1')
    return true
  } catch (error) {
    return false
  }
}

export { pool, checkConnection }
