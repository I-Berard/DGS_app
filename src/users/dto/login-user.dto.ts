import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiPropertyOptional({ description: 'Username of the user', example: 'berard123' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ description: 'Sandai email of the user', example: '' })
  @IsEmail()
  @IsOptional()
  sandai_email?: string;

  @ApiPropertyOptional({ description: 'Personal email of the user', example: '' })
  @IsEmail()
  @IsOptional()
  personal_email?: string;

  @ApiProperty({ description: 'Password of the user', example: 'Password123!' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
