import { PGListing } from './pg-listing.entity';
export declare enum AvailabilityStatus {
    AVAILABLE = "available",
    OCCUPIED = "occupied",
    MAINTENANCE = "maintenance",
    RESERVED = "reserved"
}
export declare class Availability {
    id: number;
    listing_id: number;
    listing: PGListing;
    room_number: string;
    total_beds_in_room: number;
    available_beds_in_room: number;
    status: AvailabilityStatus;
    effective_date: Date;
    notes: string;
    created_at: Date;
    updated_at: Date;
    get occupancy_percentage(): number;
    get is_fully_occupied(): boolean;
    get is_available(): boolean;
}
