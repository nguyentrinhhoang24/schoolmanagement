import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Status } from '../schemas/branch.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
  
  @ApiProperty({description: 'school id the branch belongs to'})
  @IsString()
  @IsOptional()
  school_id: string;

  @IsOptional()
  @IsString({each:true})
  readonly classgroup_id: string[];

  @IsOptional()
  @IsString({each:true})
  readonly menu_id: string[];

  @IsOptional()
  @IsString({each:true})
  readonly session_id: string[];

  @IsOptional()
  @IsString({each:true})
  readonly subject_id: string[];

  @IsString()
  @IsOptional()
  readonly code: string;
  
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsEnum(Status, { message: 'Please enter correct status.' })
  @IsOptional()
  readonly status: Status;
}