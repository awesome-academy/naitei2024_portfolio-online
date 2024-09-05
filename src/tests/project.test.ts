import { AppDataSource } from '~/config/data-source'
import { clearDatabase } from './util'
import Project from '~/entity/project.entity'
import { addProject, mockProjects, mockUser } from './mockdatas/project.mockdata'
import User from '~/entity/user.entity'
import projectService from '~/services/project.service'

describe('Project Service', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    await clearDatabase(User)
    await clearDatabase(Project)
    const userRepository = AppDataSource.getRepository(User)
    const projectRepository = AppDataSource.getRepository(Project)
    const user = new User(mockUser)
    const savedUser = await userRepository.save(user)
    mockProjects.forEach((project) => {
      project.user = savedUser
    })
    const projects = mockProjects.map((project) => new Project(project))
    await projectRepository.save(projects)
  })

  afterAll(async () => {
    await clearDatabase(Project)
    await clearDatabase(User)
  })

  describe('Get Project By Id', () => {
    it('should return project with id 1', async () => {
      const project = await projectService.getProjectById(1)
      expect(project?.id).toBe(1)
    })
  })

  describe('Get Projects By User Id', () => {
    it('should return all projects with by User with userId 1', async () => {
      const projects = await projectService.getProjectsByUserId(1)
      expect(projects.length).toBe(2)
    })
  })

  describe('Get All Projects By User', () => {
    it('should return all projects with by User with userId 1', async () => {
      const user = new User(mockUser)
      const projects = await projectService.getAllProjectByUser(user)
      expect(projects.length).toBe(2)
    })
  })

  describe('Add Project', () => {
    it(`should save project with name "${addProject.name}"`, async () => {
      const project = new Project(addProject)
      const addedProject = await projectService.saveProject(project)
      expect(addedProject.name).toBe(addProject.name)
    })
  })

  describe('Update Project', () => {
    it('should update project with id 1', async () => {
      const project = await projectService.getProjectById(1)
      if (project) {
        project.name = 'Project 1 Updated'
        const updatedProject = await projectService.saveProject(project)
        expect(updatedProject.name).toBe('Project 1 Updated')
      } else {
        throw new Error('Project not found')
      }
    })
  })

  describe('Delete Project', () => {
    it('should delete project with id 1', async () => {
      await projectService.deleteProject(1)
      const project = await projectService.getProjectById(1)
      expect(project).toBeNull()
    })
  })
})
