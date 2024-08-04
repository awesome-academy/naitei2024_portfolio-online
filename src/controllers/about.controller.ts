import { NextFunction, Request, Response } from 'express'
import experienceService from '~/services/experience.service'
import skillService from '~/services/skill.service'
import userService from '~/services/user.service'
import asyncHandler from 'express-async-handler'

export const showAbout = asyncHandler(async (req: Request, res: Response) => {
  // Check if the user is authenticated
  const userId = req.session.user?.id
  if (!userId) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('auth/login')
  }

  try {
    const user = await userService.findUserById(Number(userId))
    if (!user) {
      req.flash('error', req.t('auth.userNotFound'))
      return res.redirect('auth/login')
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
        years: `${entry.startDate.getFullYear()}-${entry.endDate ? entry.endDate.getFullYear() : 'Present'}`,
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
