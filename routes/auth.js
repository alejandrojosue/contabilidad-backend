import { Router } from 'express'
import { check } from 'express-validator'
import { login, googleSignIn } from '../controllers/auth'
import { fieldsValidate } from '../middlewares/fields-validate'
const router = Router()

router.post('/login', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  fieldsValidate
], login)

router.post('/google', [
  check('id_token', 'El id_Token es obligatorio').notEmpty(),
  fieldsValidate
], googleSignIn)

export default router
