import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiPropertyOptional({ description: 'Username of the user', example: 'berard123' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ description: 'Email of the user (personal or Sandai)', example: 'johndoe@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Password of the user', example: 'Password123!' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
