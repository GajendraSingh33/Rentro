import { BookingService } from './booking.service';
import { CreateBookingDto, GetBookingsDto } from './dto/booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createBooking(req: any, dto: CreateBookingDto): Promise<{
        success: boolean;
        message: string;
        data: import("../typeorm/entities").Booking;
    }>;
    getUserBookings(req: any, dto: GetBookingsDto): Promise<{
        success: boolean;
        data: import("../typeorm/entities").Booking[];
    }>;
    getOwnerBookings(req: any, dto: GetBookingsDto): Promise<{
        success: boolean;
        data: import("../typeorm/entities").Booking[];
    }>;
    getBookingById(req: any, id: number): Promise<{
        success: boolean;
        data: import("../typeorm/entities").Booking;
    }>;
    cancelBooking(req: any, id: number, reason: string): Promise<{
        success: boolean;
        message: string;
        data: import("../typeorm/entities").Booking;
    }>;
    completeBooking(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("../typeorm/entities").Booking;
    }>;
}
