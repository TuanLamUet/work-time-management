import { IsEmail, IsString, MinLength, IsBoolean } from 'class-validator';
import { Optional } from '@nestjs/common';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must contain least at 8 characters' })
  password: string;

  @Optional()
  @IsBoolean()
  remember: boolean;
}
