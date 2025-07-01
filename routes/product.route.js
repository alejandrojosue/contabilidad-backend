import { Router } from 'express'
import { check } from 'express-validator'
import { fieldsValidate } from '../middlewares/index.js'
import { makeController } from '../helpers/make-controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - code
 *         - name
 *         - description
 *         - purchase_price
 *         - price
 *       properties:
 *         code:
 *           type: string
 *           description: Código único del producto (máx 50 caracteres)
 *         name:
 *           type: string
 *           description: Nombre del producto (máx 255 caracteres)
 *         description:
 *           type: string
 *           description: Descripción detallada del producto
 *         purchase_price:
 *           type: number
 *           format: float
 *           description: Precio de compra
 *         price:
 *           type: number
 *           format: float
 *           description: Precio de venta
 *         tax:
 *           type: number
 *           format: float
 *           description: Impuesto aplicado (0 a 100)
 *         stock:
 *           type: integer
 *           description: Stock disponible
 *         is_active:
 *           type: boolean
 *           description: Si el producto está activo
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de URLs de imágenes
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 */
router.get('/', makeController('product.get'))

/**
 * @swagger
 * /products/{code}:
 *   get:
 *     summary: Obtiene un producto por su código
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: code
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del producto
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:code', makeController('product.getByCode'))

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto con sus categorías
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *               - description
 *               - purchase_price
 *               - price
 *             properties:
 *               code:
 *                 type: string
 *                 maxLength: 50
 *                 description: Código único del producto
 *               name:
 *                 type: string
 *                 maxLength: 255
 *               description:
 *                 type: string
 *               purchase_price:
 *                 type: number
 *                 minimum: 0
 *               price:
 *                 type: number
 *                 minimum: 0
 *               tax:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *               is_active:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs de categorías asociadas al producto
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       400:
 *         description: Error de validación
 */
router.post('/', [
  check('code').notEmpty().isLength({ max: 50 }),
  check('name').notEmpty().isLength({ max: 255 }),
  check('description').notEmpty(),
  check('purchase_price').notEmpty().isFloat({ min: 0 }),
  check('price').notEmpty().isFloat({ min: 0 }),
  check('tax').optional().isFloat({ min: 0, max: 100 }),
  check('stock').optional().isInt({ min: 0 }),
  check('is_active').optional().isBoolean(),
  check('images').optional().isArray(),
  check('categories', 'El campo categories debe ser un array de IDs numéricos').optional().isArray(),
  check('categories.*', 'Cada categoría debe ser un número entero positivo').optional().isInt({ min: 1 }),
  fieldsValidate
], makeController('product.create'))
/**
 * @swagger
 * /products/{code}:
 *   put:
 *     summary: Actualiza un producto existente y sus categorías
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: code
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           maxLength: 50
 *         description: Código único del producto
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
 *               description:
 *                 type: string
 *               purchase_price:
 *                 type: number
 *                 minimum: 0
 *               price:
 *                 type: number
 *                 minimum: 0
 *               tax:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *               is_active:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs de categorías asociadas al producto
 *     responses:
 *       202:
 *         description: Procesando la solicitud
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:code', [
  check('name').optional().isLength({ max: 255 }),
  check('description').optional(),
  check('purchase_price').optional().isFloat({ min: 0 }),
  check('price').optional().isFloat({ min: 0 }),
  check('tax').optional().isFloat({ min: 0, max: 100 }),
  check('stock').optional().isInt({ min: 0 }),
  check('is_active').optional().isBoolean(),
  check('images').optional().isArray(),
  check('categories', 'El campo categories debe ser un array de IDs numéricos').optional().isArray(),
  check('categories.*', 'Cada categoría debe ser un número entero positivo').optional().isInt({ min: 1 }),
  fieldsValidate
], makeController('product.update'))

export default router
