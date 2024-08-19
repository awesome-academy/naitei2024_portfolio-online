import { AppDataSource } from '~/config/data-source'
import Comment from '~/entity/comment.entity'

class CommentService {
  private commentRepository = AppDataSource.getRepository(Comment)

  async getCommentById(commentId: number): Promise<Comment | null> {
    return this.commentRepository.findOne({ where: { id: commentId } })
  }

  async getCommentsByBlogId(blogId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { blogId },
      relations: ['user'],
      order: { createdAt: 'DESC' }
    })
  }

  async createComment(data: { userId: number; blogId: number; content: string }): Promise<Comment> {
    const newComment = this.commentRepository.create(data)
    return await newComment.save()
  }

  async deleteComment(commentId: number): Promise<boolean> {
    const result = await this.commentRepository.delete(commentId)
    return result.affected ? result.affected > 0 : false
  }

  async updateComment(commentId: number, content: string): Promise<Comment | null> {
    const comment = await this.commentRepository.findOne({ where: { id: commentId } })
    if (!comment) {
      return null
    }

    comment.content = content
    comment.updatedAt = new Date()
    return await comment.save()
  }
}

const commentService = new CommentService()
export default commentService
