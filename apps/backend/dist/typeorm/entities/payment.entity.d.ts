import { Booking } from './booking.entity';
import { User } from './user.entity';
export declare enum PaymentStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed",
    REFUNDED = "refunded",
    PARTIALLY_REFUNDED = "partially_refunded"
}
export declare enum PaymentMethod {
    CREDIT_CARD = "credit_card",
    DEBIT_CARD = "debit_card",
    UPI = "upi",
    NET_BANKING = "net_banking",
    WALLET = "wallet"
}
export declare class Payment {
    id: number;
    booking_id: number;
    booking: Booking;
    user_id: number;
    user: User;
    amount: number;
    refund_amount: number;
    status: PaymentStatus;
    payment_method: PaymentMethod;
    gateway_payment_id: string;
    payment_gateway: string;
    receipt_url: string;
    gateway_response: Record<string, any>;
    failure_reason: string;
    paid_at: Date;
    refunded_at: Date;
    created_at: Date;
    updated_at: Date;
}
