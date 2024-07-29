import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
import authService from '~/services/auth.service'
import { translate } from '~/utils/translateI18n'

export const showRegisterForm = (req: Request, res: Response) => {
  res.render('auth/register')
}
export const registerPost = [
  body('email').isEmail().withMessage(translate('validation.email')).normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage(translate('validation.password')).trim().escape(),
  body('fullname').isLength({ min: 6 }).withMessage(translate('validation.fullname')).trim().escape(),
  body('username').isLength({ min: 6 }).withMessage(translate('validation.userName')).trim().escape(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('auth/register', {
        errors: errors.array().map((error) => ({
          ...error,
          msg: req.t(error.msg)
        }))
      })
      console.log(errors)
      return
    } else {
      const { fullname, password, email, username } = req.body
      const user = await authService.register(fullname, password, email, username)
      req.flash('success', req.t('auth.registerSuccess'))
      res.redirect('/login')
    }
  })
]
