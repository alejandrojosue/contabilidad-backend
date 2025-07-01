import { Router } from 'express'
import { get } from '../controllers/apiCalls.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: ApiCalls
 *   description: Gestión de llamadas API
 */

/**
 * @swagger
 * /api-calls:
 *   get:
 *     summary: Obtener todas las llamadas API
 *     tags: [ApiCalls]
 *     responses:
 *       200:
 *         description: Lista de llamadas API obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Número total de registros
 *                 limit:
 *                   type: integer
 *                   description: Límite de registros por página
 *                 values:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/', get)

export default router
