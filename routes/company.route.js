import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Gestión de empresas
 *
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         rtn:
 *           type: string
 *           description: RTN de la empresa (14 caracteres)
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phones:
 *           type: array
 *           items:
 *             type: string
 *         planId:
 *           type: integer
 *         isActive:
 *           type: boolean
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Obtiene la empresa asociada al usuario
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Empresa obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 */
router.get('/user/:id', makeController('company.getByUserId'))

/**
 * @swagger
 * /companies/companies-all:
 *   get:
 *     summary: [Pendiente] Obtener todas las empresas (definir propósito)
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.get('/companies-all', () => {})

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Crea una nueva empresa
 *     tags: [Companies]
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
 *               - name
 *               - planId
 *             properties:
 *               rtn:
 *                 type: string
 *                 description: Debe tener 14 caracteres
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phones:
 *                 type: array
 *                 items:
 *                   type: string
 *               planId:
 *                 type: integer
 *     responses:
 *       202:
 *         description: Empresa creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', [
  check('rtn', 'El RTN es obligatorio').not().isEmpty().isLength({ min: 14, max: 14 }).withMessage('El RTN debe tener una longitud de 14 caracteres'),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El correo no es válido').optional().isEmail(),
  check('phones', 'El campo teléfonos debe estar en formato Array').optional().isArray(),
  check('planId', 'El plan es obligatorio').not().isEmpty().isNumeric().withMessage('El plan debe ser un número'),
  fieldsValidate
], makeController('company.create'))

/**
 * @swagger
 * /companies/{rtn}:
 *   put:
 *     summary: Actualiza la información de una empresa
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rtn
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phones:
 *                 type: array
 *                 items:
 *                   type: string
 *               planId:
 *                 type: integer
 *               isActive:
 *                 type: boolean
 *     responses:
 *       202:
 *         description: Empresa actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Empresa no encontrada
 */
router.put('/:rtn', [
  check('name', 'El nombre no es válido').optional().not().isEmpty(),
  check('email', 'El correo no es válido').optional().isEmail(),
  check('phones', 'El campo teléfonos debe estar en formato Array').optional().isArray(),
  check('planId', 'El plan es obligatorio').optional().not().isEmpty().isNumeric().withMessage('El plan debe ser un número'),
  check('rtn', 'El RTN debe tener una longitud de 14 caracteres').isLength({ min: 14, max: 14 }),
  check('isActive', 'El campo isActive debe ser un booleano').isBoolean(),
  fieldsValidate
], makeController('company.update'))

export default router
