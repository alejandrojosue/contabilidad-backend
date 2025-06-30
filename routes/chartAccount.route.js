import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', makeController('getChartAccounts'))

router.post('/', [
  check('code', 'El campo code es obligatorio')
    .notEmpty().isLength({ min: 3, max: 20 }).withMessage('El campo code debe tener entre 3 y 20 caracteres')
    .isIn(['ACT', 'PAS', 'PAT', 'ING', 'EGS']).withMessage('El campo code debe ser uno de los siguientes: ACT, PAS, PAT, ING, EGS'),
  check('description', 'El campo description es obligatorio').notEmpty().isLength({ min: 3, max: 50 }).withMessage('El campo description debe tener entre 3 y 50 caracteres'),
  check('type', 'El campo type es obligatorio').notEmpty().isLength({ min: 3, max: 3 }).withMessage('El campo type debe tener 3 caracteres')
], fieldsValidate, makeController('createChartAccount'))

router.put('/:id', [
  check('code', 'El campo code debe tener entre 3 y 20 caracteres')
    .isLength({ min: 3, max: 20 })
    .isIn(['ACT', 'PAS', 'PAT', 'ING', 'EGS']).withMessage('El campo code debe ser uno de los siguientes: ACT, PAS, PAT, ING, EGS'),
  check('description', 'El campo description debe tener entre 3 y 50 caracteres').isLength({ min: 3, max: 50 }),
  check('type', 'El campo type debe tener 3 caracteres').isLength({ min: 3, max: 3 })
], fieldsValidate, makeController('updateChartAccount'))

export default router
