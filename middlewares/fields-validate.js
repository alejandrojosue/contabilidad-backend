import { validationResult } from 'express-validator'
import { processAPIDetails, processAPI } from '../helpers/api_call.js'

export const fieldsValidate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const { user, origin, channel, uType } = req.body
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

    return res.status(400).json(errors)
  }
  next()
}
