import userService from './user.service'
import experienceService from './experience.service'
import skillService from './skill.service'
import cloudinary from '~/config/cloudinary'
import socialLinkService from './socialLink.service'

class AboutService {
  async updateUserInfo(userId: number, userData: any, file?: Express.Multer.File) {
    const user = await userService.findUserById(userId)
    if (!user) throw new Error('User not found')

    // Update user information
    user.title = userData.title
    user.description = userData.description
    user.hobbies = userData.hobbies

    // Upload image if provided
    if (file) {
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      const result = await cloudinary.uploader.upload(base64Image)
      user.imageUrl = result.secure_url
    }

    await userService.saveUser(user)

    // Update social links
    await socialLinkService.updateSocialLinks(userId, userData.socialLinks)

    // Update experiences
    await experienceService.updateExperiences(userId, userData.experience)

    // Update skills
    await skillService.updateSkills(userId, userData.skills)

    return user
  }
}

const aboutService = new AboutService()
export default aboutService
