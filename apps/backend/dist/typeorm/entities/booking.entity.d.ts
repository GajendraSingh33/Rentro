import { User } from './user.entity';
import { PgListing } from './pg-listing.entity';
export declare enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed",
    REFUNDED = "refunded"
}
export declare class Booking {
    id: number;
    user_id: number;
    user: User;
    listing_id: number;
    listing: PgListing;
    check_in: Date;
    check_out: Date;
    guests_count: number;
    status: BookingStatus;
    total_amount: number;
    discount_amount: number;
    final_amount: number;
    security_deposit: number;
    special_requests: string;
    cancellation_reason: string;
    confirmed_at: Date;
    cancelled_at: Date;
    completed_at: Date;
    refunded_at: Date;
    created_at: Date;
    updated_at: Date;
}
