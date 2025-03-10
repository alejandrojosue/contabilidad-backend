import Role from '../models/role'
import User from '../models/user'
const esRoleValido = async (rol = '') => {
  const existRol = await Role.findOne(({ rol }))
  if (!existRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`)
  }
}

const emailExist = async (correo = '') => {
  const existEmail = await User.findOne({ correo })

  if (existEmail) { throw new Error(`El correo: ${correo} ya está registrado en la base de datos`) }
}

const userIdExist = async (id) => {
  const idExist = await User.findById(id)

  if (!idExist) { throw new Error(`El id: ${id} no existe`) }
}

export {
  esRoleValido,
  emailExist,
  userIdExist
}
