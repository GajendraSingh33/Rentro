import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PageType, PageStatus } from '../../typeorm/entities/static-page.entity';

export class CreatePageDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  slug: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsEnum(PageType)
  page_type: PageType;

  @IsOptional()
  @IsEnum(PageStatus)
  status?: PageStatus = PageStatus.DRAFT;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  meta_title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  meta_description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  meta_keywords?: string[];

  @IsOptional()
  @IsString()
  featured_image?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sort_order?: number;
}

export class UpdatePageDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  slug?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsEnum(PageType)
  page_type?: PageType;

  @IsOptional()
  @IsEnum(PageStatus)
  status?: PageStatus;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  meta_title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  meta_description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  meta_keywords?: string[];

  @IsOptional()
  @IsString()
  featured_image?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sort_order?: number;
}

export class ListPagesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(PageType)
  page_type?: PageType;

  @IsOptional()
  @IsEnum(PageStatus)
  status?: PageStatus;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 20;
}

export class CreateFaqDto {
  @IsString()
  @MinLength(10)
  question: string;

  @IsString()
  @MinLength(10)
  answer: string;

  @IsString()
  category: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sort_order?: number;
}
