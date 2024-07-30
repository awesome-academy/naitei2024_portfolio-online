import express from 'express'
import { showAbout } from '~/controllers/about.controller'
import { isAuthenticated } from '~/middlewares/auth.middleware'
const router = express.Router()

router.get('/', isAuthenticated, showAbout)

export default router
