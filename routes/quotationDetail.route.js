import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

// Obtener todos los detalles de cotizaciones
router.get('/', makeController('getQuotationDetails'))

// Obtener detalles de cotización por número
router.get('/:quotation_number', makeController('getQuotationDetailByNumber'))

// Crear un detalle de cotización
router.post('/', [
  check('quotation_number', 'El campo quotation_number es obligatorio y debe ser un número')
    .notEmpty().isNumeric(),
  check('product_code', 'El campo product_code es obligatorio')
    .notEmpty().isLength({ max: 50 }),
  check('price', 'El campo price es obligatorio y debe ser un número mayor o igual a 0')
    .notEmpty().isFloat({ min: 0 }),
  check('tax', 'El campo tax es obligatorio y debe ser un número mayor o igual a 0')
    .notEmpty().isFloat({ min: 0 }),
  check('discount', 'El campo discount es obligatorio y debe ser un número mayor o igual a 0')
    .notEmpty().isFloat({ min: 0 }),
  fieldsValidate
], makeController('createQuotationDetail'))

// Actualizar un detalle de cotización
router.put('/:quotation_number/:product_code', [
  check('price', 'El campo price debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),
  check('tax', 'El campo tax debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),
  check('discount', 'El campo discount debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),
  fieldsValidate
], makeController('updateQuotationDetail'))

export default router
