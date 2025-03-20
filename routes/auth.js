import { Router } from 'express'
import { check } from 'express-validator'
import { login, register, confirmation, forgotPassword, passwordReset } from '../controllers/auth.js'
import { fieldsValidate } from '../middlewares/fields-validate.js'
const router = Router()

router.post('/login', [
  check('identifier', 'El correo es obligatorio').not().isEmpty().isEmail().withMessage('El correo no es válido'),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], login)

router.post('/register', [
  check('username', 'Nombre de usuario es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria').not().isEmpty().isStrongPassword().withMessage('La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial'),
  check('idRol', 'El id del rol es obligatorio').not().isEmpty().isNumeric().withMessage('El idRol debe ser numérico'),
  check('email', 'El correo es obligatorio').not().isEmpty().isEmail().withMessage('El correo no es válido'),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], register)

router.post('/confirm', [
  check('token', 'El token es obligatorio').not().isEmpty(),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], confirmation)

router.post('/forgot-password', [
  check('email', 'El correo es obligatorio').not().isEmpty().isEmail().withMessage('El correo no es válido'),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], forgotPassword)

router.post('/password-reset', [
  check('email', 'El correo es obligatorio').not().isEmpty().isEmail().withMessage('El correo no es válido'),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('ipAddress', 'El origen es obligatorio').not().isEmpty().isIP().withMessage('El origen no es válido'),
  check('channel', 'El canal es obligatorio').not().isEmpty().isIn(['W', 'M']).withMessage('El tipo de canal debe ser W o M'),
  fieldsValidate
], passwordReset)

export default router
