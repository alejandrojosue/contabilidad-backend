import { Router } from 'express'
import { fieldsValidate } from '../middlewares/fields-validate.js'
import {
  post
} from '../controllers/auditing.js'
import { check } from 'express-validator'

const router = Router()

router.post('/', [
  check('user', 'El usuario es obligatorio').not().isEmpty(),
  check('origin', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  check('uType', 'El tipo de usuario es obligatorio').not().isEmpty().isIn(['ADMIN', 'USER']).withMessage('El tipo de usuario debe ser ADMIN o USER'),
  fieldsValidate
], post)

export default router
