import { AppDataSource } from '~/config/data-source'
import SkillDefine from '~/entity/skillDefine.entity'

class SkillDefineService {
  private skillDefineRepository = AppDataSource.getRepository(SkillDefine)

  async getSkillDefines(): Promise<SkillDefine[]> {
    return this.skillDefineRepository.find()
  }
}

const skillDefineService = new SkillDefineService()
export default skillDefineService
