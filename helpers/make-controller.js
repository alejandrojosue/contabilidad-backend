import { controller } from '../controllers/index.controller.js'

export const makeController = (serviceFunctionName) => {
  return (req, res, next) => {
    req.serviceFunctionName = serviceFunctionName
    return controller(req, res, next)
  }
}
