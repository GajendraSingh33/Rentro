import { User } from './user.entity';
import { PGListing } from './pg-listing.entity';
export declare enum InquiryStatus {
    NEW = "new",
    VIEWED = "viewed",
    RESPONDED = "responded",
    REJECTED = "rejected",
    CLOSED = "closed"
}
export declare class Inquiry {
    id: number;
    seeker_id: number;
    seeker: User;
    listing_id: number;
    listing: PGListing;
    owner_id: number;
    owner: User;
    message: string;
    status: InquiryStatus;
    owner_response: string;
    viewed_at: Date;
    responded_at: Date;
    rejection_reason: string;
    seeker_name: string;
    seeker_email: string;
    seeker_phone: string;
    preferred_move_in_date: Date;
    number_of_people: number;
    duration_months: number;
    additional_requirements: string;
    contact_revealed: boolean;
    contact_revealed_at: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    get is_new(): boolean;
    get response_time_hours(): number | null;
}
