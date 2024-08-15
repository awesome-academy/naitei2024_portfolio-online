import { AppDataSource } from '~/config/data-source'
import Project from '~/entity/project.entity'
import User from '~/entity/user.entity'

class ProjectService {
  private projectRepository = AppDataSource.getRepository(Project)

  async getProjectById(projectId: number) {
    return this.projectRepository.findOne({ where: { id: projectId } })
  }

  async getAllProjectByUserId(userId: number) {
    return this.projectRepository.find({ order: { name: 'ASC' }, where: { user: { id: userId } } })
  }

  async getAllProjectByUser(user: User) {
    return this.getAllProjectByUserId(user.id)
  }

  async saveProject(project: Project) {
    if (project.id) {
      const result = await this.projectRepository.update(project.id, project)
      return project
    }
    return this.projectRepository.save(project)
  }
  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return this.projectRepository.find({ where: { user: { id: userId } } })
  }
  async deleteProject(projectId: number) {
    return this.projectRepository.delete(projectId)
  }
}
const projectService = new ProjectService()
export default projectService
