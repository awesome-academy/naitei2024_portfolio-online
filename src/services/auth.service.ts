import { t } from 'i18next'
import { AppDataSource } from '~/config/data-source'
import { LoginDto } from '~/dtos/Login.dto'
import { RegisterDto } from '~/dtos/Register.dto'
import User from '~/entity/user.entity'
import { RegisterError, Role } from '~/enum/role'
import { LoginError } from '~/enum/role'
import { comparePassword, hashPassword } from '~/utils/cryto'

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
      emailVerified: false,
      password: hashPassword(password),
      userName: username
    })

    await this.userRepository.save(user)

    return { success: true }
  }
  async login(loginDto: LoginDto): Promise<{ user: User | null; error: string | null }> {
    const { email, password } = loginDto
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user || !comparePassword(password, user.password)) {
      return { user: null, error: LoginError.EMAILNOTEXISTORPASSWORDINCORRECT }
    }
    return { user, error: null }
  }

  async changePassword(id: number, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      await this.userRepository.update(id, { password: hashPassword(password) })
    } catch (e) {
      return { success: false, error: t('auth.changePasswordFailed') }
    }
    return { success: true }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email })
    if (!user) {
      return null
    }
    return user
  }
}
const authService = new AuthService()
export default authService
