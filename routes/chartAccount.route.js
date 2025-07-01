import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: ChartAccounts
 *   description: Gestión de cuentas contables
 *
 * components:
 *   schemas:
 *     ChartAccount:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         code:
 *           type: string
 *           description: Código de la cuenta (ACT, PAS, PAT, ING, EGS)
 *         description:
 *           type: string
 *         type:
 *           type: string
 *           description: Tipo de cuenta (3 caracteres)
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /chart-accounts:
 *   get:
 *     summary: Obtiene todas las cuentas contables
 *     tags: [ChartAccounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cuentas contables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChartAccount'
 */
router.get('/', makeController('chartAccount.get'))

/**
 * @swagger
 * /chart-accounts:
 *   post:
 *     summary: Crea una nueva cuenta contable
 *     tags: [ChartAccounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - description
 *               - type
 *             properties:
 *               code:
 *                 type: string
 *                 description: Código de la cuenta, uno de ACT, PAS, PAT, ING, EGS
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 description: Tipo de cuenta (3 caracteres)
 *     responses:
 *       201:
 *         description: Cuenta contable creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', [
  check('code', 'El campo code es obligatorio')
    .notEmpty()
    .isLength({ min: 3, max: 20 }).withMessage('El campo code debe tener entre 3 y 20 caracteres')
    .isIn(['ACT', 'PAS', 'PAT', 'ING', 'EGS']).withMessage('El campo code debe ser uno de los siguientes: ACT, PAS, PAT, ING, EGS'),
  check('description', 'El campo description es obligatorio')
    .notEmpty()
    .isLength({ min: 3, max: 50 }).withMessage('El campo description debe tener entre 3 y 50 caracteres'),
  check('type', 'El campo type es obligatorio')
    .notEmpty()
    .isLength({ min: 3, max: 3 }).withMessage('El campo type debe tener 3 caracteres')
], fieldsValidate, makeController('chartAccount.create'))

/**
 * @swagger
 * /chart-accounts/{id}:
 *   put:
 *     summary: Actualiza una cuenta contable existente
 *     tags: [ChartAccounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cuenta contable a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Código de la cuenta, uno de ACT, PAS, PAT, ING, EGS
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 description: Tipo de cuenta (3 caracteres)
 *     responses:
 *       200:
 *         description: Cuenta contable actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Cuenta no encontrada
 */
router.put('/:id', [
  check('code', 'El campo code debe tener entre 3 y 20 caracteres')
    .optional()
    .isLength({ min: 3, max: 20 })
    .isIn(['ACT', 'PAS', 'PAT', 'ING', 'EGS']).withMessage('El campo code debe ser uno de los siguientes: ACT, PAS, PAT, ING, EGS'),
  check('description', 'El campo description debe tener entre 3 y 50 caracteres')
    .optional()
    .isLength({ min: 3, max: 50 }),
  check('type', 'El campo type debe tener 3 caracteres')
    .optional()
    .isLength({ min: 3, max: 3 })
], fieldsValidate, makeController('chartAccount.update'))

export default router
