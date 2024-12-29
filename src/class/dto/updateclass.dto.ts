import { IsString, IsOptional, IsEnum, IsNotEmpty, IsArray } from 'class-validator';
import { Status } from '../schemas/class.schema';

export class UpdateClassDto {

  @IsString()
  @IsOptional()
  school_id: string;

  @IsString()
  @IsOptional()
  readonly branch_id: string;

  @IsString()
  @IsOptional()
  readonly classgroup_id: string;
  
  @IsString()
  @IsOptional()
  readonly session_id: string;

  @IsString()
  @IsOptional()
  readonly user_id: string;

  @IsArray()
  @IsString({each: true})
  @IsOptional()
  readonly student_id: string[];

  @IsString()
  @IsOptional()
  readonly code: string;

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly age: number;

  @IsEnum(Status, { message: 'Please enter correct status.' })
  @IsOptional()
  readonly status: Status;
}