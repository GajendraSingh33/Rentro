import { IsInt, IsString, IsOptional, Min } from 'class-validator';

export class UploadImageDto {
  @IsInt()
  listingId: number;
}

export class UploadVideoDto {
  @IsInt()
  listingId: number;
}

export class SetCoverImageDto {
  @IsInt()
  listingId: number;
}

export class UpdateDisplayOrderDto {
  @IsInt()
  @Min(0)
  order: number;
}

export class MediaResponseDto {
  id: number;
  listing_id: number;
  media_type: string;
  url: string;
  thumbnail_url?: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  width?: number;
  height?: number;
  duration?: number;
  display_order: number;
  is_cover: boolean;
  created_at: Date;
}
