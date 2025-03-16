import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { usersGet } from '../controllers/usersAdmin.js'
import bcryptjs from 'bcryptjs'

const router = Router()

router.get('/', usersGet)

router.post('/', [
  check('name', 'name is required').not().isEmpty(),
  check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
  check('email', 'email is required ').not().isEmpty(),
  check('email', 'invalid email').isEmail(),
  fieldsValidate
], () => {})

router.get('/pass', async (req, res) => {
  const salt = await bcryptjs.genSalt(10) // Generar un "salt" (factor de coste de encriptación)
  const hashedPassword = await bcryptjs.hash('1234', salt)
  res.json({
    hash: hashedPassword
  })
})

export default router
