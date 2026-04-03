import { Controller, Get, Post, Body, Param, UseGuards, Req, Headers, RawBodyRequest, HttpCode } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { InitiatePaymentDto, VerifyPaymentDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard)
  async initiatePayment(@Req() req, @Body() dto: InitiatePaymentDto) {
    const userId = req.user.sub;
    const result = await this.paymentService.initiatePayment(
      userId,
      dto.booking_id,
      dto.payment_gateway
    );
    return {
      success: true,
      message: 'Payment initiated successfully',
      data: result,
    };
  }

  @Post('verify')
  @UseGuards(JwtAuthGuard)
  async verifyPayment(@Body() dto: VerifyPaymentDto) {
    const payment = await this.paymentService.verifyPayment(
      dto.gateway_payment_id,
      dto.payment_gateway
    );
    return {
      success: true,
      message: 'Payment verified successfully',
      data: payment,
    };
  }

  @Post('webhook/:gateway')
  @HttpCode(200)
  async handleWebhook(
    @Param('gateway') gateway: string,
    @Headers('stripe-signature') stripeSignature: string,
    @Headers('x-razorpay-signature') razorpaySignature: string,
    @Body() payload: any,
  ) {
    const signature = gateway === 'stripe' ? stripeSignature : razorpaySignature;
    await this.paymentService.handleWebhook(payload, signature, gateway);
    return { received: true };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPayments(@Req() req) {
    const userId = req.user.sub;
    const payments = await this.paymentService.getPaymentsByUser(userId);
    return {
      success: true,
      data: payments,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getPaymentById(@Param('id') id: number) {
    const payment = await this.paymentService.getPaymentById(id);
    return {
      success: true,
      data: payment,
    };
  }
}
