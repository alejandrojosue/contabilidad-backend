import { Queue } from 'bullmq'
import Redis from 'ioredis'

const redisConnection = new Redis({ host: '127.0.0.1', port: 6379 })

class QueueFactory {
  static queues = {}

  static getQueue (queueName) {
    if (!this.queues[queueName]) {
      this.queues[queueName] = new Queue(queueName, {
        connection: redisConnection
        // defaultJobOptions: {
        //   removeOnComplete: false, // No borra jobs completados
        //   removeOnFail: false // No borra jobs fallidos
        // }
      })
    }
    return this.queues[queueName]
  }

  static getQueueNames () {
    return Object.keys(this.queues)
  }

  static async getJobCounts (queueName) {
    const queue = this.getQueue(queueName)
    return await queue.getJobCounts()
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
    for (const job of jobs) {
      await job.remove()
    }
    return true
  }
}

export default QueueFactory
