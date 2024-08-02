import express from 'express'
const router = express.Router()
import { showRegisterForm, registerPost } from '~/controllers/auth.controller'
import { RegisterDto } from '~/dtos/Register.dto'
import { validateDto } from '~/middlewares/validateDto.middleware'

router.get('/register', showRegisterForm)
router.post('/register', validateDto(RegisterDto), registerPost)

export default router
