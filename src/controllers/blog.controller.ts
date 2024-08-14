import asyncHandler from 'express-async-handler'
import blogService from '~/services/blog.service'
import { NextFunction, Request, Response } from 'express'
import Blog from '~/entity/blog.entity'

async function getAndValidateBlog(req: Request, res: Response, blogId: number): Promise<Blog | null> {
  const blog = await blogService.getBlogById(blogId)
  if (!blog) {
    req.flash('error', req.t('blog.notFound'))
    res.redirect('/blog')
    return null
  }
  return blog
}

export const showBlogGet = asyncHandler(async (req, res) => {
  const userId = req.session.user?.id
  const blogs = await blogService.getBlogsByUserId(Number(userId))
  if (blogs.length === 0) {
    return res.redirect('/blog/create')
  }
  res.render('blog/index', { blogs })
})
export const showCreateBlog = asyncHandler(async (req, res) => {
  res.render('blog/create')
})

export const createBlogPost = asyncHandler(async (req, res) => {
  const userId = req.session.user?.id
  const { title, description, content } = req.body

  const files = req.files as {
    [fieldname: string]: Express.Multer.File[]
  }

  const imageUrl = files.imageUrl ? files.imageUrl[0] : undefined
  const additionalImages = files.additionalImages || []

  const newBlog = await blogService.createBlog({
    userId: Number(userId),
    title,
    description,
    content,
    imageUrl,
    additionalImages
  })

  res.redirect('/blog')
})

export const showBlogDetail = asyncHandler(async (req, res) => {
  const userId = req.session.user?.id
  const blogId = parseInt(req.params.id)
  const blog = await getAndValidateBlog(req, res, blogId)
  if (!blog) return
  res.render('blog/detail', { blog, userId })
})

export const getBlogUpdatePage = asyncHandler(async (req, res) => {
  const blogId = parseInt(req.params.id)
  const blog = await getAndValidateBlog(req, res, blogId)
  if (!blog) return
  res.render('blog/update', { blog })
})

export const updateBlogPosts = asyncHandler(async (req, res) => {
  const userId = req.session.user?.id
  const { id, title, description, content, currentImageUrl, currentAdditionalImages } = req.body
  const imageUrl = req.files && req.files.imageUrl ? req.files.imageUrl[0] : currentImageUrl

  const additionalImages =
    req.files && req.files.additionalImages ? req.files.additionalImages : JSON.parse(currentAdditionalImages || '[]')
  const updatedBlog = await blogService.updateBlog(
    {
      userId: Number(userId),
      title,
      description,
      content,
      imageUrl,
      additionalImages
    },
    Number(id)
  )
  if (!updatedBlog) {
    req.flash('error', req.t('blog.notFound'))
    return res.redirect('/blog')
  }
  res.redirect('/blog')
})

export const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = parseInt(req.params.id)
  const blog = await getAndValidateBlog(req, res, blogId)
  if (!blog) return
  const deletedBlog = await blogService.deleteBlog(blog)
  if (!deletedBlog) {
    req.flash('error', req.t('status.deleteFail'))
  }
  req.flash('success', req.t('status.deleteSuccess'))
  res.redirect('/blog')
})
