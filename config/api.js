import dotenv from 'dotenv'
dotenv.config()
const { NODE_ENV } = process.env
export const REST = {
  defaultLimit: 10,
  maxLimit: 100,
  rateLimit: 5,
  mode: NODE_ENV
}
