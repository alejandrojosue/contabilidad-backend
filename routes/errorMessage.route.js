import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { get } from '../controllers/errorMessages.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', get)

router.post('/', [
  check('errorCode', 'El campo errorCode es obligatorio')
    .notEmpty().isLength({ min: 1, max: 5 }).withMessage('El campo errorCode debe tener entre 1 y 5 caracteres'),

  check('errorMessage', 'El campo errorMessage es obligatorio')
    .notEmpty().isLength({ min: 3 }).withMessage('El campo errorMessage debe tener al menos 3 caracteres')
], fieldsValidate, makeController('createErrorMessage'))

router.put('/:errorCode', [
  check('errorMessage', 'El campo errorMessage debe tener al menos 3 caracteres')
    .optional().isLength({ min: 3 })
], fieldsValidate, makeController('updateErrorMessage'))

export default router
