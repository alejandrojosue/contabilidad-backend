import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: StrapiAdminRoles
 *   description: Gestión de roles administrativos
 */

/**
 * @swagger
 * /strapi-admin-roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [StrapiAdminRoles]
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', makeController('getStrapiAdminRoles'))

/**
 * @swagger
 * /strapi-admin-roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags: [StrapiAdminRoles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:id', makeController('getStrapiAdminRoleById'))

/**
 * @swagger
 * /strapi-admin-roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [StrapiAdminRoles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 255
 *               code:
 *                 type: string
 *                 maxLength: 255
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol creado exitosamente
 */
router.post('/', [
  check('name', 'El campo name es obligatorio')
    .notEmpty().isLength({ max: 255 }),
  check('code', 'El campo code es obligatorio')
    .notEmpty().isLength({ max: 255 }),
  check('description', 'El campo description debe ser texto')
    .optional().isString(),
  fieldsValidate
], makeController('createStrapiAdminRole'))

/**
 * @swagger
 * /strapi-admin-roles/{id}:
 *   put:
 *     summary: Actualizar un rol existente
 *     tags: [StrapiAdminRoles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol a actualizar
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
 *                 maxLength: 255
 *               code:
 *                 type: string
 *                 maxLength: 255
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 */
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
