import express, { Request, Response, NextFunction } from 'express'
import { followUser, showUserProfile, unfollowUser } from '~/controllers/follow.controller'
const router = express.Router()

router.get('/:userName', showUserProfile)
router.post('/:userName/follow', followUser)
router.post('/:userName/unfollow', unfollowUser)
export default router
