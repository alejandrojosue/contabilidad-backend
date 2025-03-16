import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { CORS_OPTIONS } from '../config/cors.js'
import userRoutes from '../routes/user.js'
import auditingRoutes from '../routes/auditing.js'
import authRoutes from '../routes/auth.js'
import { corsErrorMiddleware } from '../middlewares/error-cors.js'
import { validateDBConnection } from '../middlewares/validate-db-connection.js'
import { notFoundMiddleware } from '../middlewares/not-found.js'

export default class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      companies: '/api/companies',
      auditing: '/api/auditing'
    }

    this.middlewares()

    this.routes()

    // Middleware para rutas no encontradas (404)
    this.app.use(notFoundMiddleware)
  }

  middlewares () {
    this.app.use(helmet())

    this.app.use(morgan('[:date[clf]] :response-time ms :remote-addr :method :url :status'))

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio público
    this.app.use(express.static('public'))

    // DNS allowed
    this.app.use(cors(CORS_OPTIONS))
    this.app.use(corsErrorMiddleware)

    // Middleware para verificar la conexión a la base de datos
    this.app.use(validateDBConnection)
  }

  routes () {
    this.app.use(this.paths.users, userRoutes)
    this.app.use(this.paths.auth, authRoutes)
    this.app.use(this.paths.auditing, auditingRoutes)
  }

  listen () {
    console.clear()
    this.app.listen(this.port, () => {
      console.log('servidor corriendo en puerto', this.port)
    })
  }
}
