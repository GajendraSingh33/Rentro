import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
  IsDateString,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ReviewStatus } from '../../typeorm/entities/review.entity';

export class CreateReviewDto {
  @IsNumber()
  listing_id: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  cleanliness_rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  amenities_rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  location_rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  value_for_money_rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  owner_response_rating?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsString()
  @MinLength(20)
  @MaxLength(2000)
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pros?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cons?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  stay_duration_months?: number;

  @IsOptional()
  @IsDateString()
  stayed_from?: string;

  @IsOptional()
  @IsDateString()
  stayed_until?: string;

  @IsOptional()
  @IsBoolean()
  is_current_resident?: boolean;
}

export class UpdateReviewDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  cleanliness_rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  amenities_rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  location_rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  value_for_money_rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  owner_response_rating?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(2000)
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pros?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cons?: string[];
}

export class OwnerResponseDto {
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  response: string;
}

export class ReviewsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  listing_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  min_rating?: number;

  @IsOptional()
  @IsString()
  status?: ReviewStatus;

  @IsOptional()
  @IsString()
  sort_by?: 'newest' | 'oldest' | 'highest_rating' | 'lowest_rating' | 'most_helpful';

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}

export class ReviewResponseDto {
  id: number;
  listing_id: number;
  rating: number;
  cleanliness_rating: number | null;
  amenities_rating: number | null;
  location_rating: number | null;
  value_for_money_rating: number | null;
  owner_response_rating: number | null;
  title: string | null;
  content: string;
  pros: string[];
  cons: string[];
  stay_duration_months: number | null;
  is_current_resident: boolean;
  is_verified: boolean;
  helpful_count: number;
  owner_response: string | null;
  owner_responded_at: Date | null;
  created_at: Date;
  reviewer: {
    id: number;
    name: string;
    avatar_url: string | null;
  };
}

export class ReviewsListResponseDto {
  data: ReviewResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  average_rating: number | null;
  rating_distribution: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
}

export class RatingSummaryDto {
  average_rating: number | null;
  total_reviews: number;
  rating_distribution: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
  category_averages: {
    cleanliness: number | null;
    amenities: number | null;
    location: number | null;
    value_for_money: number | null;
    owner_response: number | null;
  };
}
