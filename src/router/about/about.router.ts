import express from 'express'
import { showAbout, showCreateAbout } from '~/controllers/about.controller'
const router = express.Router()

router.get('/', showAbout)
router.get('/create', showCreateAbout)
export default router
