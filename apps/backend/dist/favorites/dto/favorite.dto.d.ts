export declare class AddFavoriteDto {
    listing_id: number;
    notes?: string;
}
export declare class UpdateFavoriteDto {
    notes?: string;
}
export declare class FavoritesQueryDto {
    page?: number;
    limit?: number;
}
export declare class FavoriteResponseDto {
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
export declare class FavoritesListResponseDto {
    data: FavoriteResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class FavoriteCheckResponseDto {
    is_favorite: boolean;
    favorite_id: number | null;
}
