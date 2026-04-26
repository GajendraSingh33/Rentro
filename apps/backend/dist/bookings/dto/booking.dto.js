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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyPaymentDto = exports.InitiatePaymentDto = exports.GetBookingsDto = exports.UpdateBookingDto = exports.CreateBookingDto = void 0;
const class_validator_1 = require("class-validator");
const entities_1 = require("../../typeorm/entities");
let CreateBookingDto = (() => {
    var _a;
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _check_in_decorators;
    let _check_in_initializers = [];
    let _check_in_extraInitializers = [];
    let _check_out_decorators;
    let _check_out_initializers = [];
    let _check_out_extraInitializers = [];
    let _guests_count_decorators;
    let _guests_count_initializers = [];
    let _guests_count_extraInitializers = [];
    let _special_requests_decorators;
    let _special_requests_initializers = [];
    let _special_requests_extraInitializers = [];
    let _offer_id_decorators;
    let _offer_id_initializers = [];
    let _offer_id_extraInitializers = [];
    return _a = class CreateBookingDto {
            constructor() {
                this.listing_id = __runInitializers(this, _listing_id_initializers, void 0);
                this.check_in = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _check_in_initializers, void 0));
                this.check_out = (__runInitializers(this, _check_in_extraInitializers), __runInitializers(this, _check_out_initializers, void 0));
                this.guests_count = (__runInitializers(this, _check_out_extraInitializers), __runInitializers(this, _guests_count_initializers, void 0));
                this.special_requests = (__runInitializers(this, _guests_count_extraInitializers), __runInitializers(this, _special_requests_initializers, void 0));
                this.offer_id = (__runInitializers(this, _special_requests_extraInitializers), __runInitializers(this, _offer_id_initializers, void 0));
                __runInitializers(this, _offer_id_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listing_id_decorators = [(0, class_validator_1.IsNumber)()];
            _check_in_decorators = [(0, class_validator_1.IsDateString)()];
            _check_out_decorators = [(0, class_validator_1.IsDateString)()];
            _guests_count_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _special_requests_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _offer_id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
            __esDecorate(null, null, _check_in_decorators, { kind: "field", name: "check_in", static: false, private: false, access: { has: obj => "check_in" in obj, get: obj => obj.check_in, set: (obj, value) => { obj.check_in = value; } }, metadata: _metadata }, _check_in_initializers, _check_in_extraInitializers);
            __esDecorate(null, null, _check_out_decorators, { kind: "field", name: "check_out", static: false, private: false, access: { has: obj => "check_out" in obj, get: obj => obj.check_out, set: (obj, value) => { obj.check_out = value; } }, metadata: _metadata }, _check_out_initializers, _check_out_extraInitializers);
            __esDecorate(null, null, _guests_count_decorators, { kind: "field", name: "guests_count", static: false, private: false, access: { has: obj => "guests_count" in obj, get: obj => obj.guests_count, set: (obj, value) => { obj.guests_count = value; } }, metadata: _metadata }, _guests_count_initializers, _guests_count_extraInitializers);
            __esDecorate(null, null, _special_requests_decorators, { kind: "field", name: "special_requests", static: false, private: false, access: { has: obj => "special_requests" in obj, get: obj => obj.special_requests, set: (obj, value) => { obj.special_requests = value; } }, metadata: _metadata }, _special_requests_initializers, _special_requests_extraInitializers);
            __esDecorate(null, null, _offer_id_decorators, { kind: "field", name: "offer_id", static: false, private: false, access: { has: obj => "offer_id" in obj, get: obj => obj.offer_id, set: (obj, value) => { obj.offer_id = value; } }, metadata: _metadata }, _offer_id_initializers, _offer_id_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.CreateBookingDto = CreateBookingDto;
let UpdateBookingDto = (() => {
    var _a;
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _cancellation_reason_decorators;
    let _cancellation_reason_initializers = [];
    let _cancellation_reason_extraInitializers = [];
    return _a = class UpdateBookingDto {
            constructor() {
                this.status = __runInitializers(this, _status_initializers, void 0);
                this.cancellation_reason = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _cancellation_reason_initializers, void 0));
                __runInitializers(this, _cancellation_reason_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(entities_1.BookingStatus)];
            _cancellation_reason_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _cancellation_reason_decorators, { kind: "field", name: "cancellation_reason", static: false, private: false, access: { has: obj => "cancellation_reason" in obj, get: obj => obj.cancellation_reason, set: (obj, value) => { obj.cancellation_reason = value; } }, metadata: _metadata }, _cancellation_reason_initializers, _cancellation_reason_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UpdateBookingDto = UpdateBookingDto;
let GetBookingsDto = (() => {
    var _a;
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    let _offset_decorators;
    let _offset_initializers = [];
    let _offset_extraInitializers = [];
    return _a = class GetBookingsDto {
            constructor() {
                this.status = __runInitializers(this, _status_initializers, void 0);
                this.listing_id = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
                this.limit = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _limit_initializers, 20));
                this.offset = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _offset_initializers, 0));
                __runInitializers(this, _offset_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(entities_1.BookingStatus)];
            _listing_id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _offset_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: obj => "offset" in obj, get: obj => obj.offset, set: (obj, value) => { obj.offset = value; } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.GetBookingsDto = GetBookingsDto;
let InitiatePaymentDto = (() => {
    var _a;
    let _booking_id_decorators;
    let _booking_id_initializers = [];
    let _booking_id_extraInitializers = [];
    let _payment_gateway_decorators;
    let _payment_gateway_initializers = [];
    let _payment_gateway_extraInitializers = [];
    return _a = class InitiatePaymentDto {
            constructor() {
                this.booking_id = __runInitializers(this, _booking_id_initializers, void 0);
                this.payment_gateway = (__runInitializers(this, _booking_id_extraInitializers), __runInitializers(this, _payment_gateway_initializers, void 0));
                __runInitializers(this, _payment_gateway_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _booking_id_decorators = [(0, class_validator_1.IsNumber)()];
            _payment_gateway_decorators = [(0, class_validator_1.IsEnum)(['stripe', 'razorpay'])];
            __esDecorate(null, null, _booking_id_decorators, { kind: "field", name: "booking_id", static: false, private: false, access: { has: obj => "booking_id" in obj, get: obj => obj.booking_id, set: (obj, value) => { obj.booking_id = value; } }, metadata: _metadata }, _booking_id_initializers, _booking_id_extraInitializers);
            __esDecorate(null, null, _payment_gateway_decorators, { kind: "field", name: "payment_gateway", static: false, private: false, access: { has: obj => "payment_gateway" in obj, get: obj => obj.payment_gateway, set: (obj, value) => { obj.payment_gateway = value; } }, metadata: _metadata }, _payment_gateway_initializers, _payment_gateway_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.InitiatePaymentDto = InitiatePaymentDto;
let VerifyPaymentDto = (() => {
    var _a;
    let _gateway_payment_id_decorators;
    let _gateway_payment_id_initializers = [];
    let _gateway_payment_id_extraInitializers = [];
    let _payment_gateway_decorators;
    let _payment_gateway_initializers = [];
    let _payment_gateway_extraInitializers = [];
    return _a = class VerifyPaymentDto {
            constructor() {
                this.gateway_payment_id = __runInitializers(this, _gateway_payment_id_initializers, void 0);
                this.payment_gateway = (__runInitializers(this, _gateway_payment_id_extraInitializers), __runInitializers(this, _payment_gateway_initializers, void 0));
                __runInitializers(this, _payment_gateway_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _gateway_payment_id_decorators = [(0, class_validator_1.IsString)()];
            _payment_gateway_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _gateway_payment_id_decorators, { kind: "field", name: "gateway_payment_id", static: false, private: false, access: { has: obj => "gateway_payment_id" in obj, get: obj => obj.gateway_payment_id, set: (obj, value) => { obj.gateway_payment_id = value; } }, metadata: _metadata }, _gateway_payment_id_initializers, _gateway_payment_id_extraInitializers);
            __esDecorate(null, null, _payment_gateway_decorators, { kind: "field", name: "payment_gateway", static: false, private: false, access: { has: obj => "payment_gateway" in obj, get: obj => obj.payment_gateway, set: (obj, value) => { obj.payment_gateway = value; } }, metadata: _metadata }, _payment_gateway_initializers, _payment_gateway_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.VerifyPaymentDto = VerifyPaymentDto;
