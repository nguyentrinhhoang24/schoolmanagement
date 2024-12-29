import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateFeeItemDto {
    @IsString()
    @IsOptional()
    readonly school_id: string;

    @IsString()
    @IsOptional()
    readonly branch_id: string;

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