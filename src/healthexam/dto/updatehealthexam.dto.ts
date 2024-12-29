import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateHealthExamDto {

    // @IsString()
    // @IsOptional()
    // @IsNotEmpty()
    // readonly school_id: string;

    // @IsString()
    // @IsOptional()
    // @IsNotEmpty()
    // readonly branch_id: string;

    // @IsString()
    // @IsOptional()
    // @IsNotEmpty()
    // readonly class_id: string;

    @IsDate()
    @Type(() => Date)
    readonly date: Date;

    @IsString()
    @IsOptional()
    readonly note: string;
}