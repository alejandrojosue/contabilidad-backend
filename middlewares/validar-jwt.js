import { response, request } from 'express'
// import jwt from 'jsonwebtoken'

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-tken')
  if (!token) {
    return res.status(400).json({
      msg: 'No hay toquen'
    })
  }

  try {
    res.json({
      token: 'sdadfs'
    })
    // const { uid, } = jwt.verify(token, process.env.SECRETEORPRIVATEKEY);
    // const user = await User.findById(uid);
    // if (!user) return res.status(401).json({
    //     msg: 'Token no valido - usuario con existe en bd'
    // })

    // // verificar si estado = true
    // if (!user.estado) return res.status(401).json({
    //     msg: 'Token no valido - usuario con estado false'
    // })
    // req.user = user;
    // next();
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Token no válido'
    })
  }
}

export {
  validarJWT
}
