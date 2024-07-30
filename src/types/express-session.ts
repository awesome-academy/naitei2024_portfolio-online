import 'express-session'

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string | number
      email: string
      fullname: string
    }
  }
}
