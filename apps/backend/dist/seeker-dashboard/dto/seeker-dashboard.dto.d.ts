export declare class DashboardQueryDto {
    page?: number;
    limit?: number;
}
export declare class SeekerDashboardOverviewDto {
    favorites_count: number;
    inquiries_sent: number;
    inquiries_responded: number;
    reviews_written: number;
    recent_favorites: RecentFavoriteDto[];
    recent_inquiries: RecentInquiryDto[];
    recommended_listings: RecommendedListingDto[];
}
export declare class RecentFavoriteDto {
    id: number;
    listing_id: number;
    title: string;
    city: string;
    monthly_rent: number;
    thumbnail_url: string | null;
    created_at: Date;
}
export declare class RecentInquiryDto {
    id: number;
    listing_id: number;
    listing_title: string;
    status: string;
    owner_name: string;
    has_response: boolean;
    created_at: Date;
}
export declare class RecommendedListingDto {
    id: number;
    title: string;
    address: string;
    city: string;
    monthly_rent: number;
    room_type: string;
    average_rating: number | null;
    thumbnail_url: string | null;
}
export declare class InquiryHistoryDto {
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
export declare class InquiryHistoryListDto {
    data: InquiryHistoryDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class SeekerPreferencesDto {
    preferred_city?: string;
    min_budget?: number;
    max_budget?: number;
    preferred_room_type?: string;
    preferred_gender?: string;
    preferred_food_type?: string;
    amenities?: string[];
    occupation?: string;
}
export declare class SavedSearchDto {
    id: number;
    name: string;
    filters: Record<string, any>;
    results_count: number;
    last_checked: Date;
    created_at: Date;
}
