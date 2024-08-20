import { NextFunction, Request, Response } from 'express'
import experienceService from '~/services/experience.service'
import skillService from '~/services/skill.service'
import userService from '~/services/user.service'
import asyncHandler from 'express-async-handler'
import { formatDateForInput, formatExperiencePeriod } from '~/utils/dateUtils'
import skillDefineService from '~/services/skillDefine.service'
import aboutService from '~/services/about.service'

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
        description: entry.description,
        location: entry.location
      }))
    }

    const skills = {
      entries: skillEntries.map((entry) => ({
        skill: entry.name,
        yearsOfExperience: entry.yearsOfExperience,
        isHighlighted: entry.isHighlighted
      }))
    }
    res.render('about', { experience, skills, user })
  } catch (error) {
    req.flash('error', req.t('about.serverError'))
    return res.redirect('/')
  }
})
export const showCreateAbout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.session.user?.id
  if (!checkUserAuthentication(req, res)) {
    return
  }

  const user = await userService.findUserById(Number(userId))
  if (!user) {
    return handleUserNotFound(req, res)
  }
  const skillOption = await skillDefineService.getSkillDefines()
  const skillOptions = skillOption.map((skill) => skill.name)
  const [experienceEntries, skillEntries] = await Promise.all([
    experienceService.getExperiencesByUserId(user.id),
    skillService.getSkillsByUserId(user.id)
  ])
  const formattedExperiences = experienceEntries.map((exp) => ({
    ...exp,
    startDate: formatDateForInput(exp.startDate),
    endDate: formatDateForInput(exp.endDate)
  }))
  res.render('about/create', {
    user,
    experiences: formattedExperiences || [],
    skills: skillEntries || [],
    skillOptions
  })
})

export const updateAboutPost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.session.user?.id
    if (!userId) {
      req.flash('error', req.t('auth.userNotFound'))
      return res.redirect('/auth/login')
    }
    const updatedUser = await aboutService.updateUserInfo(Number(userId), req.body, req.file)
    req.flash('success', req.t('status.updateSuccess'))
    res.redirect('/about')
  } catch (error) {
    req.flash('error', req.t('status.updateFail'))
    res.redirect('/about')
  }
})
