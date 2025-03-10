// middlewares/corsErrorMiddleware.js
export const corsErrorMiddleware = (err, req, res, next) => {
  if (err instanceof Error && err.message.includes('CORS')) {
    return res.status(403).json({
      status: 'error',
      message: err.message // El mensaje del error de CORS
    })
  }
  next(err) // Pasar el error al siguiente middleware si no es CORS
}
