import express, { Request, Response, NextFunction } from 'express'
import { showAbout } from '~/controllers/about.controller'
import { loginPost, registerPost, showLoginForm, showRegisterForm } from '~/controllers/auth.controller'
const router = express.Router()

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' })
})
router.get('/register', showRegisterForm)
router.post('/register', registerPost)
router.get('/login', showLoginForm)
router.post('/login', loginPost)
router.get('/about', showAbout)
export default router
