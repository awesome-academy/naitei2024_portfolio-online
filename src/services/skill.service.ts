import { AppDataSource } from '~/config/data-source'
import Skill from '~/entity/skill.entity'

class SkillService {
  private skillRepository = AppDataSource.getRepository(Skill)

  async getSkillsByUserId(userId: number): Promise<Skill[]> {
    return this.skillRepository.find({ where: { userId } })
  }
  async deleteSkillByUserId(userId: number): Promise<void> {
    await this.skillRepository.delete({ userId })
  }
  async deleteSkills(skills: Skill[]): Promise<void> {
    if (skills.length > 0) {
      await this.skillRepository.remove(skills)
    }
  }
  async saveSkills(skills: Partial<Skill>[]): Promise<Skill[]> {
    return this.skillRepository.save(skills)
  }
  async updateSkills(userId: number, skillsData: any[]) {
    const existingSkills = await skillService.getSkillsByUserId(userId)
    const updatedSkillsMap = new Map()

    const updatedSkills = skillsData.map((skill) => {
      const existingSkill = existingSkills.find((s) => s.id === skill.id)
      const isHighlighted = skill.isHighlighted === 'on' ? true : false
      if (existingSkill) {
        // Cập nhật skill hiện có
        Object.assign(existingSkill, {
          name: Array.isArray(skill.name) ? skill.name[0] : skill.name,
          yearsOfExperience: Array.isArray(skill.yearsOfExperience)
            ? skill.yearsOfExperience[0]
            : skill.yearsOfExperience,
          isHighlighted
        })
        updatedSkillsMap.set(existingSkill.id, true)
        return existingSkill
      } else {
        // Tạo skill mới
        return {
          userId,
          name: Array.isArray(skill.name) ? skill.name[0] : skill.name,
          yearsOfExperience: Array.isArray(skill.yearsOfExperience)
            ? skill.yearsOfExperience[0]
            : skill.yearsOfExperience,
          isHighlighted
        }
      }
    })

    // Xóa các skills không còn trong danh sách cập nhật
    const skillsToDelete = existingSkills.filter((skill) => !updatedSkillsMap.has(skill.id))
    await skillService.deleteSkills(skillsToDelete)

    // Lưu các skills đã cập nhật và mới
    await skillService.saveSkills(updatedSkills)
  }
  async deleteSkillByIds(id: number, userId: number): Promise<void> {
    await this.skillRepository.delete({ id, userId })
  }
}
const skillService = new SkillService()
export default skillService
