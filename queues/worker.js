import { Worker } from 'bullmq'
import Redis from 'ioredis'
import * as companyServices from '../services/company.service.js'
import { processAPIDetails } from '../helpers/api_call.js'
import { errorMessages } from '../helpers/error-messages.js'

const redisConnection = new Redis({ host: '127.0.0.1', port: 6379, maxRetriesPerRequest: null })

const serviceMap = {
  ...companyServices
}

const processor = async (job) => {
  const { body, params, query, user, auditRef, serviceFunctionName } = job.data

  const serviceFunction = serviceMap[serviceFunctionName]

  if (!serviceFunction) {
    throw new Error(`Servicio no encontrado: ${serviceFunctionName}`)
  }

  try {
    await serviceFunction({ body, params, query, user })

    await processAPIDetails({
      ref: auditRef,
      trm1: 'RE',
      trm2: '0000',
      trm3: '',
      trm4: `${serviceFunctionName} ejecutado correctamente`
    })
  } catch (error) {
    const errorMessage = await errorMessages({ errorCode: error.code })
    await processAPIDetails({
      ref: auditRef,
      trm1: 'RE',
      trm2: error.status ?? 500,
      trm3: error.code,
      trm4: error.message || errorMessage
    })
    throw error
  }
}

new Worker('batchQueue', processor, { connection: redisConnection })
new Worker('urgentQueue', processor, { connection: redisConnection })
