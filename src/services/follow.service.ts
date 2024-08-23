import { AppDataSource } from '~/config/data-source'
import { Follow } from '~/entity/follow.entity'
import { FOLLOW, STATUSFOLLOW } from '~/enum/follow'

class FollowService {
  private followRepository = AppDataSource.getRepository(Follow)

  async requestFollow(followerId: number, followingId: number): Promise<{ success: boolean; message: string }> {
    if (followerId === followingId) {
      return { success: false, message: FOLLOW.CANNOTFOLLOW }
    }

    const existingFollow = await Follow.findOne({ where: { followerId, followingId } })
    if (existingFollow) {
      if (existingFollow.isAccepted) {
        return { success: false, message: FOLLOW.ALREADYFOLLOW }
      } else {
        return { success: false, message: FOLLOW.ALREADYREQUESTED }
      }
    }

    const follow = this.followRepository.create({ followerId, followingId, isAccepted: false })
    await this.followRepository.save(follow)
    return { success: true, message: FOLLOW.REQUESTSENT }
  }

  async acceptFollow(followerId: number, followingId: number): Promise<{ success: boolean; message: string }> {
    const follow = await Follow.findOne({ where: { followerId, followingId } })
    if (!follow) {
      return { success: false, message: FOLLOW.NOREQUEST }
    }

    follow.isAccepted = true
    await this.followRepository.save(follow)
    return { success: true, message: FOLLOW.ACCEPTEDSUCCESS }
  }

  async rejectFollow(followerId: number, followingId: number): Promise<{ success: boolean; message: string }> {
    const follow = await Follow.findOne({ where: { followerId, followingId } })
    if (!follow) {
      return { success: false, message: FOLLOW.NOREQUEST }
    }

    await this.followRepository.remove(follow)
    return { success: true, message: FOLLOW.REJECTEDSUCCESS }
  }

  async unfollowUser(followerId: number, followingId: number): Promise<{ success: boolean; message: string }> {
    const follow = await Follow.findOne({ where: { followerId, followingId } })
    if (!follow) {
      return { success: false, message: FOLLOW.NOTFOLLOW }
    }

    await this.followRepository.remove(follow)
    return { success: true, message: FOLLOW.SUCCESSFULLYUNFOLLOW }
  }

  async getFollowCount(userId: number): Promise<{ followersCount: number; followingCount: number }> {
    const followersCount = await Follow.count({
      where: {
        followingId: userId,
        isAccepted: true
      }
    })

    const followingCount = await Follow.count({
      where: {
        followerId: userId,
        isAccepted: true
      }
    })

    return { followersCount, followingCount }
  }

  async checkFollowStatus(followerId: number, followingId: number): Promise<string> {
    const follow = await Follow.findOne({ where: { followerId, followingId } })

    if (!follow) {
      return STATUSFOLLOW.NOT_FOLLOWING
    }

    return follow.isAccepted ? STATUSFOLLOW.ACCEPTED : STATUSFOLLOW.PENDING
  }

  async getPendingFollowRequests(userId: number): Promise<Follow[]> {
    return await Follow.find({
      where: {
        followingId: userId,
        isAccepted: false
      },
      relations: ['follower']
    })
  }
  async getNotificationCount(userId: number): Promise<number> {
    return await Follow.count({
      where: {
        followingId: userId,
        isAccepted: false
      }
    })
  }
}

const followService = new FollowService()
export default followService
