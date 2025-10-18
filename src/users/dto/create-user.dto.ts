import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Full name of the user', example: "Berard" })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Username (unique)' , example: "I-Berard"})
  @IsString()
  username: string;

  @ApiProperty({ description: 'Sandai email of the user', example: "johndoe@sandaicares.org" })
  @IsEmail()
  sandai_email: string;

  @ApiProperty({ description: 'Personal email of the user' , example: "johndoe@gmail.com"})
  @IsEmail()
  personal_email: string;

  @ApiProperty({ description: 'Password', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'User role' , default: "user"})
  @IsString()
  role: string;
}
