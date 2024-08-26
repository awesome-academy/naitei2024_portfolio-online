import { Request, Response } from 'express'
import userService from '~/services/user.service'
import asyncHandler from 'express-async-handler'

function handleUserNotFound(req: Request, res: Response): void {
  req.flash('error', req.t('auth.userNotFound'))
  return res.redirect('/auth/login')
}

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers()
  if (users.length == 0) {
    return handleUserNotFound(req, res)
  }
  return res.render('admin/user', { users: users })
})

export const setActivateUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id
  const active = req.params.active
  const user = await userService.findUserById(parseInt(userId))
  if (!user) {
    return handleUserNotFound(req, res)
  }
  user.isActive = active === 'true'
  await userService.saveUser(user)
  return res.redirect('/admin/user')
})
