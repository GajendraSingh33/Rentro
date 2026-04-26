import { AvailabilityService } from './availability.service';
import { AvailabilityStatus } from '../typeorm/entities/availability.entity';
declare class UpdateAvailabilityDto {
    available_beds_in_room?: number;
    status?: AvailabilityStatus;
    price_per_bed?: number;
    notes?: string;
}
declare class BulkUpdateDto {
    updates: Array<{
        room_number: string;
        available_beds_in_room: number;
        status: AvailabilityStatus;
    }>;
}
declare class CreateRoomDto {
    room_number: string;
    total_beds: number;
}
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    getAvailability(listingId: number): Promise<import("../typeorm/entities/availability.entity").Availability[]>;
    updateAvailability(listingId: number, roomNumber: string, updateDto: UpdateAvailabilityDto): Promise<import("../typeorm/entities/availability.entity").Availability>;
    bulkUpdateAvailability(listingId: number, bulkDto: BulkUpdateDto): Promise<import("../typeorm/entities/availability.entity").Availability[]>;
    createRoom(listingId: number, createDto: CreateRoomDto): Promise<import("../typeorm/entities/availability.entity").Availability>;
}
export {};
