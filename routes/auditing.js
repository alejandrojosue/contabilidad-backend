import { Router } from 'express'
import {
  get
} from '../controllers/auditing.js'

const router = Router()

router.get('/', get)
export default router
