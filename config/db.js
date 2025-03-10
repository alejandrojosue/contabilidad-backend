const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_SCHEMA
} = process.env

const DATABASE = {
  host: DB_HOST || 'localhost',
  user: DB_USER || 'root',
  password: DB_PASSWORD || '',
  database: DB_NAME || 'db_dev',
  port: DB_PORT || 5432,
  schema: DB_SCHEMA || 'public'
}

export default DATABASE
