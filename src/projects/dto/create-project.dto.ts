import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDateString, IsUUID } from "class-validator";

export class CreateProjectDto {
    @ApiProperty({example: "ChatGPT"})
    @IsString()
    tool: string

    @ApiProperty({example: "Set 1"})
    @IsString()
    set: string

    @ApiProperty({ example: '2025-11-30T18:00:00Z', required: false })
    @IsDateString()
    dueDate: string;

    @ApiProperty({ example: 'c19caa26-8f21-42dc-8e7c-9fd9a3f5d2cb'})
    @IsUUID()
    userId: string
}
