import { IsString, IsOptional, IsEnum, IsNotEmpty, IsMongoId } from 'class-validator';
import { Status } from '../schemas/classgroup.schema';
import { ObjectId } from 'mongoose';
import { Schema } from 'mongoose';

export class CreateClassGroupDto {

  @IsOptional()
  @IsString()
  school_id?: string;

  @IsOptional()
  @IsString()
  branch_id: string;

  @IsString({each: true})
  @IsOptional()
  class_id: string[];
  
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsEnum(Status, { message: 'Please enter correct status.' })
  @IsOptional()
  readonly status: Status;
}