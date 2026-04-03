import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan, Between } from 'typeorm';
import { Booking, BookingStatus, Payment, PaymentStatus, PgListing, User, Offer } from '../typeorm/entities';
import { CreateBookingDto, UpdateBookingDto, GetBookingsDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(PgListing)
    private listingRepository: Repository<PgListing>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async createBooking(userId: number, dto: CreateBookingDto): Promise<Booking> {
    // Verify listing exists
    const listing = await this.listingRepository.findOne({ where: { id: dto.listing_id } });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    // Validate dates
    const checkIn = new Date(dto.check_in);
    const checkOut = new Date(dto.check_out);
    if (checkIn >= checkOut) {
      throw new BadRequestException('Check-out date must be after check-in date');
    }
    if (checkIn < new Date()) {
      throw new BadRequestException('Check-in date cannot be in the past');
    }

    // Check availability
    const conflictingBooking = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.listing_id = :listingId', { listingId: dto.listing_id })
      .andWhere('booking.status IN (:...statuses)', { statuses: [BookingStatus.CONFIRMED, BookingStatus.PENDING] })
      .andWhere(
        '(booking.check_in BETWEEN :checkIn AND :checkOut OR booking.check_out BETWEEN :checkIn AND :checkOut)',
        { checkIn, checkOut }
      )
      .getOne();

    if (conflictingBooking) {
      throw new BadRequestException('Listing is not available for selected dates');
    }

    // Calculate amount
    const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    let totalAmount = listing.price * days;
    let discountAmount = 0;

    // Apply offer if provided
    if (dto.offer_id) {
      const offer = await this.offerRepository.findOne({ where: { id: dto.offer_id } });
      if (offer && offer.status === 'active') {
        discountAmount = (totalAmount * offer.discount_percent) / 100;
        await this.offerRepository.update(offer.id, {
          redemptions_count: offer.redemptions_count + 1,
        });
      }
    }

    const finalAmount = totalAmount - discountAmount;

    // Create booking
    const booking = this.bookingRepository.create({
      user_id: userId,
      listing_id: dto.listing_id,
      check_in: checkIn,
      check_out: checkOut,
      guests_count: dto.guests_count,
      total_amount: totalAmount,
      discount_amount: discountAmount,
      final_amount: finalAmount,
      security_deposit: listing.deposit_amount,
      special_requests: dto.special_requests,
      status: BookingStatus.PENDING,
    });

    return await this.bookingRepository.save(booking);
  }

  async getUserBookings(userId: number, dto?: GetBookingsDto): Promise<Booking[]> {
    const query = this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.listing', 'listing')
      .leftJoinAndSelect('listing.owner', 'owner')
      .where('booking.user_id = :userId', { userId });

    if (dto?.status) {
      query.andWhere('booking.status = :status', { status: dto.status });
    }

    if (dto?.listing_id) {
      query.andWhere('booking.listing_id = :listingId', { listingId: dto.listing_id });
    }

    query.orderBy('booking.created_at', 'DESC');
    query.limit(dto?.limit || 20);
    query.offset(dto?.offset || 0);

    return await query.getMany();
  }

  async getOwnerBookings(ownerId: number, dto?: GetBookingsDto): Promise<Booking[]> {
    const query = this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.listing', 'listing')
      .leftJoinAndSelect('booking.user', 'user')
      .where('listing.owner_id = :ownerId', { ownerId });

    if (dto?.status) {
      query.andWhere('booking.status = :status', { status: dto.status });
    }

    if (dto?.listing_id) {
      query.andWhere('booking.listing_id = :listingId', { listingId: dto.listing_id });
    }

    query.orderBy('booking.created_at', 'DESC');
    query.limit(dto?.limit || 20);
    query.offset(dto?.offset || 0);

    return await query.getMany();
  }

  async getBookingById(bookingId: number, userId: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['listing', 'listing.owner', 'user'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Verify user has access
    if (booking.user_id !== userId && booking.listing.owner_id !== userId) {
      throw new ForbiddenException('You do not have access to this booking');
    }

    return booking;
  }

  async confirmBooking(bookingId: number, paymentId: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    await this.bookingRepository.update(bookingId, {
      status: BookingStatus.CONFIRMED,
      confirmed_at: new Date(),
    });

    return await this.bookingRepository.findOne({ where: { id: bookingId } });
  }

  async cancelBooking(userId: number, bookingId: number, reason: string): Promise<Booking> {
    const booking = await this.getBookingById(bookingId, userId);

    if (booking.status !== BookingStatus.PENDING && booking.status !== BookingStatus.CONFIRMED) {
      throw new BadRequestException('Cannot cancel this booking');
    }

    await this.bookingRepository.update(bookingId, {
      status: BookingStatus.CANCELLED,
      cancelled_at: new Date(),
      cancellation_reason: reason,
    });

    // Process refund if payment was made
    const payment = await this.paymentRepository.findOne({
      where: { booking_id: bookingId, status: PaymentStatus.COMPLETED },
    });

    if (payment) {
      // TODO: Integrate with payment gateway for refund
      await this.paymentRepository.update(payment.id, {
        status: PaymentStatus.REFUNDED,
        refund_amount: payment.amount,
        refunded_at: new Date(),
      });
    }

    return await this.bookingRepository.findOne({ where: { id: bookingId } });
  }

  async completeBooking(bookingId: number): Promise<Booking> {
    await this.bookingRepository.update(bookingId, {
      status: BookingStatus.COMPLETED,
      completed_at: new Date(),
    });

    return await this.bookingRepository.findOne({ where: { id: bookingId } });
  }
}
