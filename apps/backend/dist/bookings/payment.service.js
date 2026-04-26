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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../typeorm/entities");
let PaymentService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PaymentService = _classThis = class {
        constructor(paymentRepository, bookingRepository) {
            this.paymentRepository = paymentRepository;
            this.bookingRepository = bookingRepository;
        }
        /**
         * Initialize payment (Stripe/Razorpay integration point)
         * TODO: Integrate with actual payment gateways
         */
        async initiatePayment(userId, bookingId, paymentGateway) {
            const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
            if (!booking) {
                throw new common_1.NotFoundException('Booking not found');
            }
            // Create payment record
            const payment = this.paymentRepository.create({
                booking_id: bookingId,
                user_id: userId,
                amount: booking.final_amount,
                status: entities_1.PaymentStatus.PENDING,
                payment_gateway: paymentGateway,
                payment_method: entities_1.PaymentMethod.CREDIT_CARD, // Will be updated based on user selection
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
        async verifyPayment(gatewayPaymentId, paymentGateway) {
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
                throw new common_1.NotFoundException('Payment not found');
            }
            // Update payment status
            await this.paymentRepository.update(payment.id, {
                status: entities_1.PaymentStatus.COMPLETED,
                paid_at: new Date(),
            });
            // Update booking status
            await this.bookingRepository.update(payment.booking_id, {
                status: entities_1.BookingStatus.CONFIRMED,
                confirmed_at: new Date(),
            });
            return await this.paymentRepository.findOne({ where: { id: payment.id } });
        }
        /**
         * Handle payment webhook from gateway
         */
        async handleWebhook(payload, signature, gateway) {
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
        async getPaymentsByUser(userId) {
            return await this.paymentRepository.find({
                where: { user_id: userId },
                relations: ['booking', 'booking.listing'],
                order: { created_at: 'DESC' },
            });
        }
        async getPaymentById(paymentId) {
            const payment = await this.paymentRepository.findOne({
                where: { id: paymentId },
                relations: ['booking', 'booking.listing'],
            });
            if (!payment) {
                throw new common_1.NotFoundException('Payment not found');
            }
            return payment;
        }
    };
    __setFunctionName(_classThis, "PaymentService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentService = _classThis;
})();
exports.PaymentService = PaymentService;
