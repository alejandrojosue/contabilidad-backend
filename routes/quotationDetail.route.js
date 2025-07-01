import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: QuotationDetails
 *   description: Gestión de detalles de cotizaciones
 *
 * components:
 *   schemas:
 *     QuotationDetail:
 *       type: object
 *       required:
 *         - quotation_number
 *         - product_code
 *         - price
 *         - tax
 *         - discount
 *       properties:
 *         quotation_number:
 *           type: integer
 *           description: Número de cotización relacionado
 *         product_code:
 *           type: string
 *           description: Código del producto (máx 50 caracteres)
 *         price:
 *           type: number
 *           description: Precio unitario
 *         tax:
 *           type: number
 *           description: Impuesto aplicado
 *         discount:
 *           type: number
 *           description: Descuento aplicado
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /quotation-details:
 *   get:
 *     summary: Obtiene todos los detalles de cotizaciones
 *     tags: [QuotationDetails]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 */
router.get('/', makeController('quotationDetail.get'))

/**
 * @swagger
 * /quotation-details/{quotation_number}:
 *   get:
 *     summary: Obtiene los detalles de una cotización por su número
 *     tags: [QuotationDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: quotation_number
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número de cotización
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       404:
 *         description: Cotización no encontrada
 */
router.get('/:quotation_number', makeController('quotationDetail.getByQuotationNumber'))

/**
 * @swagger
 * /quotation-details:
 *   post:
 *     summary: Crea un detalle de cotización
 *     tags: [QuotationDetails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuotationDetail'
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       400:
 *         description: Error de validación
 */
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
], makeController('quotationDetail.create'))

/**
 * @swagger
 * /quotation-details/{quotation_number}/{product_code}:
 *   put:
 *     summary: Actualiza un detalle de cotización
 *     tags: [QuotationDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: quotation_number
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número de cotización
 *       - name: product_code
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: Código del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               tax:
 *                 type: number
 *               discount:
 *                 type: number
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Detalle no encontrado
 */
router.put('/:quotation_number/:product_code', [
  check('price', 'El campo price debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),
  check('tax', 'El campo tax debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),
  check('discount', 'El campo discount debe ser un número mayor o igual a 0')
    .optional().isFloat({ min: 0 }),
  fieldsValidate
], makeController('quotationDetail.update'))

export default router
