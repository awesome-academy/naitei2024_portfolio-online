import { NextFunction, Request, Response } from 'express'

function checkUserAuthentication(req: Request, res: Response, next: NextFunction) {
  const userId = req.session.user?.id
  if (!userId) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }
  next()
}

export default checkUserAuthentication
