import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator"

export class GetAiModelSummary {

    @IsString()
    @IsNotEmpty()
    text: string
    
    @IsString()
    @IsOptional()
    modelId: string
    
    @IsNumber()
    @IsOptional()
    temperature: number
    
    @IsNumber()
    @IsOptional()
    maxToken: number

}