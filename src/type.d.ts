import 'express'
import 'express-session'
import { Role } from './enum/role';

declare global {
  namespace Express {
    interface Request {
      validationErrors?: Array<{ field: string; msg: string }>
      files?: {
        [fieldname: string]: Multer.File[]
      }
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string | number
      email: string
      fullname: string
      role: Role
    }
  }
}

declare global {
  type BlogFiles = {
    [fieldname: string]: Express.Multer.File[]
  }
}
