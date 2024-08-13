import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import skillService from '~/services/skill.service'

export const deleteSkillPost = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.session.user?.id
  if (!userId) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }

  const { skillIds } = req.body
  const skillId = Number(skillIds)

  if (isNaN(skillId)) {
    req.flash('error', req.t('validation.invalidId'))
    return res.redirect('/about')
  }

  try {
    await skillService.deleteSkillByIds(skillId, Number(userId))
    req.flash('success', req.t('status.deleteSuccess'))
  } catch (error) {
    req.flash('error', req.t('status.deleteFail'))
  }

  res.redirect('/about/create')
})
