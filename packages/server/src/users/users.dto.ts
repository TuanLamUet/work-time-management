import { IsString, MinLength, IsEmail, IsIn } from 'class-validator';

export class UsersDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must contain at least 8 characters' })
  password: string;

  @IsString()
  @IsIn(['staff', 'admin'])
  role: string;
}
