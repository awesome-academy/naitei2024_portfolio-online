import express, { Request, Response, NextFunction } from 'express'
import { showRegisterForm } from '~/controllers/auth.controller'
const router = express.Router()

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' })
})
router.get('/register', showRegisterForm)
export default router
