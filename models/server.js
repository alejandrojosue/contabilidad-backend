import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import xss from 'xss-clean'
import { CORS_OPTIONS } from '../config/cors.js'

import {
  apiCallsRoutes,
  auditingRoutes,
  authRoutes,
  companyRoutes,
  customerRoutes,
  errorMessagesRoutes,
  jobRoutes,
  userRoutes,
  paymentPlanRoutes
} from '../routes/routes.js'

import {
  corsErrorMiddleware, validateDBConnection,
  notFoundMiddleware, verifyToken, checkPermissions
} from '../middlewares/index.js'
import { setupSwagger } from '../docs/swagger.js'

export default class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auditing: '/api/auditing',
      auth: '/api/auth',
      companies: '/api/companies',
      customers: '/api/customers',
      users: '/api/users',
      paymentPlans: '/api/payment-plans'
    }

    // Configuración de Swagger
    setupSwagger(this.app)

    this.middlewares()

    this.routes()

    // Middleware para rutas no encontradas (404)
    this.app.use(notFoundMiddleware)
  }

  middlewares () {
    // Seguridad y protección de cabeceras
    this.app.use(helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'"],
          'script-src': ["'self'"],
          'style-src': ["'self'", "'unsafe-inline'"],
          'img-src': ["'self'", 'data:'],
          'connect-src': ["'self'"],
          'font-src': ["'self'"]
        }
      }
    }))

    this.app.use(morgan('[:date[clf]] :response-time ms :remote-addr :method :url :status'))

    // Lectura y parseo del body
    this.app.use(express.json())
    this.app.use(xss())

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
    this.app.use(this.paths.companies, verifyToken, checkPermissions, companyRoutes)
    this.app.use(this.paths.customers, verifyToken, checkPermissions, customerRoutes)
    this.app.use('/api/error-messages', errorMessagesRoutes)
    this.app.use('/api/job', jobRoutes)
    this.app.use(this.paths.users, verifyToken, checkPermissions, userRoutes)
    this.app.use(this.paths.paymentPlans, paymentPlanRoutes)
  }

  listen () {
    console.clear()
    this.app.listen(this.port, () => {
      console.log('servidor corriendo en puerto', this.port)
      console.log('http://localhost:' + this.port)
    })
  }
}
