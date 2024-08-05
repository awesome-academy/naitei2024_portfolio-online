import express from 'express'
import { deleteExperiencePost } from '~/controllers/experience.controller'
const router = express.Router()

router.post('/delete', deleteExperiencePost)

export default router
