import { request, response } from 'express'
import { logApiMiddleware } from '../middlewares/log-api-middleware.js'
import QueueFactory from '../queues/queueFactory.js'
import { REST } from '../config/api.js'

export const controller = logApiMiddleware(async (req = request, res = response) => {
  if (res.locals.auditRef === null || res.locals.auditRef === undefined) {
    return res.status(500).json({
      error: {
        msg: 'Internal Server Error',
        details: ['API_REF_99']
      }
    })
  }
  const urgentQueue = QueueFactory.getQueue('urgentQueue')
  const batchQueue = QueueFactory.getQueue('batchQueue')

  const body = req.body
  const info = req.info?.uid ?? { user: body?.user, uType: body?.uType }

  const jobData = {
    body: req.body,
    params: req.params,
    query: req.query,
    user: info,
    functionName: req.serviceFunctionName,
    auditRef: res.locals.auditRef // ← Si quieres pasar el ref al worker
  }
  const waitingCount = await batchQueue.getWaitingCount()
  const useBatch = waitingCount <= REST.maxWaitingCount

  const queue = useBatch ? batchQueue : urgentQueue
  const jobName = useBatch ? 'processBatch' : 'processUrgent'

  const job = await queue.add(jobName, jobData)

  res.status(202).json({
    message: 'Procesando la solicitud',
    jobId: job.id
  })
})
