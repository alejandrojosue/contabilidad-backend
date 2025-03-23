import { Router } from 'express'
// import { check } from 'express-validator'

// import { fieldsValidate } from '../middlewares/index.js'
import { getCustomerByUser } from '../controllers/customers.js'

const router = Router()

router.get('/', getCustomerByUser)

export default router
