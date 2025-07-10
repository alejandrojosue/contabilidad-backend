// middlewares/error-handler.js
export const errorHandlerMiddleware = (err, req, res, next) => {
  console.error('🔥 Error capturado:', err)

  const statusCode = err.status ?? 500
  const code = err.code ?? 'ERR_UNEXPECTED'
  const message = err.message ?? 'Error interno del servidor'

  res.status(statusCode).json({
    error: {
      code,
      message
    }
  })
}
