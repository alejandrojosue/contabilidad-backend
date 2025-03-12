import { response, request } from 'express'
import { pool } from '../database/config.js'
// const bcryptjs from 'bcryptjs')
// const User from '../models/user')

const usersGet = async (req = request, res = response) => {
  try {
    // const { usersLimit = 12, from = 0 } = req.query;
    // const userStatus = { estado: true };
    const result = await pool.query('SELECT * FROM VUSADM')
    // const [usersCount, users] = await Promise.all([
    //     User.countDocuments(userStatus),
    //     User.find(userStatus)
    //         .skip(Number(from))
    //         .limit(parseInt(usersLimit))
    // ]);
    // res.render('users', {
    //     title: 'Usuarios',
    //     users,
    //     usersCount
    // })
    res.json({
      values: result.rows,
      count: result.rowCount,
      fields: result.fields.map(field => field.name)
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error interno del servidor',
      error: error.message,
      code: error.code
    })
  }

  // res.json({
  //     usersCount,
  //     users
  // });
}
// const usersPut = async (req, res = response) => {
//     const { id } = req.params;
//     const { _id, clave, google, correo, ...resto } = req.body;
//     // Validar contra BD
//     if (clave) {
//         // Encriptar clave
//         const salt = bcryptjs.genSaltSync();
//         resto.clave = bcryptjs.hashSync(clave, salt);
//     }

//     const user = await User.findByIdAndUpdate(id, resto);

//     res.json({
//         // msg: 'Put API - Controlador',
//         user
//     });
// }
const usersPost = async (req, res = response) => {
  res.json({
    msg: 'Post API - Controlador'
  })
}
// const usersPost = async (req, res = response) => {

//     const { nombre, correo, clave, rol } = req.body;
//     const user = new User({ nombre, correo, clave, rol });

//     // Encriptar clave
//     const salt = bcryptjs.genSaltSync();
//     user.clave = bcryptjs.hashSync(clave, salt);

//     // Guardar
//     await user.save();
//     res.json({
//         user
//     });
// }

// const usersDelete = async (req, res = response) => {
//     const { id } = req.params;
//     // borrar registro
//     // const user = await User.findByIdAndDelete(id);
//     const user = await User.findByIdAndUpdate(id, { estado: false });

//     res.json(user);
// }
// const usersPatch = (req, res = response) => {
//     res.json({
//         msg: 'Path API - Controlador'
//     });
// }

export {
  usersGet,
  // usersPut,
  usersPost
  // usersDelete,
  // usersPatch
}
