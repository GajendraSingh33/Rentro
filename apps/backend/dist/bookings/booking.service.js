"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../typeorm/entities");
let BookingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BookingService = _classThis = class {
        constructor(bookingRepository, paymentRepository, listingRepository, offerRepository) {
            this.bookingRepository = bookingRepository;
            this.paymentRepository = paymentRepository;
            this.listingRepository = listingRepository;
            this.offerRepository = offerRepository;
        }
        async createBooking(userId, dto) {
            // Verify listing exists
            const listing = await this.listingRepository.findOne({ where: { id: dto.listing_id } });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            // Validate dates
            const checkIn = new Date(dto.check_in);
            const checkOut = new Date(dto.check_out);
            if (checkIn >= checkOut) {
                throw new common_1.BadRequestException('Check-out date must be after check-in date');
            }
            if (checkIn < new Date()) {
                throw new common_1.BadRequestException('Check-in date cannot be in the past');
            }
            // Check availability
            const conflictingBooking = await this.bookingRepository
                .createQueryBuilder('booking')
                .where('booking.listing_id = :listingId', { listingId: dto.listing_id })
                .andWhere('booking.status IN (:...statuses)', { statuses: [entities_1.BookingStatus.CONFIRMED, entities_1.BookingStatus.PENDING] })
                .andWhere('(booking.check_in BETWEEN :checkIn AND :checkOut OR booking.check_out BETWEEN :checkIn AND :checkOut)', { checkIn, checkOut })
                .getOne();
            if (conflictingBooking) {
                throw new common_1.BadRequestException('Listing is not available for selected dates');
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
                status: entities_1.BookingStatus.PENDING,
            });
            return await this.bookingRepository.save(booking);
        }
        async getUserBookings(userId, dto) {
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
        async getOwnerBookings(ownerId, dto) {
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
        async getBookingById(bookingId, userId) {
            const booking = await this.bookingRepository.findOne({
                where: { id: bookingId },
                relations: ['listing', 'listing.owner', 'user'],
            });
            if (!booking) {
                throw new common_1.NotFoundException('Booking not found');
            }
            // Verify user has access
            if (booking.user_id !== userId && booking.listing.owner_id !== userId) {
                throw new common_1.ForbiddenException('You do not have access to this booking');
            }
            return booking;
        }
        async confirmBooking(bookingId, paymentId) {
            const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
            if (!booking) {
                throw new common_1.NotFoundException('Booking not found');
            }
            await this.bookingRepository.update(bookingId, {
                status: entities_1.BookingStatus.CONFIRMED,
                confirmed_at: new Date(),
            });
            return await this.bookingRepository.findOne({ where: { id: bookingId } });
        }
        async cancelBooking(userId, bookingId, reason) {
            const booking = await this.getBookingById(bookingId, userId);
            if (booking.status !== entities_1.BookingStatus.PENDING && booking.status !== entities_1.BookingStatus.CONFIRMED) {
                throw new common_1.BadRequestException('Cannot cancel this booking');
            }
            await this.bookingRepository.update(bookingId, {
                status: entities_1.BookingStatus.CANCELLED,
                cancelled_at: new Date(),
                cancellation_reason: reason,
            });
            // Process refund if payment was made
            const payment = await this.paymentRepository.findOne({
                where: { booking_id: bookingId, status: entities_1.PaymentStatus.COMPLETED },
            });
            if (payment) {
                // TODO: Integrate with payment gateway for refund
                await this.paymentRepository.update(payment.id, {
                    status: entities_1.PaymentStatus.REFUNDED,
                    refund_amount: payment.amount,
                    refunded_at: new Date(),
                });
            }
            return await this.bookingRepository.findOne({ where: { id: bookingId } });
        }
        async completeBooking(bookingId) {
            await this.bookingRepository.update(bookingId, {
                status: entities_1.BookingStatus.COMPLETED,
                completed_at: new Date(),
            });
            return await this.bookingRepository.findOne({ where: { id: bookingId } });
        }
    };
    __setFunctionName(_classThis, "BookingService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingService = _classThis;
})();
exports.BookingService = BookingService;
