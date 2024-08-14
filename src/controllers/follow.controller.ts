import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

import userService from '~/services/user.service'
import blogService from '~/services/blog.service'
import projectService from '~/services/project.service'
import experienceService from '~/services/experience.service'
import skillService from '~/services/skill.service'
import followService from '~/services/follow.service'
import { Home } from '~/enum/home'

const checkFollowUser = (req: Request, res: Response): number | null => {
  const followerId = req.session.user?.id
  if (!followerId) {
    req.flash('error', req.t('auth.userNotFound'))
    res.redirect('/auth/login')
    return null
  }
  return Number(followerId)
}

export const followUser = asyncHandler(async (req: Request, res: Response) => {
  const followerId = checkFollowUser(req, res)
  if (!followerId) return

  const { userName } = req.params

  const userToFollow = await userService.findUserByUserName(userName)
  if (!userToFollow) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }

  const result = await followService.followUser(followerId, userToFollow.id)
  if (result.success) {
    req.flash('success', req.t('status.followSuccess'))
  } else {
    req.flash('error', result.message)
  }
  res.redirect(`/guest/${userName}`)
})

export const unfollowUser = asyncHandler(async (req: Request, res: Response) => {
  const followerId = checkFollowUser(req, res)
  if (!followerId) return

  const { userName } = req.params

  const userToUnfollow = await userService.findUserByUserName(userName)
  if (!userToUnfollow) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }

  const result = await followService.unfollowUser(followerId, userToUnfollow.id)
  if (result.success) {
    req.flash('success', req.t('status.unfollowSuccess'))
  } else {
    req.flash('error', result.message)
  }
  res.redirect(`/guest/${userName}`)
})

export const showUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const userName = req.params.userName
  const currentUserId = req.session.user?.id

  const user = await userService.findUserByUserName(userName)
  if (!user) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.render('guest/index', { user: null })
  }

  const isFollowing = currentUserId ? await followService.checkFollowStatus(Number(currentUserId), user.id) : false
  const followStats = await followService.getFollowStats(user.id)
  const activeTab = (req.query.activeTab as string) || Home.ABOUT

  let experience = null
  let skills = null
  let blogs = null
  let projects = null

  if (activeTab === Home.ABOUT) {
    const [experienceEntries, skillEntries] = await Promise.all([
      experienceService.getExperiencesByUserId(user.id),
      skillService.getSkillsByUserId(user.id)
    ])
    experience = {
      entries: experienceEntries.map((entry) => ({
        company: entry.company,
        years: `${entry.startDate.getFullYear()}-${entry.endDate ? entry.endDate.getFullYear() : 'Present'}`,
        title: entry.title,
        description: entry.description
      }))
    }
    skills = {
      entries: skillEntries.map((entry) => ({
        skill: entry.name,
        percent: entry.proficiency
      }))
    }
  } else if (activeTab === Home.BLOGS && isFollowing) {
    blogs = await blogService.getBlogsByUserId(user.id)
  } else if (activeTab === Home.PROJECTS && isFollowing) {
    projects = await projectService.getProjectsByUserId(user.id)
  }

  res.render('guest/index', {
    user,
    isFollowing,
    followStats,
    experience,
    skills,
    blogs,
    projects,
    baseUrl: `/guest/${userName}`,
    activeTab,
    currentUser: req.session.user
  })
})
