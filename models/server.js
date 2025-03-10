import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { CORS_OPTIONS } from '../config/cors.js'
import userRoutes from '../routes/user.js'
import auditingRoutes from '../routes/auditing.js'
import { connectDB } from '../database/config.js'
import { corsErrorMiddleware } from '../middlewares/error-cors.js'

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

    this.database()
  }

  middlewares () {
    // Helmet
    this.app.use(helmet())

    // Morgan
    this.app.use(morgan('[:date[clf]] :response-time ms :remote-addr :method :url :status'))

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio público
    this.app.use(express.static('public'))

    // DNS allowed
    this.app.use(cors(CORS_OPTIONS))
    this.app.use(corsErrorMiddleware)
  }

  routes () {
    this.app.use(this.paths.users, userRoutes)
    this.app.use(this.paths.auditing, auditingRoutes)
  }

  async database () {
    return await connectDB()
  }

  listen () {
    console.clear()
    this.app.listen(this.port, () => {
      console.log('servidor corriendo en puerto', this.port)
    })
  }
}
