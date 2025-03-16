import { processAPI, processAPIDetails } from '../helpers/api_call.js'

export const notFoundMiddleware = (req, res, next) => {
  const { user = 0, origin = '::1', channel = 'W', uType = 'USER' } = req.body
  processAPI({
    chn: channel,
    origin,
    uri: req.originalUrl,
    useri: user,
    uType,
    act: req.method.toUpperCase()
  }).then(ref => {
    processAPIDetails({ ref: ref.rows[0].insert_api_call, trm1: 'RE', trm2: 'status: 404', trm3: '404', trm4: 'Servicio no encontrado.' })
      .then(() => res)
      .catch(() => res)
  })
    .catch(ref => ref)
  res.status(404).json({
    error: {
      msg: 'Servicio no encontrado.',
      details: []
    }
  })
}
