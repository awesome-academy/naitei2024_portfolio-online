import { AppDataSource } from '~/config/data-source'
import User from '~/entity/user.entity'
import { hashPassword } from '~/utils/cryto'

class AuthService {
  private userRepository = AppDataSource.getRepository(User)
  async findUserByEmail(email: string): Promise<boolean> {
    const result = await this.userRepository.findOne({ where: { email } })
    return Boolean(result)
  }
  async register(fullname: string, password: string, email: string, username: string): Promise<User> {
    // kiểm tra email có tồn tại chưa
    const userExist = await this.findUserByEmail(email)
    if (userExist) {
      throw new Error('Email is already in use')
    }
    const user = new User()
    user.fullname = fullname
    user.email = email
    user.role = 'user'
    user.password = hashPassword(password)
    user.username = username
    return this.userRepository.save(user)
  }
}
const authService = new AuthService()
export default authService
