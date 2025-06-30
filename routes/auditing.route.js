import { Router } from 'express'
// import { fieldsValidate } from '../middlewares/fields-validate.js'
import {
  get
} from '../controllers/auditing.js'
// import { check } from 'express-validator'

const router = Router()

router.get('/', get)

export default router
