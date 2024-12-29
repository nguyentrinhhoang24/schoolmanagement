import { Type } from "class-transformer";
import { IsString, IsNumber, IsEnum, IsDate, IsOptional, IsArray, IsNotEmpty, ValidateNested, Min } from "class-validator";
import { PayMethod } from "../schemas/invoice.schema";


class FeeItemDto {
  @IsString()
  @IsNotEmpty()
  fee_item: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
  
export class UpdateInvoiceDto {
    
    @IsString()
    @IsOptional()
    school_id: string;

    @IsString()
    @IsOptional()
    branch_id: string;

    @IsString()
    @IsOptional()
    class_id: string;

    @IsString()
    @IsOptional()
    student_id: string;

    @IsString()
    @IsOptional()
    title: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    payment_deadline: Date;

    @IsString()
    @IsEnum(PayMethod, {message: 'Please enter  correct payment method'})
    @IsOptional()
    payment_method: PayMethod;

    @IsString()
    @IsOptional()
    description: string;

    @Type(() => FeeItemDto)
    @IsOptional()
    @IsNotEmpty({each: true})
    @ValidateNested({ each: true })
    @IsArray()
    fee_items: FeeItemDto[];

    @IsNumber()
    @IsOptional()
    readonly total?: number;
}