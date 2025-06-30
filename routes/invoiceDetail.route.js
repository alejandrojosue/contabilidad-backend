import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', makeController('getInvoiceDetails'))
router.get('/:invoiceId', makeController('getInvoiceDetailByInvoiceId'))

router.post('/', [
  check('invoiceId', 'El campo invoiceId es obligatorio')
    .notEmpty().isInt({ min: 1 }).withMessage('El campo invoiceId debe ser un número entero positivo'),

  check('productCode', 'El campo productCode es obligatorio')
    .notEmpty().isLength({ min: 1, max: 255 }).withMessage('El campo productCode debe tener entre 1 y 255 caracteres'),

  check('quantity', 'El campo quantity es obligatorio')
    .notEmpty().isInt({ min: 1 }).withMessage('El campo quantity debe ser un número entero positivo'),

  check('unitPrice', 'El campo unitPrice es obligatorio')
    .notEmpty().isFloat({ min: 0 }).withMessage('El campo unitPrice debe ser un número mayor o igual a 0'),

  check('totalPrice', 'El campo totalPrice es obligatorio')
    .notEmpty().isFloat({ min: 0 }).withMessage('El campo totalPrice debe ser un número mayor o igual a 0'),

  check('discount', 'El campo discount debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 })
], fieldsValidate, makeController('createInvoiceDetail'))

router.put('/:id', [
  check('quantity', 'El campo quantity debe ser un número entero positivo')
    .optional().isInt({ min: 1 }),

  check('unitPrice', 'El campo unitPrice debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),

  check('totalPrice', 'El campo totalPrice debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),

  check('discount', 'El campo discount debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 })
], fieldsValidate, makeController('updateInvoiceDetail'))

export default router
