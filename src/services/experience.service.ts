import { AppDataSource } from '~/config/data-source'
import { Experience } from '~/entity/experience.entity'

function getFirstElementOrValue<T>(value: T | T[]): T {
  return Array.isArray(value) ? value[0] : value
}

class ExperienceService {
  private experienceRepository = AppDataSource.getRepository(Experience)

  async getExperiencesByUserId(userId: number): Promise<Experience[]> {
    return this.experienceRepository.find({ where: { userId } })
  }
  async deleteExperienceByUserId(userId: number): Promise<void> {
    await this.experienceRepository.delete({ userId })
  }
  async deleteExperiences(experiences: Experience[]): Promise<void> {
    if (experiences.length > 0) {
      await this.experienceRepository.remove(experiences)
    }
  }
  async saveExperiences(experiences: Partial<Experience>[]): Promise<Experience[]> {
    return this.experienceRepository.save(experiences)
  }
  async updateExperiences(userId: number, experiencesData: any[]) {
    const existingExperiences = await experienceService.getExperiencesByUserId(userId)
    const updatedExperiencesMap = new Map()

    const updatedExperiences = experiencesData.map((exp) => {
      const existingExp = existingExperiences.find((e) => e.id === exp.id)
      if (existingExp) {
        // Cập nhật experience hiện có
        Object.assign(existingExp, {
          company: getFirstElementOrValue(exp.company),
          title: getFirstElementOrValue(exp.title),
          location: getFirstElementOrValue(exp.location),
          startDate: getFirstElementOrValue(exp.startDate),
          endDate: getFirstElementOrValue(exp.endDate),
          description: getFirstElementOrValue(exp.description)
        })
        updatedExperiencesMap.set(existingExp.id, true)
        return existingExp
      } else {
        // Tạo experience mới
        return {
          userId,
          company: getFirstElementOrValue(exp.company),
          title: getFirstElementOrValue(exp.title),
          location: getFirstElementOrValue(exp.location),
          startDate: getFirstElementOrValue(exp.startDate),
          endDate: getFirstElementOrValue(exp.endDate),
          description: getFirstElementOrValue(exp.description)
        }
      }
    })

    // Xóa các experiences không còn trong danh sách cập nhật
    const experiencesToDelete = existingExperiences.filter((exp) => !updatedExperiencesMap.has(exp.id))
    await experienceService.deleteExperiences(experiencesToDelete)

    // Lưu các experiences đã cập nhật và mới
    await experienceService.saveExperiences(updatedExperiences)
  }
  async deleteExperienceByIds(id: number, userId: number): Promise<void> {
    await this.experienceRepository.delete({ id, userId })
  }
}
const experienceService = new ExperienceService()
export default experienceService
