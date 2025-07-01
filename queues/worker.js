import { resolveServiceFunction } from './resolver.js'
import { processAPIDetails } from '../helpers/api_call.js'
import { errorMessages } from '../helpers/error-messages.js'

export const processJob = async (job) => {
  const { body, params, query, user, auditRef, serviceFunctionName } = job.data
  try {
    const serviceFunction = resolveServiceFunction(serviceFunctionName)
    const response = await serviceFunction({ body, params, query, user })
    const message = await errorMessages({ errorCode: '0000' })
    await processAPIDetails({
      ref: auditRef,
      trm1: 'RE',
      trm2: '0000',
      trm3: '',
      trm4: message
    })
    await processAPIDetails({
      ref: auditRef,
      trm1: 'DA',
      trm2: '',
      trm3: '',
      trm4: Object.values(response).join('|')
    })
  } catch (error) {
    const errorMessage = error.message ?? await errorMessages({ errorCode: error.code })
    await processAPIDetails({
      ref: auditRef,
      trm1: 'RE',
      trm2: 'status: ' + error.status ?? 500,
      trm3: error.code,
      trm4: errorMessage
    })
    throw error
  }
}
