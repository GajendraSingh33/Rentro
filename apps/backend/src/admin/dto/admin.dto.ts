import {
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsEmail,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum UserRole {
  SEEKER = 'SEEKER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export enum ListingStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FLAGGED = 'flagged',
  SUSPENDED = 'suspended',
}

// User Management DTOs
export class ListUsersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  sort_by?: string = 'created_at';

  @IsOptional()
  @IsString()
  sort_order?: 'ASC' | 'DESC' = 'DESC';
}

export class UpdateUserStatusDto {
  @IsEnum(UserStatus)
  status: UserStatus;

  @IsOptional()
  @IsString()
  reason?: string;
}

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}

export class AdminUpdateUserDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  email_verified?: boolean;

  @IsOptional()
  @IsBoolean()
  phone_verified?: boolean;
}

// Listing Moderation DTOs
export class ListListingsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ListingStatus)
  status?: ListingStatus;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  owner_id?: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  is_verified?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  is_featured?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class ModerationActionDto {
  @IsEnum(ListingStatus)
  status: ListingStatus;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsBoolean()
  notify_owner?: boolean = true;
}

export class VerifyListingDto {
  @IsBoolean()
  is_verified: boolean;

  @IsOptional()
  @IsString()
  verification_notes?: string;
}

export class FeatureListingDto {
  @IsBoolean()
  is_featured: boolean;

  @IsOptional()
  @IsString()
  feature_until?: string; // ISO date string
}

// Analytics DTOs
export class AnalyticsQueryDto {
  @IsOptional()
  @IsString()
  start_date?: string;

  @IsOptional()
  @IsString()
  end_date?: string;

  @IsOptional()
  @IsString()
  granularity?: 'day' | 'week' | 'month' = 'day';
}

export class PlatformOverviewDto {
  total_users: number;
  total_seekers: number;
  total_owners: number;
  total_admins: number;
  new_users_today: number;
  new_users_this_week: number;
  new_users_this_month: number;

  total_listings: number;
  active_listings: number;
  pending_listings: number;
  verified_listings: number;
  featured_listings: number;
  new_listings_today: number;
  new_listings_this_week: number;

  total_inquiries: number;
  pending_inquiries: number;
  responded_inquiries: number;
  new_inquiries_today: number;

  total_reviews: number;
  average_platform_rating: number;
}

export class UserGrowthDto {
  date: string;
  total_users: number;
  new_seekers: number;
  new_owners: number;
}

export class ListingStatsDto {
  date: string;
  total_listings: number;
  new_listings: number;
  approved_listings: number;
  rejected_listings: number;
}

export class CityStatsDto {
  city: string;
  total_listings: number;
  average_rent: number;
  total_inquiries: number;
}

// Response DTOs
export class AdminUserResponseDto {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  role: string;
  status: string;
  email_verified: boolean;
  phone_verified: boolean;
  listings_count?: number;
  inquiries_count?: number;
  reviews_count?: number;
  created_at: Date;
  last_login_at?: Date;
}

export class AdminListingResponseDto {
  id: number;
  title: string;
  city: string;
  monthly_rent: number;
  room_type: string;
  status: string;
  is_verified: boolean;
  is_featured: boolean;
  view_count: number;
  inquiry_count: number;
  average_rating: number | null;
  owner: {
    id: number;
    name: string;
    email: string;
  };
  created_at: Date;
  updated_at: Date;
}
