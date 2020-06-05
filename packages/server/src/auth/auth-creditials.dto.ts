import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must contain least at 8 characters' })
  password: string;
}
