import { AppDataSource } from '~/config/data-source'
import User from '~/entity/user.entity'

class AuthService {
  private userRepository = AppDataSource.getRepository(User)
  async findUserByEmail(email: string): Promise<boolean> {
    const result = await this.userRepository.findOne({ where: { email } })
    return Boolean(result)
  }
  async register(username: string, fullname: string, email: string, password: string): Promise<User> {
    // kiểm tra email có tồn tại chưa
    const userExist = await this.findUserByEmail(email)
    console.log(userExist)
    if (userExist) {
      throw new Error('Email is already in use')
    }
    const user = new User()
    user.username = username
    user.fullname = fullname
    user.email = email
    user.role = 'user'
    user.password = password
    console.log(user)
    return this.userRepository.save(user)
  }
}
const authService = new AuthService()
export default authService
