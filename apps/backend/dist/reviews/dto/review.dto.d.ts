import { ReviewStatus } from '../../typeorm/entities/review.entity';
export declare class CreateReviewDto {
    listing_id: number;
    rating: number;
    cleanliness_rating?: number;
    amenities_rating?: number;
    location_rating?: number;
    value_for_money_rating?: number;
    owner_response_rating?: number;
    title?: string;
    content: string;
    pros?: string[];
    cons?: string[];
    stay_duration_months?: number;
    stayed_from?: string;
    stayed_until?: string;
    is_current_resident?: boolean;
}
export declare class UpdateReviewDto {
    rating?: number;
    cleanliness_rating?: number;
    amenities_rating?: number;
    location_rating?: number;
    value_for_money_rating?: number;
    owner_response_rating?: number;
    title?: string;
    content?: string;
    pros?: string[];
    cons?: string[];
}
export declare class OwnerResponseDto {
    response: string;
}
export declare class ReviewsQueryDto {
    listing_id?: number;
    min_rating?: number;
    status?: ReviewStatus;
    sort_by?: 'newest' | 'oldest' | 'highest_rating' | 'lowest_rating' | 'most_helpful';
    page?: number;
    limit?: number;
}
export declare class ReviewResponseDto {
    id: number;
    listing_id: number;
    rating: number;
    cleanliness_rating: number | null;
    amenities_rating: number | null;
    location_rating: number | null;
    value_for_money_rating: number | null;
    owner_response_rating: number | null;
    title: string | null;
    content: string;
    pros: string[];
    cons: string[];
    stay_duration_months: number | null;
    is_current_resident: boolean;
    is_verified: boolean;
    helpful_count: number;
    owner_response: string | null;
    owner_responded_at: Date | null;
    created_at: Date;
    reviewer: {
        id: number;
        name: string;
        avatar_url: string | null;
    };
}
export declare class ReviewsListResponseDto {
    data: ReviewResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    average_rating: number | null;
    rating_distribution: {
        '5': number;
        '4': number;
        '3': number;
        '2': number;
        '1': number;
    };
}
export declare class RatingSummaryDto {
    average_rating: number | null;
    total_reviews: number;
    rating_distribution: {
        '5': number;
        '4': number;
        '3': number;
        '2': number;
        '1': number;
    };
    category_averages: {
        cleanliness: number | null;
        amenities: number | null;
        location: number | null;
        value_for_money: number | null;
        owner_response: number | null;
    };
}
