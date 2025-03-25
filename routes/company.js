import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { create, getCompanyByUser, update } from '../controllers/companies.js'

const router = Router()

router.get('/', getCompanyByUser)
router.get('/companies-all', () => {})

router.post('/', [
  check('rtn', 'El RTN es obligatorio').not().isEmpty().isLength({ min: 14, max: 14 }).withMessage('El RTN debe tener una longitud de 14 caracteres'),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El correo no es válido').optional().isEmail(),
  check('phones', 'El campo teléfonos debe estar en formato Array').optional().not().isArray(),
  check('planId', 'El plan es obligatorio').not().isEmpty().isNumeric().withMessage('El plan debe ser un número'),
  fieldsValidate
], create)

router.put('/:rtn', [
  check('name', 'El nombre no es válido').optional().not().isEmpty(),
  check('email', 'El correo no es válido').optional().isEmail(),
  check('phones', 'El campo teléfonos debe estar en formato Array').optional().isArray(),
  check('planId', 'El plan es obligatorio').optional().not().isEmpty().isNumeric().withMessage('El plan debe ser un número'),
  fieldsValidate
], update)

export default router
