import { Router } from 'express'
import { check, body } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: ProductReturns
 *   description: Gestión de devoluciones de productos
 *
 * components:
 *   schemas:
 *     ProductReturnDetail:
 *       type: object
 *       required:
 *         - product_id
 *         - quantity
 *         - unit_price
 *       properties:
 *         product_id:
 *           type: string
 *           description: ID del producto (máx 50 caracteres)
 *         quantity:
 *           type: integer
 *           description: Cantidad devuelta (mayor a 0)
 *         unit_price:
 *           type: number
 *           format: float
 *           description: Precio unitario

 *     ProductReturn:
 *       type: object
 *       required:
 *         - invoice_id
 *         - status
 *         - details
 *       properties:
 *         invoice_id:
 *           type: integer
 *           description: ID de la factura relacionada
 *         total_returned:
 *           type: number
 *           description: Total devuelto (opcional)
 *         reason:
 *           type: string
 *           description: Motivo de la devolución (opcional, máx 255 caracteres)
 *         status:
 *           type: string
 *           enum: [PENDING, COMPLETED, CANCELLED]
 *           description: Estado de la devolución
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductReturnDetail'
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /product-returns:
 *   get:
 *     summary: Obtiene todas las devoluciones de productos
 *     tags: [ProductReturns]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 */
router.get('/', makeController('productReturn.get'))

/**
 * @swagger
 * /product-returns/{id}:
 *   get:
 *     summary: Obtiene una devolución por su ID
 *     tags: [ProductReturns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       404:
 *         description: Devolución no encontrada
 */
router.get('/:id', makeController('productReturn.getById'))

/**
 * @swagger
 * /product-returns:
 *   post:
 *     summary: Crea una nueva devolución de productos con sus detalles
 *     tags: [ProductReturns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductReturn'
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       400:
 *         description: Error de validación
 */
router.post('/', [
  check('invoice_id').notEmpty().isInt(),
  check('total_returned').optional().isFloat({ min: 0 }),
  check('reason').optional().isLength({ max: 255 }),
  check('status').notEmpty().isIn(['PENDING', 'COMPLETED', 'CANCELLED']),

  body('details').isArray({ min: 1 }),
  body('details.*.product_id').notEmpty().isLength({ max: 50 }),
  body('details.*.quantity').notEmpty().isInt({ min: 1 }),
  body('details.*.unit_price').notEmpty().isFloat({ min: 0 }),

  fieldsValidate
], makeController('productReturn.create'))

/**
 * @swagger
 * /product-returns/{id}:
 *   put:
 *     summary: Actualiza los datos de una devolución
 *     tags: [ProductReturns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice_id:
 *                 type: integer
 *               total_returned:
 *                 type: number
 *               reason:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, COMPLETED, CANCELLED]
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Devolución no encontrada
 */
router.put('/:id', [
  check('invoice_id').optional().isInt(),
  check('total_returned').optional().isFloat({ min: 0 }),
  check('reason').optional().isLength({ max: 255 }),
  check('status').optional().isIn(['PENDING', 'COMPLETED', 'CANCELLED']),
  fieldsValidate
], makeController('productReturn.update'))

export default router
