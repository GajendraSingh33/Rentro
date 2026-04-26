import { Repository } from 'typeorm';
import { Availability, AvailabilityStatus } from '../typeorm/entities/availability.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
export declare class AvailabilityService {
    private availabilityRepository;
    private listingRepository;
    constructor(availabilityRepository: Repository<Availability>, listingRepository: Repository<PGListing>);
    getAvailability(listingId: number): Promise<Availability[]>;
    updateAvailability(listingId: number, roomNumber: string, data: Partial<Availability>): Promise<Availability>;
    bulkUpdateAvailability(listingId: number, updates: Array<{
        room_number: string;
        available_beds_in_room: number;
        status: AvailabilityStatus;
    }>): Promise<Availability[]>;
    createRoomAvailability(listingId: number, roomNumber: string, totalBeds: number): Promise<Availability>;
    private syncListingAvailability;
}
