import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

import userService from '~/services/user.service'
import blogService from '~/services/blog.service'
import projectService from '~/services/project.service'
import experienceService from '~/services/experience.service'
import skillService from '~/services/skill.service'
import followService from '~/services/follow.service'
import { Home } from '~/enum/home'
import { STATUSFOLLOW } from '~/enum/follow'

const checkFollowUser = (req: Request, res: Response): number | null => {
  const followerId = req.session.user?.id
  if (!followerId) {
    req.flash('error', req.t('auth.userNotFound'))
    res.redirect('/auth/login')
    return null
  }
  return Number(followerId)
}

export const requestFollow = asyncHandler(async (req: Request, res: Response) => {
  const followerId = checkFollowUser(req, res)
  if (!followerId) return

  const { userName } = req.params

  const userToFollow = await userService.findUserByUserName(userName)
  if (!userToFollow) {
    req.flash('error', req.t('auth.userNotFound'))
    return
  }

  const result = await followService.requestFollow(Number(followerId), userToFollow.id)
  if (result.success) {
    req.flash('success', req.t('status.followRequestSent'))
  } else {
    req.flash('error', result.message)
  }
  res.redirect(`/guest/${userName}`)
})

export const acceptFollow = asyncHandler(async (req: Request, res: Response) => {
  const followingId = checkFollowUser(req, res)
  if (!followingId) return
  const followerId = Number(req.params.followerId)

  const result = await followService.acceptFollow(followerId, Number(followingId)) // hai tham số
  if (result.success) {
    req.flash('success', req.t('status.followRequestAccepted'))
  } else {
    req.flash('error', result.message)
  }
  res.redirect(`/notifications`)
})
export const rejectFollow = asyncHandler(async (req: Request, res: Response) => {
  const followingId = checkFollowUser(req, res)
  if (!followingId) return

  const followerId = Number(req.params.followerId)

  const result = await followService.rejectFollow(followerId, Number(followingId))
  if (result.success) {
    req.flash('success', req.t('status.followRequestRejected'))
  } else {
    req.flash('error', result.message)
  }
  res.redirect(`/notifications`)
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

  const followStatus = currentUserId
    ? await followService.checkFollowStatus(Number(currentUserId), user.id)
    : STATUSFOLLOW.NOT_FOLLOWING
  const followCount = await followService.getFollowCount(user.id)
  const activeTab = (req.query.activeTab as string) || Home.ABOUT
  const isFollowing = followStatus === STATUSFOLLOW.ACCEPTED
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
        yearsOfExperience: entry.yearsOfExperience,
        isHighlighted: entry.isHighlighted
      }))
    }
  } else if (activeTab === Home.BLOGS && followStatus === STATUSFOLLOW.ACCEPTED) {
    blogs = await blogService.getBlogsByUserId(user.id)
  } else if (activeTab === Home.PROJECTS && followStatus === STATUSFOLLOW.ACCEPTED) {
    projects = await projectService.getProjectsByUserId(user.id)
  }

  res.render('guest/index', {
    user,
    followStatus,
    followCount,
    isFollowing,
    experience,
    skills,
    blogs,
    projects,
    baseUrl: `/guest/${userName}`,
    activeTab,
    currentUser: req.session.user,
    STATUSFOLLOW
  })
})
