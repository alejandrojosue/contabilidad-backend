import { Router } from 'express'
import { fieldsValidate } from '../middlewares/fields-validate.js'
import {
  get
} from '../controllers/auditing.js'
import { check } from 'express-validator'

const router = Router()

router.get('/', [
  check('limit', 'El límite debe ser un número').isNumeric(),
  check('from', 'El límite debe ser un número').isNumeric(),
  check('user', 'El usuario es obligatorio').not().isEmpty(),
  check('origin', 'El origen es obligatorio').not().isEmpty(),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de usuario debe ser W o M'),
  check('uType', 'El tipo de usuario es obligatorio').not().isEmpty().isIn(['ADMIN', 'USER']).withMessage('El tipo de usuario debe ser ADMIN o USER'),
  fieldsValidate
], get)
export default router
