import { AppDataSource } from "~/config/data-source"
import { clearDatabase } from "./util"
import User from "~/entity/user.entity"
import Blog from "~/entity/blog.entity"
import { mockUser, mockBlog, mockComments, addComment } from "./mockdatas/comment.mockdata"
import Comment from "~/entity/comment.entity"
import commentService from "~/services/comment.service"

describe('Comment Service', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    await clearDatabase(User)
    await clearDatabase(Blog)
    await clearDatabase(Comment)
    const userRepository = AppDataSource.getRepository(User)
    const blogRepository = AppDataSource.getRepository(Blog)
    const commentRepository = AppDataSource.getRepository(Comment)
    const user = new User(mockUser)
    const savedUser = await userRepository.save(user)
    mockBlog.user = savedUser
    const savedBlog = await blogRepository.save(new Blog(mockBlog))
    mockComments.forEach((comment) => {
      comment.user = savedUser
      comment.blog = savedBlog
    })
    addComment.blog = savedBlog
    addComment.user = savedUser
    const comments = mockComments.map((comment) => new Comment(comment))
    await commentRepository.save(comments)
  })

  afterAll(async () => {
    await clearDatabase(Comment)
    await clearDatabase(Blog)
    await clearDatabase(User)
  })

  describe('Get Comment By Id', () => {
    it('should return comment with id 1', async () => {
      const comment = await commentService.getCommentById(1)
      expect(comment?.id).toBe(1)
    })
  })

  describe('Get Comments By Blog Id', () => {
    it('should return all comments with by Blog with blogId 1', async () => {
      const comments = await commentService.getCommentsByBlogId(1)
      expect(comments.length).toBe(2)
    })
  })

  describe('Add Comment', () => {
    it(`should save comment with content "${addComment.content}"`, async () => {
      const comment = new Comment(addComment)
      const addedComment = await commentService.createComment({
        userId: comment.user.id,
        blogId: comment.blog.id,
        content: comment.content
      })
      expect(addedComment.content).toBe(addComment.content)
    })
  })

  describe('Update Comment', () => {
    it('should update comment with id 1', async () => {
      const comment = await commentService.getCommentById(1)
      comment!.content = 'Comment 1 Updated'
      if (comment) {
        const updatedComment = await commentService.updateComment(comment.id, comment.content)
        expect(updatedComment?.content).toBe('Comment 1 Updated')
      }
    })
  })
})
