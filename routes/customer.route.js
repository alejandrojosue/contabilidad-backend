import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { getCustomerByUser } from '../controllers/customers.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', getCustomerByUser)

router.post('/', [
  check('company', 'El campo company es obligatorio').notEmpty().isLength({ min: 14, max: 14 }).withMessage('El campo company debe tener 14 caracteres'),
  check('name').notEmpty().withMessage('El campo name es obligatorio').isLength({ min: 3, max: 50 }).withMessage('El campo name debe tener entre 3 y 50 caracteres'),
  check('email').isEmail().withMessage('El campo email debe ser un correo electrónico válido'),
  check('phone').isLength({ min: 8, max: 8 }).withMessage('El campo phone debe tener 8 caracteres'),
  check('address').isLength({ min: 5, max: 200 }).withMessage('El campo address debe tener entre 5 y 200 caracteres'),
  fieldsValidate
], makeController('createCustomer'))

router.put('/:id', [
  check('company', 'El campo company debe tener 14 caracteres').isLength({ min: 14, max: 14 }).withMessage(''),
  check('name').isLength({ min: 3, max: 50 }).withMessage('El campo name debe tener entre 3 y 50 caracteres'),
  check('email').isEmail().withMessage('El campo email debe ser un correo electrónico válido'),
  check('phone').isLength({ min: 8, max: 8 }).withMessage('El campo phone debe tener 8 caracteres'),
  check('address').isLength({ min: 5, max: 200 }).withMessage('El campo address debe tener entre 5 y 200 caracteres'),
  check('isActive', 'El campo isActive debe ser un valor booleano').isBoolean(),
  fieldsValidate
], makeController('updateCustomer'))

export default router
