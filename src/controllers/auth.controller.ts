import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { LoginDto } from '~/dtos/Login.dto'
import { RegisterDto } from '~/dtos/Register.dto'
import { LoginError, RegisterError } from '~/enum/role'
import authService from '~/services/auth.service'
import mailService from '~/services/mail.service'

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
    return res.redirect('/auth/register')
  }
  req.flash('success', req.t('auth.registerSuccess'))
  mailService.sendMail(userDto.email).then((verification) => {
    res.redirect(`/auth/verify?id=${verification.id}`)
  })
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
  if (!user.emailVerified) {
    req.flash('error', req.t('auth.emailNotVerified'))
    return res.redirect('/auth/login')
  }
  req.session.user = {
    id: user.id,
    email: user.email,
    fullname: user.fullName
  }
  req.flash('success', req.t('status.loginSuccess'))
  res.redirect('/')
})

export const verifyEmailForm = asyncHandler(async (req: Request, res: Response) => {
  const id = req.query.id
  const verification = await mailService.getVerificationById(parseInt(id as string))
  if (!verification) {
    req.flash('error', req.t('auth.verifyEmailFail'))
    return res.redirect('/')
  }
  res.render('auth/verify-email', { id })
})

export const verifyEmailPost = asyncHandler(async (req: Request, res: Response) => {
  const { id, code } = req.body
  const verification = await mailService.getVerificationById(parseInt(id as string))
  if (!verification) {
    req.flash('error', req.t('auth.verifyEmailFail'))
    return res.redirect('/')
  }

  const email = verification.email
  const result = await mailService.verifyEmail(email, code)
  if (!result) {
    req.flash('error', req.t('auth.verifyEmailFail'))
    return res.redirect('/')
  }
  req.flash('success', req.t('auth.verifyEmailSuccess'))
  res.redirect('/auth/login')
})
