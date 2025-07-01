import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: StrapiAdminPermissions
 *   description: Gestión de permisos administrativos
 */

/**
 * @swagger
 * /strapi-admin-permissions:
 *   get:
 *     summary: Obtener todos los permisos
 *     tags: [StrapiAdminPermissions]
 *     responses:
 *       200:
 *         description: Lista de permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', makeController('getStrapiAdminPermissions'))

/**
 * @swagger
 * /strapi-admin-permissions/{id}:
 *   get:
 *     summary: Obtener permiso por ID
 *     tags: [StrapiAdminPermissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del permiso
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permiso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:id', makeController('getStrapiAdminPermissionById'))

/**
 * @swagger
 * /strapi-admin-permissions/role/{id}:
 *   get:
 *     summary: Obtener permisos por ID de rol
 *     tags: [StrapiAdminPermissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del rol
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permisos asociados al rol
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/role/:id', makeController('getStrapiAdminPermissionByRoleId'))

/**
 * @swagger
 * /strapi-admin-permissions:
 *   post:
 *     summary: Crear un nuevo permiso
 *     tags: [StrapiAdminPermissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 maxLength: 255
 *               subject:
 *                 type: string
 *                 maxLength: 255
 *               properties:
 *                 type: object
 *               conditions:
 *                 type: object
 *               roleId:
 *                 type: integer
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 */
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

/**
 * @swagger
 * /strapi-admin-permissions/{id}:
 *   put:
 *     summary: Actualizar un permiso existente
 *     tags: [StrapiAdminPermissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del permiso a actualizar
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
 *               action:
 *                 type: string
 *                 maxLength: 255
 *               subject:
 *                 type: string
 *                 maxLength: 255
 *               properties:
 *                 type: object
 *               conditions:
 *                 type: object
 *               roleId:
 *                 type: integer
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 */
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
