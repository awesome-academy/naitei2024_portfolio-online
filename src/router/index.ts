import express, { Request, Response, NextFunction } from 'express'
import { registerPost, showRegisterForm } from '~/controllers/auth.controller'
const router = express.Router()

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' })
})
router.get('/register', showRegisterForm)
router.post('/register', registerPost)
export default router
