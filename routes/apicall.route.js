import { Router } from 'express'
import { get } from '../controllers/apiCalls.controller.js'

const router = Router()

router.get('/', get)

export default router
