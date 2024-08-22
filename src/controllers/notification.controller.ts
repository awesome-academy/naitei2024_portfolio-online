import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import followService from '~/services/follow.service'

export const showNotification = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.session.user?.id
  const pendingRequests = await followService.getPendingFollowRequests(Number(userId))
  res.render('notification/index', { pendingRequests })
})
