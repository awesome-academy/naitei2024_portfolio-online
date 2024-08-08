import { AppDataSource } from '~/config/data-source'
import SocialLink from '~/entity/social_link.entity'
import User from '~/entity/user.entity'
import { Socials } from '~/enum/socials'

class SocialLinkService {
  private socialLinkRepository = AppDataSource.getRepository(SocialLink)
  async updateSocialLinks(userId: number, socialLinksData: any) {
    const { urlGit, urlFb, urlTw } = socialLinksData

    const socialLinks = [
      { platform: Socials.GITHUB, url: urlGit },
      { platform: Socials.FACEBOOK, url: urlFb },
      { platform: Socials.TWITTER, url: urlTw }
    ]

    for (const link of socialLinks) {
      if (link.url) {
        let socialLink = await this.socialLinkRepository.findOne({ where: { user: { id: userId }, url: link.url } })

        if (!socialLink) {
          socialLink = new SocialLink()
          socialLink.user = { id: userId } as User
        }

        socialLink.url = link.url
        await this.socialLinkRepository.save(socialLink)
      }
    }
  }
}
const socialLinkService = new SocialLinkService()
export default socialLinkService
