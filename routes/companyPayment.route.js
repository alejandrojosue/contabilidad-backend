import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', makeController('getCompanyPaymentByUser'))

router.post('/', [
  check('rtn', 'El campo rtn es obligatorio')
    .notEmpty().isLength({ min: 14, max: 14 }).withMessage('El campo rtn debe tener exactamente 14 caracteres'),

  check('planId', 'El campo planId es obligatorio')
    .notEmpty().isNumeric().withMessage('El campo planId debe ser un número'),

  check('amountPaid', 'El campo amountPaid es obligatorio')
    .notEmpty().isDecimal().withMessage('El campo amountPaid debe ser un número decimal')

], fieldsValidate, makeController('createCompanyPayment'))

router.put('/:id', [
  check('rtn', 'El campo rtn debe tener exactamente 14 caracteres')
    .optional().isLength({ min: 14, max: 14 }),

  check('planId', 'El campo planId debe ser un número')
    .optional().isNumeric(),

  check('amountPaid', 'El campo amountPaid debe ser un número decimal')
    .optional().isDecimal()
], fieldsValidate, makeController('updateCompanyPayment'))

export default router
