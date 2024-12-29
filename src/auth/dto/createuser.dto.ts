import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';
import { Type } from 'class-transformer';

export class CreateUserDto {

  @IsString({each: true})
  @IsOptional()
  readonly school_id: string[];

  @IsString()
  @IsOptional()
  readonly branch_id: string;

  @IsString()
  @IsOptional()
  readonly class_id: string;

  @IsString()
  @IsOptional()
  readonly bus_id: string;

  @IsString({each: true})
  @IsOptional()
  readonly student_id: string[];

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsDate()
  readonly birthday: Date;

  @IsOptional()
  @IsString()
  readonly gender: string[];

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly password: string;

  @IsOptional()
  readonly role: string[];
}