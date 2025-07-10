import { processAPI, processAPIDetails } from '../helpers/api_call.js'
import { errorMessages } from '../helpers/error-messages.js'
export const logApiMiddleware = (handler) => {
  return async (req, res, next) => {
    const info = req.info?.uid
    const user = info?.user || req.body?.user
    const origin = info?.ipAddress || req.body?.ipAddress
    const channel = info?.channel || req.body?.channel
    const uType = info?.uType || req.body?.uType

    // Registrar inicio de la API
    const ref = await processAPI({
      chn: channel,
      origin,
      uri: req.originalUrl,
      useri: user,
      uType,
      act: req.method.toUpperCase()
    })

    res.locals.auditRef = ref.rows[0].insert_api_call

    try {
      // Llamar al controlador real
      const result = await handler(req, res)

      // Cada trama es un Array
      const trama1 = res.locals.trm1 || ['RE']
      const trama2 = res.locals.trm2 || ['0000']
      const trama3 = res.locals.trm3 || ['']
      const trama4 = res.locals.trm4 || ['']
      const errorMessage = await errorMessages({ errorCode: trama2[0] })

      // Registrar éxito en `processAPIDetails`
      let x = 0
      for (x = 0; x < trama1.length; x++) {
        const trm1 = trama1[x]
        const trm2 = trama2[x]
        const trm3 = trama3[x] || ''
        const trm4 = trama4[x] || ''
        await processAPIDetails({
          ref: ref.rows[0].insert_api_call,
          trm1,
          trm2,
          trm3,
          trm4: trm1 === 'RE' ? errorMessage : trm4
        })
      }

      return result
    } catch (error) {
      const errorMessage = error.message ?? await errorMessages({ errorCode: error.code })
      // Registrar error en `processAPIDetails`
      const trm2 = error.status ?? 500
      await processAPIDetails({
        ref: ref.rows[0].insert_api_call,
        trm1: 'RE',
        trm2: 'status: ' + trm2,
        trm3: error.code,
        trm4: errorMessage
      })

      res.status(trm2).json({
        error: {
          msg: trm2 === 500 ? 'Internal Server Error' : error.message ?? errorMessage,
          details: []
        }
      })

      return next(error)
    }
  }
}
