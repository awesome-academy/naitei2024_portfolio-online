import { NextFunction, Request, Response } from 'express'
import experienceService from '~/services/experience.service'
import skillService from '~/services/skill.service'
import userService from '~/services/user.service'
import asyncHandler from 'express-async-handler'
import { formatExperiencePeriod } from '~/utils/dateUtils'

function checkUserAuthentication(req: Request, res: Response): boolean {
  const userId = req.session.user?.id
  if (!userId) {
    handleUserNotFound(req, res)
    return false
  }
  return true
}

function handleUserNotFound(req: Request, res: Response): void {
  req.flash('error', req.t('auth.userNotFound'))
  res.redirect('auth/login')
}

export const showAbout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.session.user?.id
  if (!checkUserAuthentication(req, res)) {
    return
  }

  try {
    const user = await userService.findUserById(Number(userId))
    if (!user) {
      return handleUserNotFound(req, res)
    }

    const [experienceEntries, skillEntries] = await Promise.all([
      experienceService.getExperiencesByUserId(user.id),
      skillService.getSkillsByUserId(user.id)
    ])

    if (user.title === null || user.description === null) {
      req.flash('info', req.t('about.noDataFound'))
      return res.redirect('about/create')
    }

    const experience = {
      entries: experienceEntries.map((entry) => ({
        company: entry.company,
        years: formatExperiencePeriod(entry.startDate, entry.endDate),
        title: entry.title,
        description: entry.description
      }))
    }

    const skills = {
      entries: skillEntries.map((entry) => ({
        skill: entry.name,
        percent: entry.proficiency
      }))
    }
    res.render('about', { experience, skills, user })
  } catch (error) {
    req.flash('error', req.t('about.serverError'))
    return res.redirect('/')
  }
})
