import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { RegisterDto } from '~/dtos/Register.dto'
import { RegisterError } from '~/enum/role'
import authService from '~/services/auth.service'

export const showRegisterForm = (req: Request, res: Response) => {
  res.render('auth/register')
}
export const registerPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.validationErrors) {
    return res.render('auth/register', {
      errors: req.validationErrors.map((error) => ({
        ...error,
        msg: req.t(error.msg)
      })),
      inputData: req.body
    })
  }
  const userDto: RegisterDto = req.body
  const result = await authService.register(userDto)
  if (!result.success) {
    if (result.error === RegisterError.EMAILEXIST) {
      req.flash('error', req.t('validation.emailExist'))
    } else if (result.error === RegisterError.USERNAMEEXIST) {
      req.flash('error', req.t('validation.userNameExist'))
    }
    return res.redirect('register')
  }
  req.flash('success', req.t('auth.registerSuccess'))
  res.redirect('login')
})
