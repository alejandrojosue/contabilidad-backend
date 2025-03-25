import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { CORS_OPTIONS } from '../config/cors.js'
import userRoutes from '../routes/user.js'
import auditingRoutes from '../routes/auditing.js'
import authRoutes from '../routes/auth.js'
import customerRoutes from '../routes/customer.js'
import companiesRotes from '../routes/company.js'
import apiCallsRoutes from '../routes/apiCall.js'
import errorMesseagesRoutes from '../routes/errorMessage.js'

import {
  corsErrorMiddleware, validateDBConnection,
  notFoundMiddleware, verifyToken, checkPermissions
} from '../middlewares/index.js'

export default class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auditing: '/api/auditing',
      auth: '/api/auth',
      companies: '/api/companies',
      customers: '/api/customers',
      users: '/api/users'
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
    this.app.use(this.paths.auditing, verifyToken, checkPermissions, auditingRoutes)
    this.app.use('/api/api-calls', apiCallsRoutes)
    this.app.use(this.paths.auth, authRoutes)
    this.app.use(this.paths.companies, verifyToken, checkPermissions, companiesRotes)
    this.app.use(this.paths.customers, verifyToken, checkPermissions, customerRoutes)
    this.app.use('/api/error-messages', errorMesseagesRoutes)
    this.app.use(this.paths.users, verifyToken, checkPermissions, userRoutes)
  }

  listen () {
    console.clear()
    this.app.listen(this.port, () => {
      console.log('servidor corriendo en puerto', this.port)
    })
  }
}
