import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', makeController('getProductReturns'))

router.get('/:id', makeController('getProductReturnById'))

router.post('/', [
  check('invoice_id', 'El campo invoice_id es obligatorio y debe ser un número')
    .notEmpty().isInt(),
  check('total_returned', 'El campo total_returned debe ser un número')
    .optional().isFloat({ min: 0 }),
  check('reason', 'El campo reason debe tener máximo 255 caracteres')
    .optional().isLength({ max: 255 }),
  check('status', 'El campo status es obligatorio y debe ser PENDING, COMPLETED o CANCELLED')
    .notEmpty().isIn(['PENDING', 'COMPLETED', 'CANCELLED']),
  fieldsValidate
], makeController('createProductReturn'))

router.put('/:id', [
  check('invoice_id', 'El campo invoice_id debe ser un número')
    .optional().isInt(),
  check('total_returned', 'El campo total_returned debe ser un número')
    .optional().isFloat({ min: 0 }),
  check('reason', 'El campo reason debe tener máximo 255 caracteres')
    .optional().isLength({ max: 255 }),
  check('status', 'El campo status debe ser PENDING, COMPLETED o CANCELLED')
    .optional().isIn(['PENDING', 'COMPLETED', 'CANCELLED']),
  fieldsValidate
], makeController('updateProductReturn'))

export default router
