import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateHealthExamDto {

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    school_id: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    branch_id: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    class_id: string;

    @IsDate()
    @Type(() => Date)
    readonly date: Date;

    @IsString()
    @IsOptional()
    readonly note: string;
}