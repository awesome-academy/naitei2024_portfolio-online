import { AppDataSource } from '~/config/data-source'
import { Experience } from '~/entity/experience.entity'
import User from '~/entity/user.entity'

class ExperienceService {
  private experienceRepository = AppDataSource.getRepository(Experience)

  async getExperiencesByUserId(userId: number): Promise<Experience[]> {
    return this.experienceRepository.find({ where: { userId } })
  }
}
const experienceService = new ExperienceService()
export default experienceService
