import { AppDataSource } from '~/config/data-source'
import Skill from '~/entity/skill.entity'
import User from '~/entity/user.entity'

class SkillService {
  private skillRepository = AppDataSource.getRepository(Skill)

  async getSkillsByUserId(userId: number): Promise<Skill[]> {
    return this.skillRepository.find({ where: { userId } })
  }
}
const skillService = new SkillService()
export default skillService
