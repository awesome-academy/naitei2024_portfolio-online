import { AppDataSource } from '~/config/data-source'
import { Follow } from '~/entity/follow.entity'
import { FOLLOW } from '~/enum/follow'

class FollowService {
  private followRepository = AppDataSource.getRepository(Follow)

  async followUser(followerId: number, followingId: number): Promise<{ success: boolean; message: string }> {
    if (followerId === followingId) {
      return { success: false, message: FOLLOW.CANNOTFOLLOW }
    }

    const existingFollow = await Follow.findOne({ where: { followerId, followingId } })
    if (existingFollow) {
      return { success: false, message: FOLLOW.ALREADYFOLLOW }
    }

    const follow = this.followRepository.create({ followerId, followingId })
    await this.followRepository.save(follow)
    return { success: true, message: FOLLOW.SUCCESSFULLYFOLLOW }
  }

  async unfollowUser(followerId: number, followingId: number): Promise<{ success: boolean; message: string }> {
    const follow = await Follow.findOne({ where: { followerId, followingId } })
    if (!follow) {
      return { success: false, message: FOLLOW.NOTFOLLOW }
    }

    await this.followRepository.remove(follow)
    return { success: true, message: FOLLOW.SUCCESSFULLYUNFOLLOW }
  }

  async getFollowStats(userId: number): Promise<{ followersCount: number; followingCount: number }> {
    const followersCount = await Follow.count({ where: { followingId: userId } })
    const followingCount = await Follow.count({ where: { followerId: userId } })

    return { followersCount, followingCount }
  }

  async checkFollowStatus(followerId: number, followingId: number): Promise<boolean> {
    const follow = await Follow.findOne({ where: { followerId, followingId } })
    return !!follow
  }
}

const followService = new FollowService()
export default followService
