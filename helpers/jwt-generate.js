import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../config/admin.js'
import { REST } from '../config/api.js'

const signAsync = promisify(jwt.sign)
/**
 * Generates JWT tokens for user authentication.
 * @module helpers/jwt-generate
 */
const generateAccessToken = async ({ uid, expiresIn = '15m' }) => {
  try {
    return await signAsync({ uid }, JWT_SECRET, { expiresIn })
  } catch (err) {
    throw new Error(`JWT Error: ${err.message}`)
  }
}

/** * Generates a refresh token for user authentication.
 * @param {Object} params - Parameters for generating the refresh token.
 * @param {string} params.uid - User ID to include in the token.
 * @param {string} [params.expiresIn='7d'] - Expiration time for the refresh token.
 * @return {Promise<string>} - A promise that resolves to the generated refresh token.
 * @throws {Error} - If there is an error during token generation.
 * */
export const generateRefreshToken = async ({ uid, expiresIn = '7d' }) => {
  try {
    return await signAsync({ uid }, JWT_REFRESH_SECRET, { expiresIn })
  } catch (err) {
    throw new Error(`Refresh Token Error: ${err.message}`)
  }
}

/** * Generates a JWT token without an expiration time.
 * @param {string} uid - User ID
 * @return {Promise<string>} - A promise that resolves to the generated token.
 * * @throws {Error} - If there is an error during token generation.
 */
const generateTokenNoExpiry = async (uid) => {
  try {
    return await signAsync({ uid }, JWT_SECRET) // sin { expiresIn }
  } catch (err) {
    throw new Error(`JWT No Expiry Error: ${err.message}`)
  }
}

/** * Generates a JWT token with or without expiration based on the provided parameters.
 * @param {string} [uid=''] - User ID to include in the token.
 * @param {boolean} [expire=false] - Whether to generate a token with expiration.
 * @return {Promise<string>} - A promise that resolves to the generated token.
 */
export const generate = async (uid = '', expire = false) => {
  return expire
    ? generateAccessToken({ uid, expiresIn: REST.tokenExpiration }) // con expiración
    : generateTokenNoExpiry(uid) // sin expiración
}

/** Decodes a JWT token without verifying its signature.
 * @param {string} token - The JWT token to decode.
 * @return {Object|null} - The decoded token payload or null if decoding fails.
 */
export const decodeToken = (token) => {
  return jwt.decode(token)
}

/** * Decodes and verifies a JWT token.
 * @param {string} token - The JWT token to decode and verify.
 * @return {Object|null} - The decoded token payload if verification succeeds, or null if it fails.
 * @throws {Error} - If there is an error during verification.
 */
export const decodeAndVerifyToken = (token, isRefresh = false) => {
  return jwt.verify(token, isRefresh ? JWT_REFRESH_SECRET : JWT_SECRET, (err, decoded) => {
    if (err) return null
    return decoded
  })
}
