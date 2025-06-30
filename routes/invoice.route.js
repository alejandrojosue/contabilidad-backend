import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', makeController('getInvoices'))

router.post('/', [
  check('invoiceNumber', 'El campo invoiceNumber es obligatorio')
    .notEmpty().isLength({ min: 1, max: 50 }).withMessage('El campo invoiceNumber debe tener entre 1 y 50 caracteres'),

  check('customerId', 'El campo customerId debe ser un número entero positivo')
    .optional().isInt({ min: 1 }),

  check('discount', 'El campo discount debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),

  check('taxAmount', 'El campo taxAmount debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),

  check('status', 'El campo status es obligatorio')
    .notEmpty().isIn(['PENDING', 'PAID', 'CANCELLED']).withMessage('El campo status debe ser PENDING, PAID o CANCELLED'),

  check('dueDate', 'El campo dueDate debe ser una fecha válida')
    .optional().isISO8601(),

  check('totalAmount', 'El campo totalAmount debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),

  check('branchId', 'El campo branchId es obligatorio')
    .notEmpty().isInt({ min: 1 }).withMessage('El campo branchId debe ser un número entero positivo')
], fieldsValidate, makeController('createInvoice'))

router.put('/:id', [
  check('invoiceNumber', 'El campo invoiceNumber debe tener entre 1 y 50 caracteres')
    .optional().isLength({ min: 1, max: 50 }),

  check('customerId', 'El campo customerId debe ser un número entero positivo')
    .optional().isInt({ min: 1 }),

  check('discount', 'El campo discount debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),

  check('taxAmount', 'El campo taxAmount debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),

  check('status', 'El campo status debe ser PENDING, PAID o CANCELLED')
    .optional().isIn(['PENDING', 'PAID', 'CANCELLED']),

  check('dueDate', 'El campo dueDate debe ser una fecha válida')
    .optional().isISO8601(),

  check('totalAmount', 'El campo totalAmount debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),

  check('branchId', 'El campo branchId debe ser un número entero positivo')
    .optional().isInt({ min: 1 })
], fieldsValidate, makeController('updateInvoice'))

export default router
