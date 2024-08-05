import { AppDataSource } from '~/config/data-source'
import Project from '~/entity/project.entity'
import User from '~/entity/user.entity'

class ProjectService {
  private projectRepository = AppDataSource.getRepository(Project)

  async getAllProjectByUserId(userId: number) {
    return this.projectRepository.find({ order: { name: 'ASC' }, where: { user: { id: userId } } })
  }

  async getAllProjectByUser(user: User) {
    return this.getAllProjectByUserId(user.id)
  }

  async addProject(project: Project) {
    return this.projectRepository.save(project)
  }
  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return this.projectRepository.find({ where: { user: { id: userId } } })
  }
}
const projectService = new ProjectService()
export default projectService
