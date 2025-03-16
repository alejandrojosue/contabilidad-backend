import pkg from 'pg'
import DATABASE from '../config/db.js'
const { Pool } = pkg

let isConnected = false

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
    const client = await pool.connect()
    client.on('error', () => {
      console.error('Error en la conexión a la base de datos')
      isConnected = false
    })
    isConnected = true
    return client
  } catch (err) {
    // console.error('Error en la conexión a la base de datos')
    isConnected = false
    // process.exit(1)
  }
}

const getConnectionStatus = () => isConnected

export { pool, connectDB, getConnectionStatus }
