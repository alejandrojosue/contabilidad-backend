import { validationResult } from 'express-validator'
import { processAPIDetails, processAPI } from '../helpers/api_call.js'
import { request, response } from 'express'
export const fieldsValidate = (req = request, res = response, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const info = req.info?.uid
    let user, origin, channel, uType
    if (info) {
      user = info.user
      origin = info.origin
      channel = info.channel
      uType = info.uType
    } else {
      const body = req.body
      user = body.user
      origin = body.origin
      channel = body.channel
      uType = body.uType
    }
    processAPI({
      chn: channel,
      origin,
      uri: req.originalUrl,
      useri: user,
      uType,
      act: req.method.toUpperCase()
    }).then(ref => {
      processAPIDetails({ ref: ref.rows[0].insert_api_call, trm1: 'RE', trm2: 'status: 400', trm3: '400', trm4: JSON.stringify(errors) })
        .then(() => res)
        .catch(() => res)
    })
      .catch(ref => ref)

    return res.status(400).json({
      error: {
        msg: 'Datos no válidos.',
        details: errors.array()
      }
    })
  }
  next()
}
