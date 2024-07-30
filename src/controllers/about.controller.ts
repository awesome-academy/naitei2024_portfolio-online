import { NextFunction, Request, Response } from 'express'
import experienceService from '~/services/experience.service'
import skillService from '~/services/skill.service'
import userService from '~/services/user.service'

export const showAbout = async (req: Request, res: Response) => {
  // Kiểm tra xem user có tồn tại trong session không
  if (!req.session.user?.id) {
    return res.redirect('/login')
  }
  const userId = Number(req.session.user.id)
  try {
    const user = await userService.findUserById(userId)

    if (!user) {
      req.flash('error', req.t('auth.userNotFound'))
      return res.redirect('/login')
    }
    const [experienceEntries, skillEntries] = await Promise.all([
      experienceService.getExperiencesByUserId(user.id),
      skillService.getSkillsByUserId(user.id)
    ])
    // Kiểm tra nếu không có dữ liệu experience và skill
    if (experienceEntries.length === 0 || skillEntries.length === 0) {
      return res.redirect('/create')
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

    res.render('about/', { experience, skills })
  } catch (error) {
    console.error('Error in showAbout:', error)
    res.status(500).render('error', { message: 'An error occurred while processing your request' })
  }
}
