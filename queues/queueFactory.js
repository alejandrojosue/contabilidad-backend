import { Queue } from 'bullmq'
import Redis from 'ioredis'

const redisConnection = new Redis({
  host: '127.0.0.1',
  port: 6379,
  retryStrategy: (times) => {
    return times >= 3 ? null : Math.min(times * 50, 2000)
  }
})

redisConnection.on('connect', () => {
  console.log('✅ Redis conectado correctamente')
})

redisConnection.on('error', (err) => {
  console.error('❌ Redis error:', err.message)
})

redisConnection.ping((err, result) => {
  if (err) {
    console.error('❌ Redis no responde al ping:', err.message)
  } else {
    console.log('📡 Redis respondió al ping:', result)
  }
})

class QueueFactory {
  static queues = {}

  static getQueue (queueName) {
    if (!this.queues[queueName]) {
      try {
        this.queues[queueName] = new Queue(queueName, {
          connection: redisConnection,
          defaultJobOptions: {
            attempts: 3,
            backoff: { type: 'exponential', delay: 1000 },
            removeOnComplete: true,
            removeOnFail: {
              count: 100,
              age: 1 * 60 * 60 * 1000 // 1h
            }
          }
        })
      } catch (error) {
        console.error(`❌ Error creando cola ${queueName}:`, error.message)
        throw error
      }
    }
    return this.queues[queueName]
  }

  static getQueueNames () {
    return Object.keys(this.queues)
  }

  static async getJobCounts (queueName) {
    if (!this.queues[queueName]) {
      throw new Error(`La cola ${queueName} no está inicializada`)
    }
    return await this.queues[queueName].getJobCounts()
  }

  static async getAllJobs (queueName) {
    const queue = this.getQueue(queueName)
    return await queue.getJobs(['waiting', 'active', 'delayed', 'completed', 'failed'])
  }

  static async getJob (queueName, jobId) {
    const queue = this.getQueue(queueName)
    return await queue.getJob(jobId)
  }

  static async removeJob (queueName, jobId) {
    const queue = this.getQueue(queueName)
    const job = await queue.getJob(jobId)
    if (job) {
      await job.remove()
      return true
    }
    return false
  }

  static async cleanQueue (queueName, gracePeriod = 0) {
    const queue = this.getQueue(queueName)
    return await queue.clean(gracePeriod)
  }

  static async removeAllJobs (queueName) {
    const jobs = await this.getAllJobs(queueName)
    await Promise.all(jobs.map(job => job.remove()))
    return true
  }
}

export default QueueFactory
