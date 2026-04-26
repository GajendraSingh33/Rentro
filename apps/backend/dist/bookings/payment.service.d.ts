import { Repository } from 'typeorm';
import { Payment, Booking } from '../typeorm/entities';
export declare class PaymentService {
    private paymentRepository;
    private bookingRepository;
    constructor(paymentRepository: Repository<Payment>, bookingRepository: Repository<Booking>);
    /**
     * Initialize payment (Stripe/Razorpay integration point)
     * TODO: Integrate with actual payment gateways
     */
    initiatePayment(userId: number, bookingId: number, paymentGateway: string): Promise<{
        payment_id: string;
        client_secret?: string;
        order_id?: string;
    }>;
    /**
     * Verify and confirm payment
     * TODO: Verify with payment gateway
     */
    verifyPayment(gatewayPaymentId: string, paymentGateway: string): Promise<Payment>;
    /**
     * Handle payment webhook from gateway
     */
    handleWebhook(payload: any, signature: string, gateway: string): Promise<void>;
    getPaymentsByUser(userId: number): Promise<Payment[]>;
    getPaymentById(paymentId: number): Promise<Payment>;
}
