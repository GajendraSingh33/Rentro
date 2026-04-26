import { User } from './user.entity';
import { PGListing } from './pg-listing.entity';
export declare class Favorite {
    id: number;
    user_id: number;
    listing_id: number;
    user: User;
    listing: PGListing;
    notes: string;
    created_at: Date;
}
