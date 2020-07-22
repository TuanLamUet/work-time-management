import {
  IsString,
  IsIn,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class ProfileDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsOptional()
  @IsString()
  @IsIn(['male', 'female'])
  gender: string;

  @IsOptional()
  dob: Date;
}
