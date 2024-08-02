import { AppDataSource } from '~/config/data-source'
import { RegisterDto } from '~/dtos/Register.dto'
import User from '~/entity/user.entity'
import { RegisterError, Role } from '~/enum/role'
import { hashPassword } from '~/utils/cryto'

class AuthService {
  private userRepository = AppDataSource.getRepository(User)
  async findUserByEmail(email: string): Promise<boolean> {
    const result = await this.userRepository.findOne({ where: { email } })
    return Boolean(result)
  }

  async findUserByUsername(userName: string): Promise<boolean> {
    const result = await this.userRepository.findOne({ where: { userName } })
    return Boolean(result)
  }

  async register(userDto: RegisterDto): Promise<{ success: boolean; error?: string }> {
    const { email, password, fullname, username } = userDto
    const userExistByEmail = await this.findUserByEmail(email)
    if (userExistByEmail) {
      return { success: false, error: RegisterError.EMAILEXIST }
    }

    const userExistByUsername = await this.findUserByUsername(username)
    if (userExistByUsername) {
      return { success: false, error: RegisterError.USERNAMEEXIST }
    }
    const user = this.userRepository.create({
      fullName: fullname,
      email,
      role: Role.USER,
      password: hashPassword(password),
      userName: username
    })

    await this.userRepository.save(user)

    return { success: true }
  }
}
const authService = new AuthService()
export default authService
