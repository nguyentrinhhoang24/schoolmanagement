import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Status } from '../schemas/menu.schema';

export class UpdateMenuDto {
  
  // @IsString()
  // @IsOptional()
  // readonly school_id: string;

  // @IsString()
  // @IsOptional()
  // readonly branch_id: string;
  
  @IsString()
  @IsOptional()
  readonly code: string;

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