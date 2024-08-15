import { NextFunction, Request, Response } from 'express'
import projectService from '~/services/project.service'
import userService from '~/services/user.service'
import asyncHandler from 'express-async-handler'
import { formatExperiencePeriod } from '~/utils/dateUtils'
import Project from '~/entity/project.entity'
import { CloudinaryFile } from '~/types/cloudinary.type'
import { uploadFile } from '~/api_service/cloudinary.service'

export const showProject = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.session.user?.id
  try {
    const user = await userService.findUserById(Number(userId))
    const projects = await projectService.getAllProjectByUserId(Number(userId))
    if (projects.length === 0) {
      req.flash('info', req.t('project.noDataFound'))
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
  const user = await userService.findUserById(Number(userId))
  const projectId = req.params.id
  let project: Project | null = new Project()

  if (projectId) {
    project = await projectService.getProjectById(Number(projectId))
    if (!project) {
      req.flash('error', req.t('projects.projectNotFound'))
      return res.redirect('/project')
    }
  }
  res.render('project/form', { user, project })
})

export const postSaveProject = asyncHandler(async (req: Request, res: Response) => { 
  const userId = req.session.user?.id
  const user = await userService.findUserById(Number(userId))
  const project = req.body
  if (!project.id) {
    project.id = null
  }
  project.user = user
  const savedProject = await projectService.saveProject(project)
  if (!savedProject) {
    req.flash('error', req.t('projects.saveError'))
    return res.redirect('/project')
  }
  const file: CloudinaryFile = req.file as CloudinaryFile
  if (file) {
    const imageUrl = await uploadFile(file)
    savedProject.imageUrl = imageUrl
    await projectService.saveProject(savedProject)
  }
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

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.id
  await projectService.deleteProject(Number(projectId))
  req.flash('success', req.t('project.deleteSuccess'))
  res.redirect('/project')
})
