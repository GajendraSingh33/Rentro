export declare class UploadImageDto {
    listingId: number;
}
export declare class UploadVideoDto {
    listingId: number;
}
export declare class SetCoverImageDto {
    listingId: number;
}
export declare class UpdateDisplayOrderDto {
    order: number;
}
export declare class MediaResponseDto {
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
