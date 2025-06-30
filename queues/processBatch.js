import { Worker, QueueScheduler } from 'bullmq'
import Redis from 'ioredis'

const redisConnection = new Redis()
// eslint-disable-next-line
new QueueScheduler('batchQueue', { connection: redisConnection })

const batchSize = 10
const batchTimeout = 3000

let batch = []
let timer = null

const processBatch = async (jobs) => {
  console.log(`Procesando lote de ${jobs.length} jobs...`)

  // Procesamiento en lote, ej: insertar todos en BD en un solo query
  for (const job of jobs) {
  // eslint-disable-next-line
    const { body, user } = job.data

    await job.moveToCompleted('done', true)
  }
  console.log('Lote procesado.')
}

const batchWorker = new Worker('batchQueue', async job => {
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

batchWorker.on('completed', job => console.log(`Batch job ${job.id} completado`))
batchWorker.on('failed', (job, err) => console.error(`Batch job ${job.id} falló:`, err))
