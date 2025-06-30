import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

// Obtener todos los permisos
router.get('/', makeController('getStrapiAdminPermissions'))

// Obtener permiso por ID
router.get('/:id', makeController('getStrapiAdminPermissionById'))

router.get('/role/:id', makeController('getStrapiAdminPermissionByRoleId'))

// Crear un permiso
router.post('/', [
  check('action', 'El campo action es obligatorio')
    .notEmpty().isLength({ max: 255 }),
  check('subject', 'El campo subject debe tener máximo 255 caracteres')
    .optional().isLength({ max: 255 }),
  check('properties', 'El campo properties debe ser un objeto JSON')
    .optional().isObject(),
  check('conditions', 'El campo conditions debe ser un objeto JSON')
    .optional().isObject(),
  check('roleId', 'El campo roleId debe ser un número')
    .optional().isNumeric(),
  fieldsValidate
], makeController('createStrapiAdminPermission'))

// Actualizar un permiso
router.put('/:id', [
  check('action', 'El campo action debe tener máximo 255 caracteres')
    .optional().isLength({ max: 255 }),
  check('subject', 'El campo subject debe tener máximo 255 caracteres')
    .optional().isLength({ max: 255 }),
  check('properties', 'El campo properties debe ser un objeto JSON')
    .optional().isObject(),
  check('conditions', 'El campo conditions debe ser un objeto JSON')
    .optional().isObject(),
  check('roleId', 'El campo roleId debe ser un número')
    .optional().isNumeric(),
  fieldsValidate
], makeController('updateStrapiAdminPermission'))

export default router
