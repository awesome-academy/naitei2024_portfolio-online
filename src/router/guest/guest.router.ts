import express, { Request, Response, NextFunction } from 'express'
import { acceptFollow, requestFollow, showUserProfile, unfollowUser } from '~/controllers/follow.controller'
const router = express.Router()

router.get('/:userName', showUserProfile)
router.post('/:userName/follow', requestFollow)
router.post('/:followerId/accept', acceptFollow)
router.post('/:followerId/reject', acceptFollow)
router.post('/:userName/unfollow', unfollowUser)
export default router
