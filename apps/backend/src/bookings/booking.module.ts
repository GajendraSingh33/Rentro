import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Booking, Payment, PgListing, User, Offer } from '../typeorm/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Payment, PgListing, User, Offer])],
  controllers: [BookingController, PaymentController],
  providers: [BookingService, PaymentService],
  exports: [BookingService, PaymentService],
})
export class BookingModule {}
