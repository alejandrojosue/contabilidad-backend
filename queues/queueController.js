import QueueFactory from './queueFactory.js'
import { REST } from '../config/api.js'

const urgentQueue = QueueFactory.getQueue('urgentQueue')
const batchQueue = QueueFactory.getQueue('batchQueue')

export const handleRequest = async (req, res) => {
  const jobData = { body: req.body, params: req.params, query: req.query, user: req.info?.uid }

  // Consultar número de trabajos pendientes en batchQueue
  const waitingCount = await batchQueue.getWaitingCount()

  // Si hay más de 10 jobs esperando en batchQueue, usar urgentQueue para no saturar batch
  const useBatch = waitingCount <= REST.maxWaitingCount

  if (!useBatch) {
    const job = await urgentQueue.add('processUrgent', jobData)
    res.status(202).json({ message: 'Petición encolada urgente', jobId: job.id })
  } else {
    const job = await batchQueue.add('processBatch', jobData)
    res.status(202).json({ message: 'Petición encolada para batch', jobId: job.id })
  }
}
