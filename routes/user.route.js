import { Router } from 'express'
import { getPermissionsByRole } from '../controllers/users.js'

const router = Router()

router.get('/permissions-all', getPermissionsByRole)

export default router
