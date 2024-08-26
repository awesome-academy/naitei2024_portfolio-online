import express from 'express'
import multer from 'multer'
import {
  showProjectForm,
  showProject,
  postSaveProject,
  uploadProjectImage,
  deleteProject
} from '~/controllers/project.controller'
import { checkUserAuthentication } from '~/middlewares/authentication.middleware'

const router = express.Router()

router.get('/', checkUserAuthentication, showProject)
router.get('/create', checkUserAuthentication, showProjectForm)
router.post('/save', checkUserAuthentication, multer().single('image'), postSaveProject)
router.post('/upload', checkUserAuthentication, multer().single('image'), uploadProjectImage)
router.get('/edit/:id', checkUserAuthentication, showProjectForm)
router.get('/add', checkUserAuthentication, showProjectForm)
router.delete('/delete/:id', checkUserAuthentication, deleteProject)

export default router
