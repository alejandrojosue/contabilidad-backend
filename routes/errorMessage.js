import { Router } from 'express'
import { get } from '../controllers/errrorMessages.js'

const router = Router()

router.get('/', get)

export default router
