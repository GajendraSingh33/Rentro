import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto, GetBookingsDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Req() req, @Body() dto: CreateBookingDto) {
    const userId = req.user.sub;
    const booking = await this.bookingService.createBooking(userId, dto);
    return {
      success: true,
      message: 'Booking created successfully',
      data: booking,
    };
  }

  @Get()
  async getUserBookings(@Req() req, @Query() dto: GetBookingsDto) {
    const userId = req.user.sub;
    const bookings = await this.bookingService.getUserBookings(userId, dto);
    return {
      success: true,
      data: bookings,
    };
  }

  @Get('owner')
  async getOwnerBookings(@Req() req, @Query() dto: GetBookingsDto) {
    const ownerId = req.user.sub;
    const bookings = await this.bookingService.getOwnerBookings(ownerId, dto);
    return {
      success: true,
      data: bookings,
    };
  }

  @Get(':id')
  async getBookingById(@Req() req, @Param('id') id: number) {
    const userId = req.user.sub;
    const booking = await this.bookingService.getBookingById(id, userId);
    return {
      success: true,
      data: booking,
    };
  }

  @Put(':id/cancel')
  async cancelBooking(@Req() req, @Param('id') id: number, @Body('reason') reason: string) {
    const userId = req.user.sub;
    const booking = await this.bookingService.cancelBooking(userId, id, reason);
    return {
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    };
  }

  @Put(':id/complete')
  async completeBooking(@Param('id') id: number) {
    const booking = await this.bookingService.completeBooking(id);
    return {
      success: true,
      message: 'Booking marked as completed',
      data: booking,
    };
  }
}
