import { User } from './user.entity';
import { PgListing } from './pg-listing.entity';
export declare enum ActivityType {
    VIEW = "view",
    SEARCH = "search",
    FAVORITE = "favorite",
    INQUIRY = "inquiry",
    BOOKING = "booking",
    SHARE = "share"
}
export declare class UserActivity {
    id: number;
    user_id: number;
    user: User;
    listing_id: number;
    listing: PgListing;
    activity_type: ActivityType;
    metadata: Record<string, any>;
    ip_address: string;
    user_agent: string;
    created_at: Date;
}
