import cloudinary from '~/config/cloudinary'
import { AppDataSource } from '~/config/data-source'
import Blog from '~/entity/blog.entity'

interface CreateBlogData {
  userId: number
  title: string
  description: string
  content: string
  imageUrl?: Express.Multer.File
  additionalImages: Express.Multer.File[]
}

class BlogService {
  private blogRepository = AppDataSource.getRepository(Blog)

  async getBlogsByUserId(userId: number): Promise<Blog[]> {
    return this.blogRepository.find({ where: { userId } })
  }

  async getBlogById(blogId: number): Promise<Blog | null> {
    return this.blogRepository.findOne({ where: { id: blogId } })
  }

  async createBlog(data: CreateBlogData): Promise<any> {
    const { userId, title, description, content, imageUrl, additionalImages } = data

    const mainImageUrl = imageUrl ? await this.uploadImage(imageUrl) : ''

    const additionalImageUrls = []
    for (const file of additionalImages) {
      const url = await this.uploadImage(file)
      additionalImageUrls.push(url)
    }

    const newBlog = this.blogRepository.create({
      userId,
      title,
      description,
      content,
      imageUrl: mainImageUrl,
      additionalImages: additionalImageUrls
    })

    return await newBlog.save()
  }

  async updateBlog(data: CreateBlogData, blogId: number): Promise<any> {
    const { userId, title, description, content, imageUrl, additionalImages } = data

    const blog = await this.getBlogById(blogId)
    if (!blog) {
      return null
    }

    blog.title = title
    blog.description = description
    blog.content = content

    if (imageUrl) {
      blog.imageUrl = await this.uploadImage(imageUrl)
    }

    if (additionalImages && additionalImages.length > 0) {
      const additionalImageUrls = []
      for (const file of additionalImages) {
        const url = await this.uploadImage(file)
        additionalImageUrls.push(url)
      }
      blog.additionalImages = additionalImageUrls
    } else {
      blog.additionalImages = Array.isArray(blog.additionalImages) ? blog.additionalImages : []
    }
    return await blog.save()
  }

  private async uploadImage(file: Express.Multer.File): Promise<string> {
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const result = await cloudinary.uploader.upload(base64Image)
    return result.secure_url
  }

  async deleteBlog(blog: Blog): Promise<boolean> {
    await this.blogRepository.remove(blog)
    return true
  }
}

const blogService = new BlogService()
export default blogService
