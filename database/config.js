import pkg from 'pg'
import DATABASE from '../config/db.js'
const { Pool } = pkg
// Crear la conexión a la base de datos
const pool = new Pool({
  host: DATABASE.host,
  port: DATABASE.port,
  user: DATABASE.user,
  password: DATABASE.password,
  database: DATABASE.database,
  schema: DATABASE.schema // Aunque 'schema' no es una propiedad estándar en la conexión de pg, se puede usar en consultas
})

const connectDB = async () => {
  try {
    return await pool.connect()
  } catch (err) {
    console.error('Error en la conexión a la base de datos')
    // process.exit(1)
  }
}

export { pool, connectDB }
