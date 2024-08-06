import express from 'express'
import { showAbout } from '~/controllers/about.controller'
const router = express.Router()

router.get('/', showAbout)

export default router
