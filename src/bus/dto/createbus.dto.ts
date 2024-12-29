import { IsOptional, isString, IsString } from "class-validator";

export class CreateBusDto {
    @IsString()
    @IsOptional()
    school_id: string;

    @IsString()
    @IsOptional()
    branch_id: string;

    @IsString()
    @IsOptional()
    user_id: string;

    @IsString()
    @IsOptional()
    session_id: string;

    @IsString()
    @IsOptional()
    code: string;

    @IsString()
    @IsOptional()
    route: string;

    @IsString()
    @IsOptional()
    description: string;
}