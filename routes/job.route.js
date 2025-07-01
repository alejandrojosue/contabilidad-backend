import { Router } from 'express'
import QueueFactory from '../queues/queueFactory.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Queues
 *   description: Gestión de colas y trabajos en Redis/BullMQ
 */

/**
 * @swagger
 * /queues:
 *   get:
 *     summary: Obtiene todos los trabajos de la cola batchQueue
 *     tags: [Queues]
 *     responses:
 *       200:
 *         description: Lista de trabajos en la cola batchQueue
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Trabajos en batchQueue
 */
router.get('/', async (req, res) => {
  const batchQueue = await QueueFactory.getAllJobs('batchQueue')
  res.status(200).json({
    data: batchQueue
  })
})

/**
 * @swagger
 * /queues/names:
 *   get:
 *     summary: Obtiene los nombres de todas las colas creadas
 *     tags: [Queues]
 *     responses:
 *       200:
 *         description: Nombres de las colas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 queues:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/names', (req, res) => {
  res.json({ queues: QueueFactory.getQueueNames() })
})

/**
 * @swagger
 * /queues/counts:
 *   get:
 *     summary: Obtiene el conteo de trabajos por estado para las colas batchQueue y urgentQueue
 *     tags: [Queues]
 *     responses:
 *       200:
 *         description: Conteos de trabajos por cola
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 batchQueue:
 *                   type: object
 *                   description: Conteos de trabajos en batchQueue por estado
 *                 urgentQueue:
 *                   type: object
 *                   description: Conteos de trabajos en urgentQueue por estado
 */
router.get('/counts', async (req, res) => {
  const batchCounts = await QueueFactory.getJobCounts('batchQueue')
  const urgentCounts = await QueueFactory.getJobCounts('urgentQueue')

  res.json({
    batchQueue: batchCounts,
    urgentQueue: urgentCounts
  })
})

/**
 * @swagger
 * /queues/all/{queueName}:
 *   get:
 *     summary: Obtiene todos los trabajos de una cola específica
 *     tags: [Queues]
 *     parameters:
 *       - in: path
 *         name: queueName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la cola
 *     responses:
 *       200:
 *         description: Trabajos de la cola solicitada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   description: Lista de trabajos
 */
router.get('/all/:queueName', async (req, res) => {
  const jobs = await QueueFactory.getAllJobs(req.params.queueName)
  res.json({ jobs })
})

export default router
