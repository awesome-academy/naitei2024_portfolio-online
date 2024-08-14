import { AppDataSource } from '~/config/data-source'
import User from '~/entity/user.entity'

class UserService {
  private userRepository = AppDataSource.getRepository(User)

  async findUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }, relations: ['socialLinks'] })
  }
  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user)
  }
  async findUserByUserName(userName: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { userName } })
  }
}
const userService = new UserService()
export default userService
