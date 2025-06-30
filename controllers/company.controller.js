import { logApiMiddleware } from '../middlewares/log-api-middleware.js'
import { request, response } from 'express'
// import { REST } from '../config/api.js'

export const create = logApiMiddleware(async (req = request, res = response) => {

})

export const update = logApiMiddleware(async (req = request, res = response) => {

})

export const getCompanyByUser = logApiMiddleware(async (req = request, res = response) => {
})
