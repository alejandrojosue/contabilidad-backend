import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

// Obtener todos los roles
router.get('/', makeController('getStrapiAdminRoles'))

// Obtener un rol por ID
router.get('/:id', makeController('getStrapiAdminRoleById'))

// Crear un rol
router.post('/', [
  check('name', 'El campo name es obligatorio')
    .notEmpty().isLength({ max: 255 }),
  check('code', 'El campo code es obligatorio')
    .notEmpty().isLength({ max: 255 }),
  check('description', 'El campo description debe ser texto')
    .optional().isString(),
  fieldsValidate
], makeController('createStrapiAdminRole'))

// Actualizar un rol
router.put('/:id', [
  check('name', 'El campo name debe tener máximo 255 caracteres')
    .optional().isLength({ max: 255 }),
  check('code', 'El campo code debe tener máximo 255 caracteres')
    .optional().isLength({ max: 255 }),
  check('description', 'El campo description debe ser texto')
    .optional().isString(),
  fieldsValidate
], makeController('updateStrapiAdminRole'))

export default router
