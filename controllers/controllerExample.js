import express from 'express'
const router = express.Router()

// Simulación de base de datos (reemplázala con una real)
const categories = [
  { id: 1, name: 'Tecnología' },
  { id: 2, name: 'Hogar' }
]

// Middleware para manejar errores internos
const handleInternalError = (res, err) => {
  console.error(err)
  return res.status(500).json({ error: 'Error interno del servidor' })
}

// Obtener todas las categorías (200 - OK)
router.get('/', (req, res) => {
  res.status(200).json(categories)
})

// Obtener una categoría por ID (200, 400, 404)
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' })

  const category = categories.find(cat => cat.id === id)
  if (!category) return res.status(404).json({ error: 'Categoría no encontrada' })

  res.status(200).json(category)
})

// Crear una nueva categoría (201 - Created, 400 - Bad Request)
router.post('/', (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Nombre es requerido' })

  const newCategory = { id: categories.length + 1, name }
  categories.push(newCategory)

  res.status(201).json(newCategory)
})

// Actualizar una categoría (200, 400, 404)
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { name } = req.body

  if (isNaN(id) || !name) return res.status(400).json({ error: 'Datos inválidos' })

  const index = categories.findIndex(cat => cat.id === id)
  if (index === -1) return res.status(404).json({ error: 'Categoría no encontrada' })

  categories[index].name = name
  res.status(200).json(categories[index])
})

// Eliminar una categoría (200, 404)
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = categories.findIndex(cat => cat.id === id)

  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' })
  if (index === -1) return res.status(404).json({ error: 'Categoría no encontrada' })

  categories.splice(index, 1)
  res.status(200).json({ message: 'Categoría eliminada' })
})

// --- Respuestas HTTP adicionales ---

// 202 - Accepted (Procesamiento asíncrono simulado)
router.post('/bulk', (req, res) => {
  setTimeout(() => {
    res.status(202).json({ message: 'Solicitud en proceso, revisa luego' })
  }, 3000)
})

// 401 - Unauthorized (Ejemplo de autenticación fallida)
router.get('/protected', (req, res) => {
  return res.status(401).json({ error: 'No autorizado' })
})

// 403 - Forbidden (Ejemplo de permiso denegado)
router.get('/admin', (req, res) => {
  return res.status(403).json({ error: 'Acceso prohibido' })
})

// 405 - Method Not Allowed
router.all('/', (req, res) => {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(405).json({ error: 'Método no permitido' })
  }
})

// 409 - Conflict (Ejemplo de duplicado)
router.post('/unique', (req, res) => {
  const { name } = req.body
  if (categories.some(cat => cat.name === name)) {
    return res.status(409).json({ error: 'El nombre ya existe' })
  }
  res.status(201).json({ message: 'Categoría creada con éxito' })
})

// 410 - Gone (Ejemplo de recurso eliminado permanentemente)
router.get('/deprecated', (req, res) => {
  return res.status(410).json({ error: 'Este recurso ya no está disponible' })
})

// 429 - Too Many Requests (Ejemplo de límite de solicitudes)
let requestCount = 0
router.get('/rate-limited', (req, res) => {
  requestCount++
  if (requestCount > 5) {
    return res.status(429).json({ error: 'Demasiadas solicitudes, intenta más tarde' })
  }
  res.status(200).json({ message: 'Solicitud aceptada' })
})

// 500 - Internal Server Error (Ejemplo forzado)
router.get('/error', (req, res) => {
  return handleInternalError(res, new Error('Simulación de error interno'))
})

// 503 - Service Unavailable (Ejemplo de mantenimiento)
router.get('/maintenance', (req, res) => {
  return res.status(503).json({ error: 'Servicio en mantenimiento, intenta más tarde' })
})

// 505 - HTTP Version Not Supported
router.get('/http-version', (req, res) => {
  return res.status(505).json({ error: 'Versión HTTP no soportada' })
})

export default router
