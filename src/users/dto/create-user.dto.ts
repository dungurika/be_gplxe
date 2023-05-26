import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { userTypes } from '../schemas/users.schema';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([userTypes.ADMIN, userTypes.User])
  type: string;
}
