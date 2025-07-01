import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: InvoiceConfigurations
 *   description: Configuración de rangos y CAI de facturación
 *
 * components:
 *   schemas:
 *     InvoiceConfiguration:
 *       type: object
 *       required:
 *         - companyId
 *         - startRange
 *         - endRange
 *         - cai
 *         - invoiceType
 *       properties:
 *         companyId:
 *           type: string
 *           description: RTN de la empresa (14 caracteres)
 *         startRange:
 *           type: integer
 *           description: Rango inicial de facturación
 *         endRange:
 *           type: integer
 *           description: Rango final de facturación
 *         cai:
 *           type: string
 *           description: Código CAI asignado
 *         invoiceType:
 *           type: string
 *           enum: ['1', '2', '3']
 *           description: Tipo de factura
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /invoice-configurations:
 *   get:
 *     summary: Obtiene todas las configuraciones de facturación
 *     tags: [InvoiceConfigurations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 */
router.get('/', makeController('getInvoiceConfigurations'))

/**
 * @swagger
 * /invoice-configurations/{companyId}:
 *   get:
 *     summary: Obtiene la configuración de facturación de una empresa
 *     tags: [InvoiceConfigurations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: companyId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: RTN de la empresa (14 caracteres)
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       404:
 *         description: Configuración no encontrada
 */
router.get('/:companyId', makeController('getInvoiceConfigurationByCompanyId'))

/**
 * @swagger
 * /invoice-configurations:
 *   post:
 *     summary: Crea una nueva configuración de facturación
 *     tags: [InvoiceConfigurations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceConfiguration'
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       400:
 *         description: Error de validación
 */
router.post('/', [
  check('companyId', 'El campo companyId es obligatorio')
    .notEmpty().isLength({ min: 14, max: 14 }),

  check('startRange', 'El campo startRange es obligatorio')
    .notEmpty().isInt({ min: 1 }),

  check('endRange', 'El campo endRange es obligatorio')
    .notEmpty().isInt({ min: 1 }),

  check('cai', 'El campo cai es obligatorio')
    .notEmpty().isLength({ min: 3, max: 50 }),

  check('invoiceType', 'El campo invoiceType es obligatorio')
    .notEmpty().isIn(['1', '2', '3']),

  fieldsValidate
], makeController('createInvoiceConfiguration'))

/**
 * @swagger
 * /invoice-configurations/{companyId}:
 *   put:
 *     summary: Actualiza la configuración de facturación de una empresa
 *     tags: [InvoiceConfigurations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: companyId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: RTN de la empresa (14 caracteres)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startRange:
 *                 type: integer
 *               endRange:
 *                 type: integer
 *               cai:
 *                 type: string
 *               invoiceType:
 *                 type: string
 *                 enum: ['1', '2', '3']
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Configuración no encontrada
 */
router.put('/:companyId', [
  check('startRange').optional().isInt({ min: 1 }),
  check('endRange').optional().isInt({ min: 1 }),
  check('cai').optional().isLength({ min: 3, max: 50 }),
  check('invoiceType').optional().isIn(['1', '2', '3']),
  fieldsValidate
], makeController('updateInvoiceConfiguration'))

export default router
