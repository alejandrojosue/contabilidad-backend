import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de SYSCOM',
      version: '1.0.0',
      description: 'Documentación de SYSCOM'
    },
    servers: [
      {
        url: 'http://localhost:' + process.env.PORT + '/api',
        description: 'Servidor de desarrollo'
      }
      // {
      //   url: 'https://api.syscom.com',
      //   description: 'Servidor de producción'
      // }
    ]
  },
  apis: ['./docs/*/*.yaml'] // Ruta donde buscará los comentarios Swagger
}

const swaggerSpec = swaggerJSDoc(options)

export const setupSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
