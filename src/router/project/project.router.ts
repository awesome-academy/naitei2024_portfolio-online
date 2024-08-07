import express from 'express'
import multer from 'multer'

import { showProjectForm, showProject, postSaveProject, uploadProjectImage } from '~/controllers/project.controller'

const router = express.Router()

router.get('/', showProject)
router.get('/create', showProjectForm)
router.post('/save', postSaveProject)
router.post('/upload', multer().single('image'), uploadProjectImage)
router.get('/edit/:id', showProjectForm)

export default router
