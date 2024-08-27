import { AppDataSource } from '~/config/data-source'
import { SQL_LiMIT } from '~/constants/validator.constant'
import User from '~/entity/user.entity'

class SearchService {
  private userRepository = AppDataSource.getRepository(User)

  async searchUser(searchTerm: string): Promise<User[]> {
    return User.createQueryBuilder('user')
      .where('user.fullName LIKE :query OR user.userName LIKE :query', { query: `%${searchTerm}%` })
      .limit(SQL_LiMIT.MIN)
      .getMany()
  }
}

const searchService = new SearchService()
export default searchService
