export interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer
}
