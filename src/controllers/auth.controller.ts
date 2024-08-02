import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { LoginDto } from '~/dtos/Login.dto'
import { RegisterDto } from '~/dtos/Register.dto'
import { LoginError, RegisterError } from '~/enum/role'
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
export const showLoginForm = (req: Request, res: Response) => {
  res.render('auth/login')
}
export const loginPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.validationErrors) {
    return res.render('auth/login', {
      errors: req.validationErrors.map((error) => ({
        ...error,
        msg: req.t(error.msg)
      })),
      inputData: req.body
    })
  }
  const loginDto: LoginDto = req.body
  const result = await authService.login(loginDto)
  if (result.error) {
    return res.render('auth/login', {
      errors: [{ msg: req.t('validation.invalidEmailPassword') }],
      inputData: req.body
    })
  }
  const user = result.user
  if (!user) {
    return res.render('auth/login', {
      errors: [{ msg: req.t('status.loginFail') }]
    })
  }
  req.session.user = {
    id: user.id,
    email: user.email,
    fullname: user.fullName
  }
  req.flash('success', req.t('status.loginSuccess'))
  res.redirect('/')
})
