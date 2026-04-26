import { BookingStatus } from '../../typeorm/entities';
export declare class CreateBookingDto {
    listing_id: number;
    check_in: string;
    check_out: string;
    guests_count: number;
    special_requests?: string;
    offer_id?: number;
}
export declare class UpdateBookingDto {
    status?: BookingStatus;
    cancellation_reason?: string;
}
export declare class GetBookingsDto {
    status?: BookingStatus;
    listing_id?: number;
    limit?: number;
    offset?: number;
}
export declare class InitiatePaymentDto {
    booking_id: number;
    payment_gateway: string;
}
export declare class VerifyPaymentDto {
    gateway_payment_id: string;
    payment_gateway: string;
}
