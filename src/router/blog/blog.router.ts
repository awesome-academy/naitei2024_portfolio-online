import express from 'express'
import {
  createBlogPost,
  deleteBlog,
  getBlogUpdatePage,
  showBlogDetail,
  showBlogGet,
  showCreateBlog,
  updateBlogPosts
} from '~/controllers/blog.controller'
import { createComment, deleteComment, updateComment } from '~/controllers/comment.controller'
import upload from '~/middlewares/upload'
import checkUserAuthentication from '~/middlewares/userAuthentication.middlewave'
const router = express.Router()

router.get('/', checkUserAuthentication, showBlogGet)
router.get('/create', checkUserAuthentication, showCreateBlog)
router.post(
  '/create',
  checkUserAuthentication,
  upload.fields([
    { name: 'imageUrl', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 }
  ]),
  createBlogPost
)
router.get('/:id', checkUserAuthentication, showBlogDetail)

router.get('/update/:id', getBlogUpdatePage)
router.post(
  '/update',
  checkUserAuthentication,
  upload.fields([
    { name: 'imageUrl', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 }
  ]),
  updateBlogPosts
)

router.get('/delete/:id', checkUserAuthentication, deleteBlog)

router.post('/:id/comment', checkUserAuthentication, createComment)
router.post('/:id/comment/:commentId/delete', checkUserAuthentication, deleteComment)
router.post('/:id/comment/:commentId/update', checkUserAuthentication, updateComment)
export default router
