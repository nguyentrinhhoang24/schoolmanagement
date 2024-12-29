import { IsString, IsOptional, IsEnum, IsEmpty } from 'class-validator';
import { Status } from '../schemas/school.schema';
import { User } from 'src/auth/schemas/user.schema';

export class CreateSchoolDto {

  @IsOptional()
  @IsString({each: true})
  readonly branch_id: string[];

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsEnum(Status, { message: 'Please enter correct status.' })
  readonly status: Status;

}