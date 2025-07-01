import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { getCustomerByUser } from '../controllers/customers.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Gestión de clientes
 *
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         company:
 *           type: string
 *           description: RTN de la empresa (14 caracteres)
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         isActive:
 *           type: boolean
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Obtiene los clientes asociados al usuario
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Clientes obtenidos exitosamente
 */
router.get('/', getCustomerByUser)

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - name
 *               - email
 *               - phone
 *               - address
 *             properties:
 *               company:
 *                 type: string
 *                 description: RTN de la empresa (14 caracteres)
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       202:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/', [
  check('company', 'El campo company es obligatorio').notEmpty().isLength({ min: 14, max: 14 }).withMessage('El campo company debe tener 14 caracteres'),
  check('name').notEmpty().withMessage('El campo name es obligatorio').isLength({ min: 3, max: 50 }).withMessage('El campo name debe tener entre 3 y 50 caracteres'),
  check('email').isEmail().withMessage('El campo email debe ser un correo electrónico válido'),
  check('phone').isLength({ min: 8, max: 8 }).withMessage('El campo phone debe tener 8 caracteres'),
  check('address').isLength({ min: 5, max: 200 }).withMessage('El campo address debe tener entre 5 y 200 caracteres'),
  fieldsValidate
], makeController('createCustomer'))

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 description: RTN de la empresa (14 caracteres)
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       202:
 *         description: Cliente actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/:id', [
  check('company', 'El campo company debe tener 14 caracteres').isLength({ min: 14, max: 14 }),
  check('name').isLength({ min: 3, max: 50 }).withMessage('El campo name debe tener entre 3 y 50 caracteres'),
  check('email').isEmail().withMessage('El campo email debe ser un correo electrónico válido'),
  check('phone').isLength({ min: 8, max: 8 }).withMessage('El campo phone debe tener 8 caracteres'),
  check('address').isLength({ min: 5, max: 200 }).withMessage('El campo address debe tener entre 5 y 200 caracteres'),
  check('isActive', 'El campo isActive debe ser un valor booleano').isBoolean(),
  fieldsValidate
], makeController('updateCustomer'))

export default router
