import { Request } from 'express'
export const translate =
  (key: string) =>
  (value: any, { req }: { req: Request }) =>
    req.t(key)
