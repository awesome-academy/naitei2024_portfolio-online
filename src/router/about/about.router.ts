import express from 'express'
import { showAbout, showCreateAbout, updateAboutPost } from '~/controllers/about.controller'
import upload from '~/middlewares/upload'
const router = express.Router()

router.get('/', showAbout)
router.get('/create', showCreateAbout)
router.post('/update', upload.single('imageUrl'), updateAboutPost)
export default router
