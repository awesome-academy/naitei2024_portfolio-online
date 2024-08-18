import asyncHandler from 'express-async-handler'
import blogService from '~/services/blog.service'
import { NextFunction, Request, Response } from 'express'
import commentService from '~/services/comment.service'

export const createComment = asyncHandler(async (req, res) => {
  const userId = req.session.user?.id
  const blogId = parseInt(req.params.id)
  const { content } = req.body

  // xử lý tìm kiếm và check tồn tại blog trc khi comment
  const blog = await blogService.getBlogById(blogId)
  if (!blog) {
    req.flash('error', req.t('blog.notFound'))
    return res.redirect('/blog')
  }
  await commentService.createComment({
    userId: Number(userId),
    blogId,
    content
  })

  res.redirect(`/blog/${blogId}`)
})

export const deleteComment = asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.commentId)
  const blogId = parseInt(req.params.id)
  const userId = req.session.user?.id
  const comment = await commentService.getCommentById(commentId)
  // chỉ cho phép xóa comment của chính mình hoặc của blog của mình
  if (!comment || (comment.userId !== userId && comment.blog.userId !== userId)) {
    req.flash('error', req.t('comment.deleteFailed'))
    return res.redirect(`/blog/${blogId}`)
  }
  const deleted = await commentService.deleteComment(commentId)
  if (!deleted) {
    req.flash('error', req.t('comment.deleteFailed'))
  } else {
    req.flash('success', req.t('comment.deleteSuccess'))
  }
  res.redirect(`/blog/${blogId}`)
})

export const updateComment = asyncHandler(async (req, res) => {
  const userId = req.session.user?.id
  const blogId = parseInt(req.params.id)
  const commentId = parseInt(req.params.commentId)
  const { content } = req.body
  const comment = await commentService.getCommentById(commentId)
  // chỉ cho phép sửa comment của chính mình
  if (!comment || comment.userId !== userId) {
    req.flash('error', req.t('comment.editFailed'))
    return res.redirect(`/blog/${blogId}`)
  }

  await commentService.updateComment(commentId, content)
  req.flash('success', req.t('comment.editSuccess'))
  res.redirect(`/blog/${blogId}`)
})
