import { NextFunction, Request, Response } from 'express'
import projectService from '~/services/project.service'
import userService from '~/services/user.service'
import asyncHandler from 'express-async-handler'
import { formatExperiencePeriod } from '~/utils/dateUtils'
import Project from '~/entity/project.entity'
import { CloudinaryFile } from '~/types/cloudinary.type'
import sharp from 'sharp'
import { uploadFile } from '~/api_service/cloudinary.service'


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

export const showProject = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.session.user)
  const userId = req.session.user?.id
  if (!checkUserAuthentication(req, res)) {
    return
  }
  try {
    const user = await userService.findUserById(Number(userId))
    if (!user) {
      return handleUserNotFound(req, res)
    }
    const projects = await projectService.getAllProjectByUserId(user.id)
    if (projects.length === 0) {
      req.flash('info', req.t('projects.noDataFound'))
      return res.redirect('project/create')
    }
    res.render('project', { projects, user })
  } catch (error) {
    req.flash('error', req.t('projects.serverError'))
    return res.redirect('/')
  }
})

export const showProjectForm = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.session.user?.id
  if (!userId) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }
  const user = await userService.findUserById(Number(userId))
  if (!user) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }
  const projectId = req.params.id
  let project: Project | null = null

  if (projectId) {
    project = await projectService.getProjectById(Number(projectId))
    if (!project) {
      req.flash('error', req.t('projects.projectNotFound'))
      return res.redirect('/project')
    }
  }
  console.log(project)
  res.render('project/form', { user, project })
})

export const postSaveProject = asyncHandler(async (req: Request, res: Response) => { 
  const userId = req.session.user?.id
  if (!userId) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }
  const user = await userService.findUserById(Number(userId))
  if (!user) {
    req.flash('error', req.t('auth.userNotFound'))
    return res.redirect('/auth/login')
  }

  console.log(req.file)
  console.log(req.body)

  const project = req.body
  project.user = user
  await projectService.saveProject(project)
  req.flash('success', req.t('projects.createSuccess'))
  res.redirect('/project')
})

export const uploadProjectImage = asyncHandler(async (req: Request, res: Response) => {
  const file: CloudinaryFile = req.file as CloudinaryFile
  const imageUrl = await uploadFile(file)
  const project = await projectService.getProjectById(Number(req.body.id))
  if (!project) {
    req.flash('error', req.t('projects.projectNotFound'))
    return res.redirect('/project')
  }

  project.imageUrl = imageUrl
  await projectService.saveProject(project)
  return res.redirect('/project')
})
