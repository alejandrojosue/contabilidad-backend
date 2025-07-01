import { Worker, QueueScheduler } from 'bullmq'
import Redis from 'ioredis'
import { processJob } from './workerSharedLogic.js'

const redisConnection = new Redis()
// eslint-disable-next-line
new QueueScheduler('batchQueue', { connection: redisConnection })

const batchSize = 10
const batchTimeout = 3000

let batch = []
let timer = null

const processBatch = async (jobs) => {
  console.log(`Procesando lote de ${jobs.length} jobs...`)
  for (const job of jobs) {
    try {
      await processJob(job)
      await job.moveToCompleted('done', true)
    } catch (error) {
      await job.moveToFailed({ message: error.message })
    }
  }
  console.log('Lote procesado.')
}

// eslint-disable-next-line
new Worker('batchQueue', async job => {
  batch.push(job)

  if (batch.length >= batchSize) {
    clearTimeout(timer)
    const jobsToProcess = [...batch]
    batch = []
    await processBatch(jobsToProcess)
  } else if (!timer) {
    timer = setTimeout(async () => {
      const jobsToProcess = [...batch]
      batch = []
      timer = null
      if (jobsToProcess.length > 0) {
        await processBatch(jobsToProcess)
      }
    }, batchTimeout)
  }
}, { connection: redisConnection })
