import { PGListing } from './pg-listing.entity';
export declare enum MediaType {
    IMAGE = "image",
    VIDEO = "video"
}
export declare class Media {
    id: number;
    listing_id: number;
    listing: PGListing;
    media_type: MediaType;
    url: string;
    thumbnail_url: string;
    original_filename: string;
    file_size: number;
    mime_type: string;
    width: number;
    height: number;
    duration: number;
    display_order: number;
    is_cover: boolean;
    alt_text: string;
    caption: string;
    is_processed: boolean;
    processing_error: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    get file_size_mb(): number;
    get is_image(): boolean;
    get is_video(): boolean;
    get formatted_duration(): string | null;
}
