import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import {
  RoomType,
  GenderPreference,
  FoodType,
} from '../../typeorm/entities/pg-listing.entity';

export enum SortBy {
  RELEVANCE = 'relevance',
  RENT_LOW_TO_HIGH = 'rent_asc',
  RENT_HIGH_TO_LOW = 'rent_desc',
  RATING = 'rating',
  NEWEST = 'newest',
  POPULARITY = 'popularity',
  DISTANCE = 'distance',
}

export class SearchListingsDto {
  // Location search
  @IsOptional()
  @IsString()
  query?: string; // General search query (title, description, address)

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  // Proximity search (requires latitude/longitude)
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  radius_km?: number; // Search radius in kilometers (default: 10km)

  // Price filters
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min_rent?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_rent?: number;

  // Room type filter
  @IsOptional()
  @IsEnum(RoomType)
  room_type?: RoomType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(10)
  sharing_capacity?: number;

  // Gender preference
  @IsOptional()
  @IsEnum(GenderPreference)
  gender_preference?: GenderPreference;

  // Food options
  @IsOptional()
  @IsEnum(FoodType)
  food_type?: FoodType;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  breakfast_included?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  lunch_included?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  dinner_included?: boolean;

  // Amenities filter (comma-separated or array)
  @IsOptional()
  @Transform(({ value }) => 
    typeof value === 'string' ? value.split(',').map(s => s.trim()) : value
  )
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  // Inclusion filters
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  wifi_included?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  electricity_included?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  water_included?: boolean;

  // Availability filters
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  available_only?: boolean; // Only show listings with available rooms/beds

  @IsOptional()
  @IsString()
  available_from?: string; // Date string (YYYY-MM-DD)

  // Rules/preferences filters
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  visitors_allowed?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  smoking_allowed?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  pets_allowed?: boolean;

  // Verified/featured filters
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  verified_only?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  featured_only?: boolean;

  // Rating filter
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  min_rating?: number;

  // Sorting
  @IsOptional()
  @IsEnum(SortBy)
  sort_by?: SortBy;

  // Pagination
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

export class SearchResponseDto {
  data: SearchListingResultDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters_applied: Record<string, any>;
  facets?: SearchFacetsDto;
}

export class SearchListingResultDto {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  monthly_rent: number;
  security_deposit: number;
  room_type: RoomType;
  sharing_capacity: number;
  gender_preference: GenderPreference;
  food_type: FoodType;
  amenities: string[];
  total_rooms: number;
  available_rooms: number;
  total_beds: number;
  available_beds: number;
  average_rating: number;
  review_count: number;
  view_count: number;
  is_verified: boolean;
  is_featured: boolean;
  thumbnail_url: string | null;
  owner_name: string;
  distance_km?: number; // Only present for proximity searches
  created_at: Date;
}

export class SearchFacetsDto {
  cities: FacetItem[];
  room_types: FacetItem[];
  gender_preferences: FacetItem[];
  food_types: FacetItem[];
  rent_ranges: RentRangeFacet[];
  amenities: FacetItem[];
}

export class FacetItem {
  value: string;
  count: number;
}

export class RentRangeFacet {
  min: number;
  max: number;
  count: number;
}

export class AutocompleteDto {
  @IsString()
  query: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(20)
  limit?: number = 10;
}

export class AutocompleteResponseDto {
  suggestions: AutocompleteSuggestion[];
}

export class AutocompleteSuggestion {
  type: 'city' | 'area' | 'listing' | 'landmark';
  value: string;
  display: string;
  metadata?: {
    city?: string;
    state?: string;
    listing_id?: number;
    count?: number;
  };
}
