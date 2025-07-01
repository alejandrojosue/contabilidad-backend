import { Router } from 'express'
import { check, body } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Gestión de facturas con sus detalles
 *
 * components:
 *   schemas:
 *     InvoiceDetail:
 *       type: object
 *       required:
 *         - productCode
 *         - quantity
 *         - unitPrice
 *         - totalPrice
 *       properties:
 *         productCode:
 *           type: string
 *           description: Código del producto
 *         quantity:
 *           type: integer
 *           description: Cantidad del producto
 *         unitPrice:
 *           type: number
 *           format: float
 *           description: Precio unitario
 *         totalPrice:
 *           type: number
 *           format: float
 *           description: Precio total
 *         discount:
 *           type: number
 *           format: float
 *           description: Descuento aplicado al detalle
 *     Invoice:
 *       type: object
 *       required:
 *         - invoiceNumber
 *         - status
 *         - branchId
 *         - details
 *       properties:
 *         invoiceNumber:
 *           type: string
 *           description: Número de factura
 *         customerId:
 *           type: integer
 *           description: ID del cliente
 *         discount:
 *           type: number
 *         taxAmount:
 *           type: number
 *         status:
 *           type: string
 *           enum: [PENDING, PAID, CANCELLED]
 *         dueDate:
 *           type: string
 *           format: date
 *         totalAmount:
 *           type: number
 *         branchId:
 *           type: integer
 *           description: ID de la sucursal
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InvoiceDetail'
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Obtiene todas las facturas del usuario
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Facturas obtenidas exitosamente
 */
router.get('/', makeController('invoices.get'))

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Obtiene una factura específica por ID
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la factura
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       202:
 *         description: Factura obtenida exitosamente
 *       404:
 *         description: Factura no encontrada
 */
router.get('/:id', makeController('invoices.getById'))

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Crea una nueva factura con sus detalles
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       202:
 *         description: Factura creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', [
  check('invoiceNumber', 'El campo invoiceNumber es obligatorio')
    .notEmpty().isLength({ min: 1, max: 50 }),

  check('customerId').optional().isInt({ min: 1 }),
  check('discount').optional().isFloat({ min: 0 }),
  check('taxAmount').optional().isFloat({ min: 0 }),

  check('status', 'El campo status es obligatorio')
    .notEmpty().isIn(['PENDING', 'PAID', 'CANCELLED']),

  check('dueDate').optional().isISO8601(),
  check('totalAmount').optional().isFloat({ min: 0 }),

  check('branchId', 'El campo branchId es obligatorio')
    .notEmpty().isInt({ min: 1 }),

  body('details').isArray({ min: 1 }).withMessage('Debes enviar al menos un detalle'),
  body('details.*.productCode').notEmpty().isLength({ min: 1, max: 255 }),
  body('details.*.quantity').notEmpty().isInt({ min: 1 }),
  body('details.*.unitPrice').notEmpty().isFloat({ min: 0 }),
  body('details.*.totalPrice').notEmpty().isFloat({ min: 0 }),
  body('details.*.discount').optional().isFloat({ min: 0 }),

  fieldsValidate
], makeController('invoices.create'))

export default router
