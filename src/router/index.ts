import express, { Request, Response, NextFunction } from 'express'
import { registerPost, showRegisterForm } from '~/controllers/auth.controller'
import authRoute from './auth/auth.router'
import aboutRoute from './about/about.router'
import projectRoute from './project/project.router'
import experienceRoute from './experience/experience.router'
import skillRoute from './skill/skill.router'
import blogRoute from './blog/blog.router'
import guestRoute from './guest/guest.router'
const router = express.Router()

router.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index')
  console.log(req.session.user)
})
router.get('/register', showRegisterForm)
router.post('/register', registerPost)
router.use('/auth', authRoute)
router.use('/about', aboutRoute)
router.use('/project', projectRoute)
router.use('/experience', experienceRoute)
router.use('/skill', skillRoute)
router.use('/blog', blogRoute)
router.use('/guest', guestRoute)
export default router
