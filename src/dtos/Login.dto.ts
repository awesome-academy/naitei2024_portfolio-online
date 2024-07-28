import { IsEmail, IsString, MinLength } from 'class-validator'
import { VALIDATION_NUMBERS } from '~/constants/validator.constant'

export class LoginDto {
  @IsEmail({}, { message: 'validation.email' })
  email: string

  @IsString()
  @MinLength(VALIDATION_NUMBERS.MIN_LENGTH, { message: 'validation.password' })
  password: string
}
