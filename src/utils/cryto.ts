import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' })
function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

export function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRET)
}
export function comparePassword(password: string, hash: string) {
  return sha256(password + process.env.PASSWORD_SECRET) === hash
}
