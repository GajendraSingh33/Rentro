import { PgListing } from './pg-listing.entity';
import { User } from './user.entity';
export declare enum OfferStatus {
    ACTIVE = "active",
    EXPIRED = "expired",
    PAUSED = "paused"
}
export declare class Offer {
    id: number;
    listing_id: number;
    listing: PgListing;
    owner_id: number;
    owner: User;
    title: string;
    description: string;
    discount_percent: number;
    start_date: Date;
    end_date: Date;
    status: OfferStatus;
    redemptions_count: number;
    max_redemptions: number;
    created_at: Date;
    updated_at: Date;
}
