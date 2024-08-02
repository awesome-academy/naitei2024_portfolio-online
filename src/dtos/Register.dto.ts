import { IsEmail, IsString, MinLength } from 'class-validator'
import { VALIDATION_NUMBERS } from '~/constants/validator.constant'

export class RegisterDto {
  @IsEmail({}, { message: 'validation.email' })
  email: string

  @IsString()
  @MinLength(VALIDATION_NUMBERS.MIN_LENGTH, { message: 'validation.password' })
  password: string

  @IsString()
  @MinLength(VALIDATION_NUMBERS.MIN_LENGTH, { message: 'validation.fullname' })
  fullname: string

  @IsString()
  @MinLength(VALIDATION_NUMBERS.MIN_LENGTH, { message: 'validation.userName' })
  username: string
}
