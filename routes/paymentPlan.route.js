import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', makeController('getPaymentPlans'))
router.get('/:id', makeController('getPaymentPlanById'))

router.post('/', [
  check('name', 'El campo name es obligatorio')
    .notEmpty().isLength({ min: 3, max: 255 }).withMessage('El campo name debe tener entre 3 y 255 caracteres'),

  check('price', 'El campo price es obligatorio y debe ser un número mayor o igual a 0')
    .notEmpty().isFloat({ min: 0 }),

  check('includedItems', 'El campo includedItems debe ser un arreglo de textos')
    .optional().isArray()
], fieldsValidate, makeController('createPaymentPlan'))

router.put('/:id', [
  check('name', 'El campo name debe tener entre 3 y 255 caracteres')
    .optional().isLength({ min: 3, max: 255 }),

  check('price', 'El campo price debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),

  check('includedItems', 'El campo includedItems debe ser un arreglo de textos')
    .optional().isArray()
], fieldsValidate, makeController('updatePaymentPlan'))

export default router
