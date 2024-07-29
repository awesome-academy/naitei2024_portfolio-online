import { AppDataSource } from '~/config/data-source'
import User from '~/entity/user.entity'
import { comparePassword, hashPassword } from '~/utils/cryto'

class AuthService {
  private userRepository = AppDataSource.getRepository(User)
  async findUserByEmail(email: string): Promise<boolean> {
    const result = await this.userRepository.findOne({ where: { email } })
    return Boolean(result)
  }
  async register(fullname: string, password: string, email: string, username: string): Promise<User | null> {
    const userExist = await this.findUserByEmail(email)
    console.log(userExist)
    if (userExist) {
      return null
    }
    const user = new User()
    user.fullname = fullname
    user.email = email
    user.role = 'user'
    user.password = hashPassword(password)
    user.username = username
    return this.userRepository.save(user)
  }
  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } })
    console.log(user)
    if (!user) {
      return null
    }
    if (!comparePassword(password, user.password)) {
      return null
    }
    return user
  }
}
const authService = new AuthService()
export default authService
