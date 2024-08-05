import express from 'express'
import { deleteSkillPost } from '~/controllers/skill.controller'
const router = express.Router()

router.post('/delete', deleteSkillPost)

export default router
