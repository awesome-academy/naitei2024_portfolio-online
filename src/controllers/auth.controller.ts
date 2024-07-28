import { NextFunction, Request, Response } from 'express'

export const showRegisterForm = (req: Request, res: Response) => {
  res.render('auth/register')
}
