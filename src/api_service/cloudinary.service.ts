import dotenv from 'dotenv'
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'
import sharp from 'sharp'

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
