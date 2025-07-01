import { Worker } from 'bullmq'
import Redis from 'ioredis'
import { processJob } from './workerSharedLogic.js'

const redisConnection = new Redis()
// eslint-disable-next-line
new Worker('urgentQueue', processJob, { connection: redisConnection })
