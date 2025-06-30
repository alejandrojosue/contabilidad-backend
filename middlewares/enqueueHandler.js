import QueueFactory from '../queues/queueFactory.js'
import { REST } from '../config/api.js'

export const enqueueHandler = (serviceFunction) => {
  return async (req, res, next) => {
    try {
      const auditRef = res.locals.auditRef

      const jobData = {
        body: req.body,
        params: req.params,
        query: req.query,
        user: req.info?.uid,
        auditRef,
        serviceFunctionName: serviceFunction.name
      }

      const urgentQueue = QueueFactory.getQueue('urgentQueue')
      const batchQueue = QueueFactory.getQueue('batchQueue')

      const waitingCount = await batchQueue.getWaitingCount()
      const useBatch = waitingCount <= REST.maxWaitingCount

      const queue = useBatch ? batchQueue : urgentQueue
      const jobName = useBatch ? 'processBatch' : 'processUrgent'

      const job = await queue.add(jobName, jobData)

      res.status(202).json({ message: 'Petición encolada', jobId: job.id })
    } catch (error) {
      next(error)
    }
  }
}
