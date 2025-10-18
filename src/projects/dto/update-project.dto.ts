import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @ApiPropertyOptional({ example: 'f3c9c29c-9fa8-4b32-b45d-d7a0f2f72315', description: 'User ID to reassign project to' })
    @IsUUID()
    @IsOptional()
    userId?: string;
}
