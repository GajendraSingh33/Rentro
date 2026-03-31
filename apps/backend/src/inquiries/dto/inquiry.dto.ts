import {
  IsString,
  IsInt,
  IsEnum,
  IsOptional,
  IsDate,
  MinLength,
  MaxLength,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InquiryStatus } from '../../typeorm/entities/inquiry.entity';

export class CreateInquiryDto {
  @IsInt()
  listing_id: number;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  message: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  preferred_move_in_date?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  number_of_people?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(120)
  duration_months?: number;

  @IsOptional()
  @IsString()
  additional_requirements?: string;
}

export class UpdateInquiryStatusDto {
  @IsEnum(InquiryStatus)
  status: InquiryStatus;
}

export class RespondToInquiryDto {
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  response: string;
}

export class InquiryFilterDto {
  @IsOptional()
  @IsEnum(InquiryStatus)
  status?: InquiryStatus;

  @IsOptional()
  @IsInt()
  listing_id?: number;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}
