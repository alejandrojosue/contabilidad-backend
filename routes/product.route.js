import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

router.get('/', makeController('getProducts'))

router.get('/:code', makeController('getProductByCode'))

router.post('/', [
  check('code', 'El código es obligatorio y debe tener máximo 50 caracteres')
    .notEmpty().isLength({ max: 50 }),
  check('name', 'El nombre es obligatorio y debe tener máximo 255 caracteres')
    .notEmpty().isLength({ max: 255 }),
  check('description', 'La descripción es obligatoria')
    .notEmpty(),
  check('purchase_price', 'El precio de compra es obligatorio y debe ser un número mayor o igual a 0')
    .notEmpty().isFloat({ min: 0 }),
  check('price', 'El precio es obligatorio y debe ser un número mayor o igual a 0')
    .notEmpty().isFloat({ min: 0 }),
  check('tax', 'El impuesto debe ser un número entre 0 y 100')
    .optional().isFloat({ min: 0, max: 100 }),
  check('stock', 'El stock debe ser un número entero mayor o igual a 0')
    .optional().isInt({ min: 0 }),
  check('is_active', 'El campo is_active debe ser booleano')
    .optional().isBoolean(),
  check('images', 'El campo images debe ser un arreglo de textos')
    .optional().isArray(),
  fieldsValidate
], makeController('createProduct'))

router.put('/:code', [
  check('name', 'El nombre debe tener máximo 255 caracteres')
    .optional().isLength({ max: 255 }),
  check('description', 'La descripción debe ser un texto')
    .optional(),
  check('purchase_price', 'El precio de compra debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),
  check('price', 'El precio debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),
  check('tax', 'El impuesto debe ser un número entre 0 y 100')
    .optional().isFloat({ min: 0, max: 100 }),
  check('stock', 'El stock debe ser un número entero mayor o igual a 0')
    .optional().isInt({ min: 0 }),
  check('is_active', 'El campo is_active debe ser booleano')
    .optional().isBoolean(),
  check('images', 'El campo images debe ser un arreglo de textos')
    .optional().isArray(),
  fieldsValidate
], makeController('updateProduct'))

export default router
