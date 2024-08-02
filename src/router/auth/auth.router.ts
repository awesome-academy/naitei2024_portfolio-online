import express from 'express'
const router = express.Router()
import { showLoginForm, showRegisterForm, loginPost, registerPost } from '~/controllers/auth.controller'
import { LoginDto } from '~/dtos/Login.dto'
import { RegisterDto } from '~/dtos/Register.dto'
import { validateDto } from '~/middlewares/validateDto.middleware'

router.get('/register', showRegisterForm)
router.post('/register', validateDto(RegisterDto), registerPost)
router.get('/login', showLoginForm)
router.post('/login', validateDto(LoginDto), loginPost)

export default router
