import jwt from 'jsonwebtoken'
const generarJWT = async (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.SECRETEORPRIVATEKEY, {
      expiresIn: '4h' /* Tiempo que dura esto */
    }, (err, token) => {
      if (err) {
        console.error(err)
        reject(new Error('No se pudo generar el Token'))
      } else {
        resolve(token)
      }
    })
  })
}

export {
  generarJWT
}
