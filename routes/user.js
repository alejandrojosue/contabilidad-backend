import { Router } from 'express'
// import { check } from 'express-validator'

// import { fieldsValidate } from '../middlewares/index.js'
import { getPermissionsByRole } from '../controllers/users.js'

const router = Router()

router.get('/permissions-all', getPermissionsByRole)

export default router
