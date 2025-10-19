import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsUUID } from "class-validator";

export class CreateSubmissionDto {
    @ApiProperty({example: "c19caa26-8f21-42dc-8e7c-9fd9a3f5d2cb"})
    @IsUUID()
    projectId: string
    
    @ApiProperty({example: "ChatGPT"})
    @IsString()
    application: string
    
    @ApiProperty({example: "https://chatgpt.com/"})
    @IsString()
    link: string
    
    @ApiProperty({example: "Text"})
    @IsString()
    modality: string
    
    @ApiProperty({example: "A simple summary about the Gen AI tool"})
    @IsString()
    summary: string
    
    @ApiProperty({example: ["Free", "Premium - $20/month", "Enterprise - Custom"]})
    @IsArray()
    @IsString({each: true})
    pricing_options: string[]
    
    @ApiProperty({example: "John Doe"})
    @IsString()
    full_name: string
}
