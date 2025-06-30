import { Router } from 'express'
import { check } from 'express-validator'
import { login, register, confirmation, forgotPassword, passwordReset, verifyTokenPasswordReset } from '../controllers/auth.controller.js'
import { fieldsValidate } from '../middlewares/fields-validate.js'
const router = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión en el sistema
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *               - ipAddress
 *               - channel
 *             properties:
 *               identifier:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               channel:
 *                 type: string
 *                 enum: [W, M]
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente
  *       400:
  *        description: Error de validación o autenticación
 */
router.post('/login', [
  check('identifier', 'El correo es obligatorio').not().isEmpty().isEmail().withMessage('El correo no es válido'),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], login)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - idRol
 *               - email
 *               - ipAddress
 *               - channel
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               idRol:
 *                 type: integer
 *               email:
 *                 type: string
 *                 format: email
 *               ipAddress:
 *                 type: string
 *               channel:
 *                 type: string
 *                 enum: [W, M]
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *      400:
 *       description: Error de validación o registro
 */
router.post('/register', [
  check('username', 'Nombre de usuario es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria').not().isEmpty().isStrongPassword().withMessage('La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial'),
  check('idRol', 'El id del rol es obligatorio').not().isEmpty().isNumeric().withMessage('El idRol debe ser numérico'),
  check('email', 'El correo es obligatorio').not().isEmpty().isEmail().withMessage('El correo no es válido'),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], register)

/**
 * @swagger
 * /auth/confirm:
 *   post:
 *     summary: Confirma el registro de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - ipAddress
 *               - channel
 *             properties:
 *               token:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               channel:
 *                 type: string
 *                 enum: [W, M]
 *     responses:
 *       200:
 *         description: Cuenta confirmada correctamente
 *       400:
 *         description: Error de validación o confirmación
 */
router.post('/confirm', [
  check('token', 'El token es obligatorio').not().isEmpty(),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], confirmation)

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicita un enlace para recuperar la contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - ipAddress
 *               - channel
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               ipAddress:
 *                 type: string
 *               channel:
 *                 type: string
 *                 enum: [W, M]
 *     responses:
 *       200:
 *         description: Enlace de recuperación enviado
 *       400:
 *         description: Error de validación o envío de enlace
 */
router.post('/forgot-password', [
  check('email', 'El correo es obligatorio').not().isEmpty().isEmail().withMessage('El correo no es válido'),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], forgotPassword)

/**
 * @swagger
 * /auth/verify-token:
 *   post:
 *     summary: Verifica la validez de un token de recuperación
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - ipAddress
 *               - channel
 *             properties:
 *               token:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               channel:
 *                 type: string
 *                 enum: [W, M]
 *     responses:
 *       200:
 *         description: Token válido
 */
router.post('/verify-token', [
  check('token', 'El token es obligatorio').not().isEmpty(),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], verifyTokenPasswordReset)

/**
 * @swagger
 * /auth/password-reset:
 *   post:
 *     summary: Cambia la contraseña de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - ipAddress
 *               - channel
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *               channel:
 *                 type: string
 *                 enum: [W, M]
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 */
router.post('/password-reset', [
  check('email', 'El correo es obligatorio').not().isEmpty().isEmail().withMessage('El correo no es válido'),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], passwordReset)

export default router
