import { Request, Response, NextFunction } from 'express'
import { SessionData } from 'express-session'

export const isAuthenticated = (req: Request & { session: SessionData }, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('auth/login')
  }
}
