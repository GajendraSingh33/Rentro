import { PgListing } from './pg-listing.entity';
import { User } from './user.entity';
export declare enum PremiumPlanType {
    FEATURED = "featured",// 7 days featured listing
    PREMIUM_30 = "premium_30",// 30 days premium
    PREMIUM_90 = "premium_90",// 90 days premium
    PREMIUM_365 = "premium_365"
}
export declare enum PremiumStatus {
    ACTIVE = "active",
    EXPIRED = "expired",
    CANCELLED = "cancelled"
}
export declare class PremiumListing {
    id: number;
    listing_id: number;
    listing: PgListing;
    owner_id: number;
    owner: User;
    plan_type: PremiumPlanType;
    status: PremiumStatus;
    start_date: Date;
    end_date: Date;
    amount_paid: number;
    payment_id: string;
    boost_score: number;
    created_at: Date;
    updated_at: Date;
}
