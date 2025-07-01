import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: CompanyPayments
 *   description: Pagos de empresas
 *
 * components:
 *   schemas:
 *     CompanyPayment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         rtn:
 *           type: string
 *           description: RTN de la empresa (14 caracteres)
 *         planId:
 *           type: integer
 *         amountPaid:
 *           type: number
 *           format: decimal
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /company-payment:
 *   get:
 *     summary: Obtiene los pagos de las empresas
 *     tags: [CompanyPayment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autorizado
 */
router.get('/', makeController('companyPayment.get'))

/**
 * @swagger
 * /company-payments:
 *   get:
 *     summary: Obtiene los pagos de la empresa asociada al usuario
 *     tags: [CompanyPayments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Pagos obtenidos exitosamente
 */
router.get('/user/:id', makeController('companyPayment.getByUserId'))

/**
 * @swagger
 * /company-payments:
 *   post:
 *     summary: Registra un nuevo pago de empresa
 *     tags: [CompanyPayments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rtn
 *               - planId
 *               - amountPaid
 *             properties:
 *               rtn:
 *                 type: string
 *                 description: Debe tener exactamente 14 caracteres
 *               planId:
 *                 type: integer
 *               amountPaid:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       202:
 *         description: Pago registrado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', [
  check('rtn', 'El campo rtn es obligatorio')
    .notEmpty().isLength({ min: 14, max: 14 }).withMessage('El campo rtn debe tener exactamente 14 caracteres'),

  check('planId', 'El campo planId es obligatorio')
    .notEmpty().isNumeric().withMessage('El campo planId debe ser un número'),

  check('amountPaid', 'El campo amountPaid es obligatorio')
    .notEmpty().isDecimal().withMessage('El campo amountPaid debe ser un número decimal')

], fieldsValidate, makeController('companyPayment.create'))

/**
 * @swagger
 * /company-payments/{id}:
 *   put:
 *     summary: Actualiza un pago de empresa
 *     tags: [CompanyPayments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rtn:
 *                 type: string
 *                 description: Debe tener exactamente 14 caracteres
 *               planId:
 *                 type: integer
 *               amountPaid:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       202:
 *         description: Pago actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Pago no encontrado
 */
router.put('/:id', [
  check('rtn', 'El campo rtn debe tener exactamente 14 caracteres')
    .optional().isLength({ min: 14, max: 14 }),

  check('planId', 'El campo planId debe ser un número')
    .optional().isNumeric(),

  check('amountPaid', 'El campo amountPaid debe ser un número decimal')
    .optional().isDecimal()

], fieldsValidate, makeController('companyPayment.update'))

export default router
