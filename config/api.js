import dotenv from 'dotenv'
dotenv.config()
const { NODE_ENV } = process.env
export const REST = {
  defaultLimit: 1000,
  maxLimit: 2000,
  rateLimit: 5,
  mode: NODE_ENV,
  apiVersion: 'v1',
  maxWaitingCount: 100, // Número máximo de trabajos pendientes en batchQueue antes de usar urgentQueue
  tokenExpiration: '15m' // Tiempo de expiración del token
}
