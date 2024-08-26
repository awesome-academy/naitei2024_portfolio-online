import express from 'express'
const router = express.Router()
import {
  showLoginForm,
  showRegisterForm,
  loginPost,
  registerPost,
  verifyEmailForm,
  verifyEmailPost,
  logout,
  emailForChangePasswordForm,
  emailForChangePasswordPost,
  verifyEmailForChangePasswordPost,
  changePasswordForm,
  changePasswordPost
} from '~/controllers/auth.controller'
import { LoginDto } from '~/dtos/Login.dto'
import { RegisterDto } from '~/dtos/Register.dto'
import { validateDto } from '~/middlewares/validateDto.middleware'

router.get('/register', showRegisterForm)
router.post('/register', validateDto(RegisterDto), registerPost)
router.get('/login', showLoginForm)
router.post('/login', validateDto(LoginDto), loginPost)
router.get('/verify', verifyEmailForm)
router.post('/verify', verifyEmailPost)
router.get('/logout', logout)
router.get('/forgot-password', emailForChangePasswordForm)
router.post('/forgot-password', emailForChangePasswordPost)
router.post('/verify-email-code', verifyEmailForChangePasswordPost)
router.get('/change-password', changePasswordForm)
router.post('/change-password', changePasswordPost)

export default router
