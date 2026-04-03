import { IsNumber, IsDateString, IsOptional, IsString, Min, IsEnum } from 'class-validator';
import { BookingStatus } from '../../typeorm/entities';

export class CreateBookingDto {
  @IsNumber()
  listing_id: number;

  @IsDateString()
  check_in: string;

  @IsDateString()
  check_out: string;

  @IsNumber()
  @Min(1)
  guests_count: number;

  @IsOptional()
  @IsString()
  special_requests?: string;

  @IsOptional()
  @IsNumber()
  offer_id?: number;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsString()
  cancellation_reason?: string;
}

export class GetBookingsDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsNumber()
  listing_id?: number;

  @IsOptional()
  @IsNumber()
  limit?: number = 20;

  @IsOptional()
  @IsNumber()
  offset?: number = 0;
}

export class InitiatePaymentDto {
  @IsNumber()
  booking_id: number;

  @IsEnum(['stripe', 'razorpay'])
  payment_gateway: string;
}

export class VerifyPaymentDto {
  @IsString()
  gateway_payment_id: string;

  @IsString()
  payment_gateway: string;
}
