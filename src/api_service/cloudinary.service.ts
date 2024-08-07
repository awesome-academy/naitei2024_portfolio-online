import dotenv from 'dotenv'
import multer, { Multer } from 'multer'
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
import sharp from 'sharp'
import { NextFunction, Request, Response } from 'express'
import { CLOUDINARY_NUM } from '~/constants/cloudinary.constant'
import { CloudinaryFile } from '~/types/cloudinary.type'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const createUploadPromise: (buffer: Buffer, folder: string) => Promise<UploadApiResponse> = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: folder
      },
      (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (err) {
          return reject(err)
        }
        if (!result) {
          return reject(new Error('Cloudinary upload result is undefined'))
        }
        return resolve(result)
      }
    )
    uploadStream.end(buffer)
  })
}

export async function uploadFile(file: Express.Multer.File | undefined, folder: string = 'misc') {
  if (!file) {
    throw new Error('No file provided')
  }
  const resizedBuffer = await sharp(file.buffer).resize({ width: 800, height: 600 }).toBuffer()
  const promise = createUploadPromise(resizedBuffer, folder)
  const result = await promise
  return result.secure_url
}

// const storage = multer.memoryStorage()


// export const upload: Multer = multer({
//   storage: storage,
//   limits: { fileSize: CLOUDINARY_NUM.MAX_FILE_SIZE },
//   fileFilter: (req, file, cb) => {
//     if (file.size > CLOUDINARY_NUM.MAX_FILE_SIZE) {
//       return cb(null, false)
//     }
//     cb(null, true)
//   }
// })

// export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const files: CloudinaryFile[] = req.files as CloudinaryFile[]
//     if (!files || files.length === 0) {
//       return next(new Error('No files provided'))
//     }
//     const cloudinaryUrls: string[] = []
//     for (const file of files) {
//       const resizedBuffer: Buffer = await sharp(file.buffer).resize({ width: 800, height: 600 }).toBuffer()

//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: 'auto',
//           folder: 'your-cloudinary-folder-name'
//         } as any,
//         (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
//           if (err) {
//             return next(err)
//           }
//           if (!result) {
//             return next(new Error('Cloudinary upload result is undefined'))
//           }
//           cloudinaryUrls.push(result.secure_url)

//           if (cloudinaryUrls.length === files.length) {
//             req.body.cloudinaryUrls = cloudinaryUrls
//             next()
//           }
//         }
//       )
//       uploadStream.end(resizedBuffer)
//     }
//   } catch (error) {
//     return next(error)
//   }
// }
