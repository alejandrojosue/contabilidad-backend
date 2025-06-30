import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', makeController('getProductReturnDetails'))

router.get('/:id', makeController('getProductReturnDetailById'))

router.post('/', [
  check('return_id', 'El campo return_id es obligatorio y debe ser un número')
    .notEmpty().isInt(),
  check('product_id', 'El campo product_id es obligatorio')
    .notEmpty().isLength({ max: 50 }),
  check('quantity', 'El campo quantity es obligatorio y debe ser un número entero')
    .notEmpty().isInt({ min: 1 }),
  check('unit_price', 'El campo unit_price es obligatorio y debe ser un número')
    .notEmpty().isFloat({ min: 0 }),
  fieldsValidate
], makeController('createProductReturnDetail'))

router.put('/:id', [
  check('return_id', 'El campo return_id debe ser un número')
    .optional().isInt(),
  check('product_id', 'El campo product_id debe tener máximo 50 caracteres')
    .optional().isLength({ max: 50 }),
  check('quantity', 'El campo quantity debe ser un número entero')
    .optional().isInt({ min: 1 }),
  check('unit_price', 'El campo unit_price debe ser un número')
    .optional().isFloat({ min: 0 }),
  fieldsValidate
], makeController('updateProductReturnDetail'))

export default router
