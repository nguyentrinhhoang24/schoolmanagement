import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../schemas/classgroup.schema';

export class UpdateClassGroupDto {
  
    // @IsString()
    // @IsOptional()
    // @IsNotEmpty()
    // readonly school_id: string;
  
    // @IsString()
    // @IsOptional()
    // readonly branch_id: string;
  
    // @IsString({each: true})
    // @IsOptional()
    // readonly class_id: string[];
    
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