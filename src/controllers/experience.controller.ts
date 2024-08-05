import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import experienceService from '~/services/experience.service'

export const deleteExperiencePost = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.session.user?.id
  if (!userId) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }

  const { experienceIds } = req.body
  const experienceId = Number(experienceIds)

  if (isNaN(experienceId)) {
    req.flash('error', req.t('validation.invalidId'))
    return res.redirect('/about')
  }

  try {
    await experienceService.deleteExperienceByIds(experienceId, Number(userId))
    req.flash('success', req.t('status.deleteSuccess'))
  } catch (error) {
    req.flash('error', req.t('status.deleteFail'))
  }

  res.redirect('/about/create')
})
