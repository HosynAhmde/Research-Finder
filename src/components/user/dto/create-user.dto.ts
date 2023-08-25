import { CreateDto } from '@Common/dto';
import { Role } from '@Common/enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto extends CreateDto<CreateUserDto> {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
