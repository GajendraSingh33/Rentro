"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let BookingController = (() => {
    let _classDecorators = [(0, common_1.Controller)('bookings'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createBooking_decorators;
    let _getUserBookings_decorators;
    let _getOwnerBookings_decorators;
    let _getBookingById_decorators;
    let _cancelBooking_decorators;
    let _completeBooking_decorators;
    var BookingController = _classThis = class {
        constructor(bookingService) {
            this.bookingService = (__runInitializers(this, _instanceExtraInitializers), bookingService);
        }
        async createBooking(req, dto) {
            const userId = req.user.sub;
            const booking = await this.bookingService.createBooking(userId, dto);
            return {
                success: true,
                message: 'Booking created successfully',
                data: booking,
            };
        }
        async getUserBookings(req, dto) {
            const userId = req.user.sub;
            const bookings = await this.bookingService.getUserBookings(userId, dto);
            return {
                success: true,
                data: bookings,
            };
        }
        async getOwnerBookings(req, dto) {
            const ownerId = req.user.sub;
            const bookings = await this.bookingService.getOwnerBookings(ownerId, dto);
            return {
                success: true,
                data: bookings,
            };
        }
        async getBookingById(req, id) {
            const userId = req.user.sub;
            const booking = await this.bookingService.getBookingById(id, userId);
            return {
                success: true,
                data: booking,
            };
        }
        async cancelBooking(req, id, reason) {
            const userId = req.user.sub;
            const booking = await this.bookingService.cancelBooking(userId, id, reason);
            return {
                success: true,
                message: 'Booking cancelled successfully',
                data: booking,
            };
        }
        async completeBooking(id) {
            const booking = await this.bookingService.completeBooking(id);
            return {
                success: true,
                message: 'Booking marked as completed',
                data: booking,
            };
        }
    };
    __setFunctionName(_classThis, "BookingController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createBooking_decorators = [(0, common_1.Post)()];
        _getUserBookings_decorators = [(0, common_1.Get)()];
        _getOwnerBookings_decorators = [(0, common_1.Get)('owner')];
        _getBookingById_decorators = [(0, common_1.Get)(':id')];
        _cancelBooking_decorators = [(0, common_1.Put)(':id/cancel')];
        _completeBooking_decorators = [(0, common_1.Put)(':id/complete')];
        __esDecorate(_classThis, null, _createBooking_decorators, { kind: "method", name: "createBooking", static: false, private: false, access: { has: obj => "createBooking" in obj, get: obj => obj.createBooking }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserBookings_decorators, { kind: "method", name: "getUserBookings", static: false, private: false, access: { has: obj => "getUserBookings" in obj, get: obj => obj.getUserBookings }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOwnerBookings_decorators, { kind: "method", name: "getOwnerBookings", static: false, private: false, access: { has: obj => "getOwnerBookings" in obj, get: obj => obj.getOwnerBookings }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBookingById_decorators, { kind: "method", name: "getBookingById", static: false, private: false, access: { has: obj => "getBookingById" in obj, get: obj => obj.getBookingById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancelBooking_decorators, { kind: "method", name: "cancelBooking", static: false, private: false, access: { has: obj => "cancelBooking" in obj, get: obj => obj.cancelBooking }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _completeBooking_decorators, { kind: "method", name: "completeBooking", static: false, private: false, access: { has: obj => "completeBooking" in obj, get: obj => obj.completeBooking }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingController = _classThis;
})();
exports.BookingController = BookingController;
