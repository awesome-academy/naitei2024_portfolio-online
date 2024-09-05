import { AppDataSource } from '~/config/data-source'
import { clearDatabase } from './util'
import Blog from '~/entity/blog.entity'
import User from '~/entity/user.entity'
import { addBlog, mockBlogs, mockUser } from './mockdatas/blog.mockdata'
import blogService from '~/services/blog.service'

describe('Blog Service', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    await clearDatabase(User)
    await clearDatabase(Blog)
    const userRepository = AppDataSource.getRepository(User)
    const blogRepository = AppDataSource.getRepository(Blog)
    const user = new User(mockUser)
    const savedUser = await userRepository.save(user)
    mockBlogs.forEach((blog) => {
      blog.user = savedUser
    })
    addBlog.user = savedUser
    const blogs = mockBlogs.map((blog) => new Blog(blog))
    await blogRepository.save(blogs)
  })

  afterAll(async () => {
    await clearDatabase(Blog)
    await clearDatabase(User)
  })

  describe('Get Blog By Id', () => {
    it('should return blog with id 1', async () => {
      const blog = await blogService.getBlogById(1)
      expect(blog?.id).toBe(1)
    })
  })

  describe('Get Blogs By User Id', () => {
    it('should return all blogs with by User with userId 1', async () => {
      const blogs = await blogService.getBlogsByUserId(1)
      expect(blogs.length).toBe(2)
    })
  })

  describe('Add Blog', () => {
    it(`should save blog with title "${addBlog.title}"`, async () => {
      const blog = new Blog(addBlog)
      const addedBlog = await blogService.createBlog({
        userId: blog.user.id,
        title: blog.title,
        description: blog.description,
        content: blog.content,
        additionalImages: []
      })
      expect(addedBlog.title).toBe(addBlog.title)
    })
  })

  describe('Update Blog', () => {
    it('should update blog with id 1', async () => {
      const blog = await blogService.getBlogById(1)
      blog!.title = 'Blog 1 Updated'
      if (blog) {
        const updatedBlog = await blogService.updateBlog(
          {
            userId: blog.userId,
            title: blog.title,
            description: blog.description,
            content: blog.content,
            additionalImages: []
          },
          1
        )
        expect(updatedBlog.title).toBe('Blog 1 Updated')
      } else {
        throw new Error('Blog not found')
      }
    })
  })

  describe('Delete Blog', () => {
    it('should delete blog with id 1', async () => {
      const delete_blog = await blogService.getBlogById(1)
      await blogService.deleteBlog(delete_blog!)
      const blog = await blogService.getBlogById(1)
      expect(blog).toBeNull()
    })
  })
})
