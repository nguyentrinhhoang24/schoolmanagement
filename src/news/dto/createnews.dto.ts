import { IsOptional, IsString } from "class-validator";
import { Status } from "../schemas/news.schema";

export class CreateNewsDto {
    @IsString()
    @IsOptional()
    school_id: string;

    @IsString()
    @IsOptional()
    readonly branch_id: string;

    @IsString()
    @IsOptional()
    readonly title: string;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsString()
    @IsOptional()
    readonly category: string[];

    @IsString()
    @IsOptional()
    readonly tag: string[];

    @IsString()
    @IsOptional()
    readonly status: Status;
}