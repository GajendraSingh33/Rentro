import { IsOptional, IsNumber, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DashboardQueryDto {
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

export class SeekerDashboardOverviewDto {
  favorites_count: number;
  inquiries_sent: number;
  inquiries_responded: number;
  reviews_written: number;
  recent_favorites: RecentFavoriteDto[];
  recent_inquiries: RecentInquiryDto[];
  recommended_listings: RecommendedListingDto[];
}

export class RecentFavoriteDto {
  id: number;
  listing_id: number;
  title: string;
  city: string;
  monthly_rent: number;
  thumbnail_url: string | null;
  created_at: Date;
}

export class RecentInquiryDto {
  id: number;
  listing_id: number;
  listing_title: string;
  status: string;
  owner_name: string;
  has_response: boolean;
  created_at: Date;
}

export class RecommendedListingDto {
  id: number;
  title: string;
  address: string;
  city: string;
  monthly_rent: number;
  room_type: string;
  average_rating: number | null;
  thumbnail_url: string | null;
}

export class InquiryHistoryDto {
  id: number;
  listing_id: number;
  listing: {
    id: number;
    title: string;
    address: string;
    city: string;
    monthly_rent: number;
    thumbnail_url: string | null;
    owner_name: string;
  };
  message: string;
  status: string;
  response: string | null;
  responded_at: Date | null;
  contact_revealed: boolean;
  created_at: Date;
}

export class InquiryHistoryListDto {
  data: InquiryHistoryDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class SeekerPreferencesDto {
  @IsOptional()
  @IsString()
  preferred_city?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_budget?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_budget?: number;

  @IsOptional()
  @IsString()
  preferred_room_type?: string;

  @IsOptional()
  @IsString()
  preferred_gender?: string;

  @IsOptional()
  @IsString()
  preferred_food_type?: string;

  @IsOptional()
  amenities?: string[];

  @IsOptional()
  @IsString()
  occupation?: string;
}

export class SavedSearchDto {
  id: number;
  name: string;
  filters: Record<string, any>;
  results_count: number;
  last_checked: Date;
  created_at: Date;
}
