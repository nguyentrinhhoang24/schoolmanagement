import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Gender, Status, BloodGroup } from "../schemas/student.schema";

export class healthInfoDto {

  @IsNumber()
  @IsOptional()
  readonly height: number;

  @IsNumber()
  @IsOptional()
  readonly weight: number;

  @IsEnum(BloodGroup, { message: 'Blood group must be A+, A-, B+, B-, AB+, AB-, O+ or O-.' })
  @IsOptional()
  readonly bloodgroup: BloodGroup;

  @IsString()
  @IsOptional()
  readonly allergy: string;

  @IsNumber()
  @IsOptional()
  readonly heartrate: number;

  @IsString()
  @IsOptional()
  readonly eyes: string;

  @IsString()
  @IsOptional()
  readonly ears: string;

  @IsString()
  @IsOptional()
  readonly note: string;
}

export class UpdateStudentDto {
    @IsString()
    @IsOptional()
    readonly school_id: string;

    @IsString()
    @IsOptional()
    readonly branch_id: string;

    @IsString()
    @IsOptional()
    readonly class_id: string;

    @IsString()
    @IsOptional()
    readonly code: string;

    @IsString()
    @IsOptional()
    readonly name: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    readonly birthday: Date;

    @IsString()
    @IsEnum(Gender, { message: 'Please enter correct gender.' })
    @IsOptional()
    readonly gender: Gender;

    @IsString()
    @IsOptional()
    readonly address: string;

    @IsString()
    @IsOptional()
    readonly parent_id: string[];

    @ValidateNested()
    @Type(() => healthInfoDto)
    @IsOptional()
    readonly health: healthInfoDto;

    @IsString()
    @IsEnum(Status, { message: 'Please enter correct status.' })
    @IsOptional()
    readonly status: Status;
}