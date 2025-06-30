import { Worker } from 'bullmq'
import Redis from 'ioredis'

const redisConnection = new Redis()

const urgentWorker = new Worker('urgentQueue', async job => {
  // eslint-disable-next-line
  const { body, user } = job.data

  return { status: 'ok' }
}, { connection: redisConnection })

urgentWorker.on('completed', job => console.log(`Urgent job ${job.id} completado`))
urgentWorker.on('failed', (job, err) => console.error(`Urgent job ${job.id} falló:`, err))
