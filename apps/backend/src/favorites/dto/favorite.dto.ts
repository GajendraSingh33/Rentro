import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class AddFavoriteDto {
  @IsInt()
  listing_id: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateFavoriteDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

export class FavoritesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class FavoriteResponseDto {
  id: number;
  listing_id: number;
  notes: string | null;
  created_at: Date;
  listing: {
    id: number;
    title: string;
    address: string;
    city: string;
    monthly_rent: number;
    room_type: string;
    gender_preference: string;
    available_rooms: number;
    available_beds: number;
    average_rating: number | null;
    thumbnail_url: string | null;
    is_available: boolean;
  };
}

export class FavoritesListResponseDto {
  data: FavoriteResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class FavoriteCheckResponseDto {
  is_favorite: boolean;
  favorite_id: number | null;
}
