import { AppDataSource } from '~/config/data-source'
import User from '~/entity/user.entity'
import { mockUsers, addUser } from './mockdatas/user.mockdata'
import userService from '~/services/user.service'
import { clearDatabase } from './util'

describe('User Service', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    await clearDatabase(User)
    const userRepository = AppDataSource.getRepository(User)
    const users = mockUsers.map((user) => new User(user))
    await userRepository.save(users)
  })

  afterAll(async () => {
    await clearDatabase(User)
  })

  describe('Get All Users', () => {
    it('should return all users', async () => {
      const users = await userService.getAllUsers()
      expect(users.length).toBe(mockUsers.length)
    })
  })

  describe('Find User By Id', () => {
    it('should return user with id 1', async () => {
      const user = await userService.findUserById(1)
      expect(user?.id).toBe(1)
    })
  })

  describe('Find User By UserName', () => {
    it('should return user with userName "JohnDoe"', async () => {
      const user = await userService.findUserByUserName('JohnDoe')
      expect(user?.userName).toBe('JohnDoe')
    })
  })

  describe('Add User', () => {
    it(`should save user with userName "${addUser.userName}"`, async () => {
      const user = new User(addUser)
      const addedUser = await userService.saveUser(user)
      expect(addedUser.userName).toBe(addUser.userName)
    })
  })

  describe('Update User', () => {
    it('should update user with id 1', async () => {
      const user = await userService.findUserById(1)
      if (user) {
        user.userName = 'Dang'
        const updatedUser = await userService.saveUser(user)
        expect(updatedUser.userName).toBe('Dang')
      } else {
        throw new Error('User not found')
      }
    })
  })
})
