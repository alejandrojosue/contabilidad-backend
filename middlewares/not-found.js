import { processAPI, processAPIDetails } from '../helpers/api_call.js'

export const notFoundMiddleware = (req, res, next) => {
  const info = req.info?.uid
  let user = 0; let origin = '::1'; let channel = 'W'; let uType = 'USER'
  if (info) {
    user = info.user
    origin = info.origin
    channel = info.channel
    uType = info.uType
  } else {
    user = req.body.user || 0
    origin = req.body.origin || '::1'
    channel = req.body.channel || 'W'
    uType = req.body.uType || 'ADMIN'
  }

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
