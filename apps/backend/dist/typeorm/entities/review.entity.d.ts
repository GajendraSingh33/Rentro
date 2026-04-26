import { User } from './user.entity';
import { PGListing } from './pg-listing.entity';
export declare enum ReviewStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    FLAGGED = "flagged"
}
export declare class Review {
    id: number;
    user_id: number;
    listing_id: number;
    user: User;
    listing: PGListing;
    rating: number;
    cleanliness_rating: number;
    amenities_rating: number;
    location_rating: number;
    value_for_money_rating: number;
    owner_response_rating: number;
    title: string;
    content: string;
    pros: string;
    cons: string;
    stay_duration_months: number;
    stayed_from: Date;
    stayed_until: Date;
    is_current_resident: boolean;
    status: ReviewStatus;
    is_verified: boolean;
    moderated_by: number;
    moderated_at: Date;
    moderation_notes: string;
    helpful_count: number;
    report_count: number;
    owner_response: string;
    owner_responded_at: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    get prosList(): string[];
    set prosList(value: string[]);
    get consList(): string[];
    set consList(value: string[]);
}
