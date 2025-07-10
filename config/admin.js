import dotenv from 'dotenv'
dotenv.config()

export const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  API_SALT,
  EMAIL_USER,
  EMAIL_PASS,
  FRONTEND_URL,
} = process.env
