import { IsString, MinLength } from 'class-validator';

export class UsersDto {

  @IsString()
  email: string

  @IsString()
  @MinLength(8, { message: 'Password must contain at least 8 characters' })
  password: string

  @IsString()
  role: string
}
