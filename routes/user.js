import { Router } from 'express'
import { check } from 'express-validator'

import { fieldsValidate } from '../middlewares/index.js'
import { usersGet, usersPost } from '../controllers/usersAdmin.js'

const router = Router()

router.get('/', usersGet)

router.post('/', [
  check('name', 'name is required').not().isEmpty(),
  check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
  check('email', 'email is required ').not().isEmpty(),
  check('email', 'invalid email').isEmail(),
  fieldsValidate
], usersPost)
// router.put('/:id', [
//         check('id', 'No es un ID válido').isMongoId(),
//         check('id').custom(userIdExist),
//         check('rol').custom(esRoleValido),
//         fieldsValidate
//     ],
//     usersPut);

// router.post('/', [
//     check('nombre', 'El nombre es requerido').not().isEmpty(),
//     check('clave', 'La clave debe tener al menos 6 letras').isLength({ min: 6 }),
//     check('correo', 'El correo no es válido').isEmail(),
//     check('correo').custom(emailExist),
//     // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
//     check('rol').custom(esRoleValido),
//     fieldsValidate
// ], usersPost);

// router.delete('/:id', [
//     validarJWT,
//     // esAdminRole,
//     tieneRol('ADMIN_ROLE', 'SELLER_ROLE'),
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom(userIdExist),
//     fieldsValidate
// ], usersDelete);

// router.patch('/', usersPatch);

export default router
