import { getAllUsers, setActivateUser } from '~/controllers/admin.controller'
import express from 'express'
import { checkAdminAuthentication } from '~/middlewares/authentication.middleware'
const router = express.Router()

router.get('/user', checkAdminAuthentication, getAllUsers)
router.get('/user/:id/activate/:active', checkAdminAuthentication, setActivateUser)

export default router
