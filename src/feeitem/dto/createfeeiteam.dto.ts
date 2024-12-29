import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFeeItemDto {
    @IsString()
    @IsOptional()school_id: string;

    @IsString()
    @IsOptional()branch_id: string;

    @IsString()
    @IsOptional()
    readonly code: string;

    @IsString()
    @IsOptional()
    readonly title: string;

    @IsNumber()
    @IsOptional()
    readonly price: number;

    @IsString()
    @IsOptional()
    readonly description: string;
}