import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: PaymentPlans
 *   description: Planes de pago disponibles en el sistema
 *
 * components:
 *   schemas:
 *     PaymentPlan:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del plan de pago
 *         name:
 *           type: string
 *           description: Nombre del plan
 *         price:
 *           type: number
 *           format: float
 *           description: Precio del plan
 *         includedItems:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de elementos incluidos
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /payment-plans:
 *   get:
 *     summary: Obtiene todos los planes de pago
 *     tags: [PaymentPlans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de planes de pago
 */
router.get('/', makeController('paymentPlan.get'))

/**
 * @swagger
 * /payment-plans/{id}:
 *   get:
 *     summary: Obtiene un plan de pago por su ID
 *     tags: [PaymentPlans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Plan de pago encontrado
 *       404:
 *         description: Plan no encontrado
 */
router.get('/:id', makeController('paymentPlan.getById'))

/**
 * @swagger
 * /payment-plans:
 *   post:
 *     summary: Crea un nuevo plan de pago
 *     tags: [PaymentPlans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentPlan'
 *     responses:
 *       201:
 *         description: Plan creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', [
  check('name', 'El campo name es obligatorio')
    .notEmpty().isLength({ min: 3, max: 255 }),

  check('price', 'El campo price es obligatorio y debe ser un número mayor o igual a 0')
    .notEmpty().isFloat({ min: 0 }),

  check('includedItems', 'El campo includedItems debe ser un arreglo de textos')
    .optional().isArray(),

  fieldsValidate
], makeController('paymentPlan.create'))

/**
 * @swagger
 * /payment-plans/{id}:
 *   put:
 *     summary: Actualiza un plan de pago existente
 *     tags: [PaymentPlans]
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               includedItems:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Plan actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Plan no encontrado
 */
router.put('/:id', [
  check('name').optional().isLength({ min: 3, max: 255 }),
  check('price').optional().isFloat({ min: 0 }),
  check('includedItems').optional().isArray(),
  fieldsValidate
], makeController('paymentPlan.update'))

export default router
