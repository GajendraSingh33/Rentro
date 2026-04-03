import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus, Booking, BookingStatus, PaymentMethod } from '../typeorm/entities';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  /**
   * Initialize payment (Stripe/Razorpay integration point)
   * TODO: Integrate with actual payment gateways
   */
  async initiatePayment(
    userId: number,
    bookingId: number,
    paymentGateway: string
  ): Promise<{ payment_id: string; client_secret?: string; order_id?: string }> {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Create payment record
    const payment = this.paymentRepository.create({
      booking_id: bookingId,
      user_id: userId,
      amount: booking.final_amount,
      status: PaymentStatus.PENDING,
      payment_gateway: paymentGateway,
      payment_method: PaymentMethod.CREDIT_CARD, // Will be updated based on user selection
    });

    const savedPayment = await this.paymentRepository.save(payment);

    /**
     * TODO: Integrate with payment gateway
     * 
     * For Stripe:
     * const paymentIntent = await stripe.paymentIntents.create({
     *   amount: booking.final_amount * 100, // Convert to cents
     *   currency: 'inr',
     *   metadata: { booking_id: bookingId, user_id: userId },
     * });
     * return { payment_id: savedPayment.id.toString(), client_secret: paymentIntent.client_secret };
     * 
     * For Razorpay:
     * const order = await razorpay.orders.create({
     *   amount: booking.final_amount * 100, // Convert to paise
     *   currency: 'INR',
     *   receipt: `booking_${bookingId}`,
     *   notes: { booking_id: bookingId, user_id: userId },
     * });
     * return { payment_id: savedPayment.id.toString(), order_id: order.id };
     */

    return {
      payment_id: savedPayment.id.toString(),
      client_secret: 'MOCK_SECRET_' + savedPayment.id, // Replace with actual gateway response
    };
  }

  /**
   * Verify and confirm payment
   * TODO: Verify with payment gateway
   */
  async verifyPayment(gatewayPaymentId: string, paymentGateway: string): Promise<Payment> {
    /**
     * TODO: Verify with payment gateway
     * 
     * For Stripe:
     * const paymentIntent = await stripe.paymentIntents.retrieve(gatewayPaymentId);
     * if (paymentIntent.status !== 'succeeded') {
     *   throw new BadRequestException('Payment not successful');
     * }
     * 
     * For Razorpay:
     * const payment = await razorpay.payments.fetch(gatewayPaymentId);
     * if (payment.status !== 'captured') {
     *   throw new BadRequestException('Payment not captured');
     * }
     */

    const payment = await this.paymentRepository.findOne({
      where: { gateway_payment_id: gatewayPaymentId },
      relations: ['booking'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Update payment status
    await this.paymentRepository.update(payment.id, {
      status: PaymentStatus.COMPLETED,
      paid_at: new Date(),
    });

    // Update booking status
    await this.bookingRepository.update(payment.booking_id, {
      status: BookingStatus.CONFIRMED,
      confirmed_at: new Date(),
    });

    return await this.paymentRepository.findOne({ where: { id: payment.id } });
  }

  /**
   * Handle payment webhook from gateway
   */
  async handleWebhook(payload: any, signature: string, gateway: string): Promise<void> {
    /**
     * TODO: Verify webhook signature and process event
     * 
     * For Stripe:
     * const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
     * if (event.type === 'payment_intent.succeeded') {
     *   const paymentIntent = event.data.object;
     *   await this.verifyPayment(paymentIntent.id, 'stripe');
     * }
     * 
     * For Razorpay:
     * const isValid = razorpay.webhooks.validateSignature(payload, signature, webhookSecret);
     * if (isValid && payload.event === 'payment.captured') {
     *   await this.verifyPayment(payload.payload.payment.entity.id, 'razorpay');
     * }
     */
  }

  async getPaymentsByUser(userId: number): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { user_id: userId },
      relations: ['booking', 'booking.listing'],
      order: { created_at: 'DESC' },
    });
  }

  async getPaymentById(paymentId: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ['booking', 'booking.listing'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }
}
