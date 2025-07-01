import { serviceRegistry } from '../services/index.service.js'

export const resolveServiceFunction = (serviceFunctionName) => {
  const [entity, functionName] = serviceFunctionName.split('.')

  if (!entity || !functionName) {
    // eslint-disable-next-line
    throw { status: 500, code: 500, message: `Formato inválido para serviceFunctionName: ${serviceFunctionName}` }
  }

  const service = serviceRegistry[entity]
  if (!service) {
    // eslint-disable-next-line
    throw { status: 404, code: 404, message: `Servicio no encontrado: ${entity}` }
  }

  const serviceFunction = service[functionName]
  if (!serviceFunction) {
    // eslint-disable-next-line
    throw { status: 404, code: 404, message: `Función ${functionName} no encontrada en ${entity}` }
  }

  return serviceFunction
}
