import { NextFunction, Request, Response } from 'express'

export function checkUserAuthentication(req: Request, res: Response, next: NextFunction) {
  const userId = req.session.user?.id
  if (!userId) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }
  next()
}

export function checkAdminAuthentication(req: Request, res: Response, next: NextFunction) {
  const user = req.session.user
  if (!user) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }

  if (user.role !== 'admin') {
    req.flash('error', req.t('auth.notAdmin'))
    return res.redirect('/auth/login')
  }

  next()
}
