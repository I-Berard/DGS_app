import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class YourProject{
    @IsUUID()
    userId: string
    
    @IsString()
    username: string

    @IsString()
    role: string
}