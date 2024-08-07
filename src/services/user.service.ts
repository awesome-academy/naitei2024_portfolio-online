import { AppDataSource } from '~/config/data-source'
import Project from '~/entity/project.entity'
import User from '~/entity/user.entity'

class UserService {
  private userRepository = AppDataSource.getRepository(User)

  async findUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }, relations: ['socialLinks'] })
  }

  async addProjectToUser(user: User, project: Project) {
    project.user = user
    user.projects.push(project)
    await this.userRepository.save(user)
    await project.save()
  }
}
const userService = new UserService()
export default userService
