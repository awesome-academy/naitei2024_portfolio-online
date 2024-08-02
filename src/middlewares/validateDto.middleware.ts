import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { Request, Response, NextFunction } from 'express'

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body)
    const errors = await validate(dtoObj)

    if (errors.length > 0) {
      const formattedErrors = errors.map((error: ValidationError) => ({
        field: error.property,
        msg: Object.values(error.constraints!)[0]
      }))

      req.validationErrors = formattedErrors
      return next()
    }

    req.body = dtoObj
    next()
  }
}
