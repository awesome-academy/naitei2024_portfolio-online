import express, { Request, Response, NextFunction } from 'express'
import authRoute from './auth/auth.router'
import aboutRoute from './about/about.router'
const router = express.Router()

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' })
})
router.use('/auth', authRoute)
router.use('/about', aboutRoute)
export default router
