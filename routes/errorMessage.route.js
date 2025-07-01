import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { get } from '../controllers/errorMessages.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: ErrorMessages
 *   description: Gestión de mensajes de error personalizados
 *
 * components:
 *   schemas:
 *     ErrorMessage:
 *       type: object
 *       properties:
 *         errorCode:
 *           type: string
 *           description: Código único del error (1-5 caracteres)
 *         errorMessage:
 *           type: string
 *           description: Descripción del error
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /error-messages:
 *   get:
 *     summary: Obtiene la lista de mensajes de error
 *     tags: [ErrorMessages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mensajes de error obtenidos exitosamente
 */
router.get('/', get)

/**
 * @swagger
 * /error-messages:
 *   post:
 *     summary: Crea un nuevo mensaje de error
 *     tags: [ErrorMessages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - errorCode
 *               - errorMessage
 *             properties:
 *               errorCode:
 *                 type: string
 *                 description: Código único del error (1-5 caracteres)
 *               errorMessage:
 *                 type: string
 *                 description: Descripción del error
 *     responses:
 *       201:
 *         description: Mensaje de error creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', [
  check('errorCode', 'El campo errorCode es obligatorio')
    .notEmpty().isLength({ min: 1, max: 5 }).withMessage('El campo errorCode debe tener entre 1 y 5 caracteres'),

  check('errorMessage', 'El campo errorMessage es obligatorio')
    .notEmpty().isLength({ min: 3 }).withMessage('El campo errorMessage debe tener al menos 3 caracteres')
], fieldsValidate, makeController('createErrorMessage'))

/**
 * @swagger
 * /error-messages/{errorCode}:
 *   put:
 *     summary: Actualiza un mensaje de error existente
 *     tags: [ErrorMessages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: errorCode
 *         required: true
 *         schema:
 *           type: string
 *           description: Código único del error
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errorMessage:
 *                 type: string
 *                 description: Nueva descripción del error (mínimo 3 caracteres)
 *     responses:
 *       200:
 *         description: Mensaje de error actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Mensaje de error no encontrado
 */
router.put('/:errorCode', [
  check('errorMessage', 'El campo errorMessage debe tener al menos 3 caracteres')
    .optional().isLength({ min: 3 })
], fieldsValidate, makeController('updateErrorMessage'))

export default router
