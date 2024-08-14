import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import upload from '~/middlewares/upload'

const dynamicFieldUpload = (req: Request, res: Response, next: NextFunction) => {
  const fields: multer.Field[] = []

  if (req.body.blogs) {
    const blogs = JSON.parse(req.body.blogs)
    blogs.forEach((blog: any, index: number) => {
      fields.push(
        { name: `blogs[${index}][imageUrl]`, maxCount: 1 },
        { name: `blogs[${index}][additionalImages][]`, maxCount: 10 }
      )
    })
  }

  const dynamicUpload = upload.fields(fields)
  dynamicUpload(req, res, next)
}

export default dynamicFieldUpload
