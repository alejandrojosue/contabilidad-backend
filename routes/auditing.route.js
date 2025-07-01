import { Router } from 'express'
import { get } from '../controllers/auditing.controller.js'

const router = Router()

/**
 * @swagger
 * /auditing:
 *   get:
 *     summary: Obtiene el historial de auditoría del sistema
 *     tags: [Auditing]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Cantidad total de registros
 *                 limit:
 *                   type: integer
 *                   description: Límite de registros por página o consulta
 *                 values:
 *                   type: array
 *                   description: Lista de registros de auditoría
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del registro de auditoría
 *                       act:
 *                         type: string
 *                         description: Acción realizada (GET, POST, PUT, DELETE)
 *                       tbl_name:
 *                         type: string
 *                         description: Nombre de la tabla afectada
 *                       desc:
 *                         type: string
 *                         description: Descripción detallada de los cambios o datos
 *                       usr_id:
 *                         type: integer
 *                         description: ID del usuario que realizó la acción
 *                       usr_tp:
 *                         type: string
 *                         description: Tipo de usuario (ADMIN o USER)
 *                       crt_at:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de creación del registro
 *       401:
 *         description: No autorizado, token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', get)

export default router
