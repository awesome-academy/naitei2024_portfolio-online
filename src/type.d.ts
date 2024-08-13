import 'express'
import 'express-session'

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
    }
  }
}

declare global {
  type BlogFiles = {
    [fieldname: string]: Express.Multer.File[]
  }
}
