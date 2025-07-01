import { Router } from 'express'
import { getPermissionsByRole } from '../controllers/users.js'

const router = Router()

/**
 * @swagger
 * /permissions-all:
 *   get:
 *     summary: Obtiene todos los permisos por rol
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Permisos obtenidos correctamente
 */
router.get('/permissions-all', getPermissionsByRole)

export default router
