import { Router } from 'express'
import QueueFactory from '../queues/queueFactory.js'

const router = Router()

router.get('/', async (req, res) => {
  const batchQueue = await QueueFactory.getAllJobs('batchQueue')
  res.status(200).json({
    data: batchQueue
  })
})

router.get('/names', (req, res) => {
  res.json({ queues: QueueFactory.getQueueNames() })
})

router.get('/counts', async (req, res) => {
  const batchCounts = await QueueFactory.getJobCounts('batchQueue')
  const urgentCounts = await QueueFactory.getJobCounts('urgentQueue')

  res.json({
    batchQueue: batchCounts,
    urgentQueue: urgentCounts
  })
})

router.get('/all/:queueName', async (req, res) => {
  const jobs = await QueueFactory.getAllJobs(req.params.queueName)
  res.json({ jobs })
})

export default router
