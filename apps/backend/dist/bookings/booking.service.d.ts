import { Repository } from 'typeorm';
import { Booking, Payment, PgListing, Offer } from '../typeorm/entities';
import { CreateBookingDto, GetBookingsDto } from './dto/booking.dto';
export declare class BookingService {
    private bookingRepository;
    private paymentRepository;
    private listingRepository;
    private offerRepository;
    constructor(bookingRepository: Repository<Booking>, paymentRepository: Repository<Payment>, listingRepository: Repository<PgListing>, offerRepository: Repository<Offer>);
    createBooking(userId: number, dto: CreateBookingDto): Promise<Booking>;
    getUserBookings(userId: number, dto?: GetBookingsDto): Promise<Booking[]>;
    getOwnerBookings(ownerId: number, dto?: GetBookingsDto): Promise<Booking[]>;
    getBookingById(bookingId: number, userId: number): Promise<Booking>;
    confirmBooking(bookingId: number, paymentId: string): Promise<Booking>;
    cancelBooking(userId: number, bookingId: number, reason: string): Promise<Booking>;
    completeBooking(bookingId: number): Promise<Booking>;
}
