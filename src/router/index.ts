import express, { Request, Response, NextFunction } from 'express'
import { upload, uploadToCloudinary } from '~/api_service/cloudinary.service'
import { showRegisterForm } from '~/controllers/auth.controller'
import authRoute from './auth/auth.router'
import aboutRoute from './about/about.router'
import { CLOUDINARY_NUM } from '~/constants/cloudinary.constant'
import experienceRoute from './experience/experience.router'
import skillRoute from './skill/skill.router'
import blogRoute from './blog/blog.router'
const router = express.Router()

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' })
})

router.post(
  '/upload',
  upload.array('images', CLOUDINARY_NUM.MAX_COUNT),
  uploadToCloudinary,
  async (req: Request, res: Response) => {
    try {
      const cloudinaryUrls = req.body.cloudinaryUrls
      if (cloudinaryUrls.length === 0) {
        req.flash('error', req.t('error.uploadFailed'))
        res.status(500)
      }
      const images = cloudinaryUrls
      return res.send(images)
    } catch (error) {
      req.flash('error', req.t('error.uploadFailed'))
      return res.status(500).json({ error })
    }
  }
)
router.use('/auth', authRoute)
router.use('/about', aboutRoute)
router.use('/experience', experienceRoute)
router.use('/skill', skillRoute)
router.use('/blog', blogRoute)
export default router
