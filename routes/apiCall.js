import { Router } from 'express'
import { get } from '../controllers/apiCalls.js'

const router = Router()

router.get('/', get)

export default router
