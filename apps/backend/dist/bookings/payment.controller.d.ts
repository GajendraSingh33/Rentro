import { PaymentService } from './payment.service';
import { InitiatePaymentDto, VerifyPaymentDto } from './dto/booking.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    initiatePayment(req: any, dto: InitiatePaymentDto): Promise<{
        success: boolean;
        message: string;
        data: {
            payment_id: string;
            client_secret?: string;
            order_id?: string;
        };
    }>;
    verifyPayment(dto: VerifyPaymentDto): Promise<{
        success: boolean;
        message: string;
        data: import("../typeorm/entities").Payment;
    }>;
    handleWebhook(gateway: string, stripeSignature: string, razorpaySignature: string, payload: any): Promise<{
        received: boolean;
    }>;
    getPayments(req: any): Promise<{
        success: boolean;
        data: import("../typeorm/entities").Payment[];
    }>;
    getPaymentById(id: number): Promise<{
        success: boolean;
        data: import("../typeorm/entities").Payment;
    }>;
}
