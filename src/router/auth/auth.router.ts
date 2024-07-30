import express from 'express'
const router = express.Router()
import { showLoginForm, showRegisterForm, loginPost, registerPost } from '~/controllers/auth.controller'
router.get('/register', showRegisterForm)
router.post('/register', registerPost)
router.get('/login', showLoginForm)
router.post('/login', loginPost)

export default router
