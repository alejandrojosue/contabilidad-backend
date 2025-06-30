import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', makeController('getInvoiceConfigurations'))

router.get('/:companyId', makeController('getInvoiceConfigurationByCompanyId'))

router.post('/', [
  check('companyId', 'El campo companyId es obligatorio')
    .notEmpty().isLength({ min: 14, max: 14 }).withMessage('El campo companyId debe tener exactamente 14 caracteres'),

  check('startRange', 'El campo startRange es obligatorio')
    .notEmpty().isInt({ min: 1 }).withMessage('El campo startRange debe ser un número entero positivo'),

  check('endRange', 'El campo endRange es obligatorio')
    .notEmpty().isInt({ min: 1 }).withMessage('El campo endRange debe ser un número entero positivo'),

  check('cai', 'El campo cai es obligatorio')
    .notEmpty().isLength({ min: 3, max: 50 }).withMessage('El campo cai debe tener entre 3 y 50 caracteres'),

  check('invoiceType', 'El campo invoiceType es obligatorio')
    .notEmpty().isIn(['1', '2', '3']).withMessage('El campo invoiceType debe ser 1, 2 o 3')
], fieldsValidate, makeController('createInvoiceConfiguration'))

router.put('/:companyId', [
  check('startRange', 'El campo startRange debe ser un número entero positivo')
    .optional().isInt({ min: 1 }),

  check('endRange', 'El campo endRange debe ser un número entero positivo')
    .optional().isInt({ min: 1 }),

  check('cai', 'El campo cai debe tener entre 3 y 50 caracteres')
    .optional().isLength({ min: 3, max: 50 }),

  check('invoiceType', 'El campo invoiceType debe ser 1, 2 o 3')
    .optional().isIn(['1', '2', '3'])
], fieldsValidate, makeController('updateInvoiceConfiguration'))

export default router
