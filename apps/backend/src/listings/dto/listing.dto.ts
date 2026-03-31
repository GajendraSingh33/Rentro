import {
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsArray,
  IsDate,
  Min,
  Max,
  MaxLength,
  MinLength,
  IsEmail,
  IsPhoneNumber,
  ValidateNested,
  IsInt,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  RoomType,
  GenderPreference,
  FoodType,
  ListingStatus,
} from '../../typeorm/entities/pg-listing.entity';

export class CreateListingDto {
  // Basic Information
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  title: string;

  @IsString()
  @MinLength(50)
  description: string;

  // Location Details
  @IsString()
  @MaxLength(500)
  address: string;

  @IsString()
  @MaxLength(100)
  city: string;

  @IsString()
  @MaxLength(100)
  state: string;

  @IsString()
  @MaxLength(20)
  pincode: string;

  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  nearby_landmarks?: string[];

  // Room & Pricing Details
  @IsEnum(RoomType)
  room_type: RoomType;

  @IsInt()
  @Min(1)
  @Max(20)
  sharing_capacity: number;

  @IsNumber()
  @Min(0)
  monthly_rent: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  security_deposit?: number;

  @IsOptional()
  @IsBoolean()
  electricity_included?: boolean;

  @IsOptional()
  @IsBoolean()
  water_included?: boolean;

  @IsOptional()
  @IsBoolean()
  wifi_included?: boolean;

  // Availability
  @IsInt()
  @Min(1)
  total_rooms: number;

  @IsInt()
  @Min(0)
  available_rooms: number;

  @IsInt()
  @Min(1)
  total_beds: number;

  @IsInt()
  @Min(0)
  available_beds: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  available_from?: Date;

  // Preferences
  @IsOptional()
  @IsEnum(GenderPreference)
  gender_preference?: GenderPreference;

  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(100)
  min_age?: number;

  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(100)
  max_age?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  preferred_occupation?: string;

  // Amenities
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  // Food Details
  @IsEnum(FoodType)
  food_type: FoodType;

  @IsOptional()
  @IsBoolean()
  breakfast_included?: boolean;

  @IsOptional()
  @IsBoolean()
  lunch_included?: boolean;

  @IsOptional()
  @IsBoolean()
  dinner_included?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  food_cost_per_month?: number;

  // Rules & Regulations
  @IsOptional()
  @IsString()
  house_rules?: string;

  @IsOptional()
  @IsString()
  gate_closing_time?: string;

  @IsOptional()
  @IsBoolean()
  visitors_allowed?: boolean;

  @IsOptional()
  @IsBoolean()
  smoking_allowed?: boolean;

  @IsOptional()
  @IsBoolean()
  drinking_allowed?: boolean;

  @IsOptional()
  @IsBoolean()
  pets_allowed?: boolean;

  // Contact Information
  @IsOptional()
  @IsString()
  @MaxLength(20)
  contact_phone?: string;

  @IsOptional()
  @IsEmail()
  contact_email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  preferred_contact_method?: string;
}

export class UpdateListingDto {
  // All fields are optional for updates
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(50)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  pincode?: string;

  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  nearby_landmarks?: string[];

  @IsOptional()
  @IsEnum(RoomType)
  room_type?: RoomType;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  sharing_capacity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  monthly_rent?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  security_deposit?: number;

  @IsOptional()
  @IsBoolean()
  electricity_included?: boolean;

  @IsOptional()
  @IsBoolean()
  water_included?: boolean;

  @IsOptional()
  @IsBoolean()
  wifi_included?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  total_rooms?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  available_rooms?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  total_beds?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  available_beds?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  available_from?: Date;

  @IsOptional()
  @IsEnum(GenderPreference)
  gender_preference?: GenderPreference;

  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(100)
  min_age?: number;

  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(100)
  max_age?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  preferred_occupation?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsEnum(FoodType)
  food_type?: FoodType;

  @IsOptional()
  @IsBoolean()
  breakfast_included?: boolean;

  @IsOptional()
  @IsBoolean()
  lunch_included?: boolean;

  @IsOptional()
  @IsBoolean()
  dinner_included?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  food_cost_per_month?: number;

  @IsOptional()
  @IsString()
  house_rules?: string;

  @IsOptional()
  @IsString()
  gate_closing_time?: string;

  @IsOptional()
  @IsBoolean()
  visitors_allowed?: boolean;

  @IsOptional()
  @IsBoolean()
  smoking_allowed?: boolean;

  @IsOptional()
  @IsBoolean()
  drinking_allowed?: boolean;

  @IsOptional()
  @IsBoolean()
  pets_allowed?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  contact_phone?: string;

  @IsOptional()
  @IsEmail()
  contact_email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  preferred_contact_method?: string;
}

export class ListingFilterDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_rent?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  max_rent?: number;

  @IsOptional()
  @IsEnum(RoomType)
  room_type?: RoomType;

  @IsOptional()
  @IsEnum(GenderPreference)
  gender_preference?: GenderPreference;

  @IsOptional()
  @IsEnum(FoodType)
  food_type?: FoodType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsEnum(ListingStatus)
  status?: ListingStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsString()
  sort_by?: string; // 'rent', 'created_at', 'popularity'

  @IsOptional()
  @IsString()
  sort_order?: 'ASC' | 'DESC';
}

export class UpdateListingStatusDto {
  @IsEnum(ListingStatus)
  status: ListingStatus;

  @IsOptional()
  @IsString()
  rejection_reason?: string;
}

export class ListingResponseDto {
  id: number;
  owner_id: number;
  title: string;
  description: string;
  status: ListingStatus;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  nearby_landmarks?: string[];
  room_type: RoomType;
  sharing_capacity: number;
  monthly_rent: number;
  security_deposit?: number;
  electricity_included: boolean;
  water_included: boolean;
  wifi_included: boolean;
  total_rooms: number;
  available_rooms: number;
  total_beds: number;
  available_beds: number;
  available_from?: Date;
  gender_preference: GenderPreference;
  min_age?: number;
  max_age?: number;
  preferred_occupation?: string;
  amenities?: string[];
  food_type: FoodType;
  breakfast_included: boolean;
  lunch_included: boolean;
  dinner_included: boolean;
  food_cost_per_month?: number;
  house_rules?: string;
  gate_closing_time?: string;
  visitors_allowed: boolean;
  smoking_allowed: boolean;
  drinking_allowed: boolean;
  pets_allowed: boolean;
  view_count: number;
  inquiry_count: number;
  booking_count: number;
  average_rating?: number;
  review_count: number;
  is_featured: boolean;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
  owner?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  media?: any[];
}
