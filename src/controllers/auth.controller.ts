import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
import authService from '~/services/auth.service'

export const showRegisterForm = (req: Request, res: Response) => {
  res.render('auth/register')
}
export const registerPost = [
  body('email').isEmail().withMessage('Email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password is required').trim().escape(),
  body('fullname').isLength({ min: 6 }).withMessage('Fullname is required').trim().escape(),
  body('phoneNumber').isLength({ min: 10 }).withMessage('Phone number is required').trim().escape(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('auth/register', {
        title: 'Register',
        errors: errors.array().map((error) => ({
          ...error,
          msg: error.msg
        }))
      })
      console.log(errors.array())
      return
    } else {
      const { email, password, fullname, phoneNumber } = req.body
      const user = await authService.register(fullname, email, password, phoneNumber)
      req.flash('success', 'Register successfully')
      res.redirect('/login')
    }
  })
]
