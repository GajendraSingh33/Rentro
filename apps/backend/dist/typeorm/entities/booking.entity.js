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
exports.Booking = exports.BookingStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const pg_listing_entity_1 = require("./pg-listing.entity");
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["CANCELLED"] = "cancelled";
    BookingStatus["COMPLETED"] = "completed";
    BookingStatus["REFUNDED"] = "refunded";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
let Booking = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('bookings'), (0, typeorm_1.Index)(['user_id', 'created_at']), (0, typeorm_1.Index)(['listing_id', 'status']), (0, typeorm_1.Index)(['check_in', 'check_out'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _user_id_decorators;
    let _user_id_initializers = [];
    let _user_id_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _listing_decorators;
    let _listing_initializers = [];
    let _listing_extraInitializers = [];
    let _check_in_decorators;
    let _check_in_initializers = [];
    let _check_in_extraInitializers = [];
    let _check_out_decorators;
    let _check_out_initializers = [];
    let _check_out_extraInitializers = [];
    let _guests_count_decorators;
    let _guests_count_initializers = [];
    let _guests_count_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _total_amount_decorators;
    let _total_amount_initializers = [];
    let _total_amount_extraInitializers = [];
    let _discount_amount_decorators;
    let _discount_amount_initializers = [];
    let _discount_amount_extraInitializers = [];
    let _final_amount_decorators;
    let _final_amount_initializers = [];
    let _final_amount_extraInitializers = [];
    let _security_deposit_decorators;
    let _security_deposit_initializers = [];
    let _security_deposit_extraInitializers = [];
    let _special_requests_decorators;
    let _special_requests_initializers = [];
    let _special_requests_extraInitializers = [];
    let _cancellation_reason_decorators;
    let _cancellation_reason_initializers = [];
    let _cancellation_reason_extraInitializers = [];
    let _confirmed_at_decorators;
    let _confirmed_at_initializers = [];
    let _confirmed_at_extraInitializers = [];
    let _cancelled_at_decorators;
    let _cancelled_at_initializers = [];
    let _cancelled_at_extraInitializers = [];
    let _completed_at_decorators;
    let _completed_at_initializers = [];
    let _completed_at_extraInitializers = [];
    let _refunded_at_decorators;
    let _refunded_at_initializers = [];
    let _refunded_at_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    var Booking = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.user_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_id_initializers, void 0));
            this.user = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.listing_id = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
            this.listing = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _listing_initializers, void 0));
            this.check_in = (__runInitializers(this, _listing_extraInitializers), __runInitializers(this, _check_in_initializers, void 0));
            this.check_out = (__runInitializers(this, _check_in_extraInitializers), __runInitializers(this, _check_out_initializers, void 0));
            this.guests_count = (__runInitializers(this, _check_out_extraInitializers), __runInitializers(this, _guests_count_initializers, void 0));
            this.status = (__runInitializers(this, _guests_count_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.total_amount = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _total_amount_initializers, void 0));
            this.discount_amount = (__runInitializers(this, _total_amount_extraInitializers), __runInitializers(this, _discount_amount_initializers, void 0));
            this.final_amount = (__runInitializers(this, _discount_amount_extraInitializers), __runInitializers(this, _final_amount_initializers, void 0));
            this.security_deposit = (__runInitializers(this, _final_amount_extraInitializers), __runInitializers(this, _security_deposit_initializers, void 0));
            this.special_requests = (__runInitializers(this, _security_deposit_extraInitializers), __runInitializers(this, _special_requests_initializers, void 0));
            this.cancellation_reason = (__runInitializers(this, _special_requests_extraInitializers), __runInitializers(this, _cancellation_reason_initializers, void 0));
            this.confirmed_at = (__runInitializers(this, _cancellation_reason_extraInitializers), __runInitializers(this, _confirmed_at_initializers, void 0));
            this.cancelled_at = (__runInitializers(this, _confirmed_at_extraInitializers), __runInitializers(this, _cancelled_at_initializers, void 0));
            this.completed_at = (__runInitializers(this, _cancelled_at_extraInitializers), __runInitializers(this, _completed_at_initializers, void 0));
            this.refunded_at = (__runInitializers(this, _completed_at_extraInitializers), __runInitializers(this, _refunded_at_initializers, void 0));
            this.created_at = (__runInitializers(this, _refunded_at_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Booking");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _user_id_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'user_id' })];
        _listing_id_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _listing_decorators = [(0, typeorm_1.ManyToOne)(() => pg_listing_entity_1.PgListing, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'listing_id' })];
        _check_in_decorators = [(0, typeorm_1.Column)({ type: 'date' })];
        _check_out_decorators = [(0, typeorm_1.Column)({ type: 'date' })];
        _guests_count_decorators = [(0, typeorm_1.Column)({ type: 'int' })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: BookingStatus,
                default: BookingStatus.PENDING,
            }), (0, typeorm_1.Index)()];
        _total_amount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _discount_amount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 })];
        _final_amount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _security_deposit_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
        _special_requests_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _cancellation_reason_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _confirmed_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _cancelled_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _completed_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _refunded_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: obj => "user_id" in obj, get: obj => obj.user_id, set: (obj, value) => { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
        __esDecorate(null, null, _listing_decorators, { kind: "field", name: "listing", static: false, private: false, access: { has: obj => "listing" in obj, get: obj => obj.listing, set: (obj, value) => { obj.listing = value; } }, metadata: _metadata }, _listing_initializers, _listing_extraInitializers);
        __esDecorate(null, null, _check_in_decorators, { kind: "field", name: "check_in", static: false, private: false, access: { has: obj => "check_in" in obj, get: obj => obj.check_in, set: (obj, value) => { obj.check_in = value; } }, metadata: _metadata }, _check_in_initializers, _check_in_extraInitializers);
        __esDecorate(null, null, _check_out_decorators, { kind: "field", name: "check_out", static: false, private: false, access: { has: obj => "check_out" in obj, get: obj => obj.check_out, set: (obj, value) => { obj.check_out = value; } }, metadata: _metadata }, _check_out_initializers, _check_out_extraInitializers);
        __esDecorate(null, null, _guests_count_decorators, { kind: "field", name: "guests_count", static: false, private: false, access: { has: obj => "guests_count" in obj, get: obj => obj.guests_count, set: (obj, value) => { obj.guests_count = value; } }, metadata: _metadata }, _guests_count_initializers, _guests_count_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _total_amount_decorators, { kind: "field", name: "total_amount", static: false, private: false, access: { has: obj => "total_amount" in obj, get: obj => obj.total_amount, set: (obj, value) => { obj.total_amount = value; } }, metadata: _metadata }, _total_amount_initializers, _total_amount_extraInitializers);
        __esDecorate(null, null, _discount_amount_decorators, { kind: "field", name: "discount_amount", static: false, private: false, access: { has: obj => "discount_amount" in obj, get: obj => obj.discount_amount, set: (obj, value) => { obj.discount_amount = value; } }, metadata: _metadata }, _discount_amount_initializers, _discount_amount_extraInitializers);
        __esDecorate(null, null, _final_amount_decorators, { kind: "field", name: "final_amount", static: false, private: false, access: { has: obj => "final_amount" in obj, get: obj => obj.final_amount, set: (obj, value) => { obj.final_amount = value; } }, metadata: _metadata }, _final_amount_initializers, _final_amount_extraInitializers);
        __esDecorate(null, null, _security_deposit_decorators, { kind: "field", name: "security_deposit", static: false, private: false, access: { has: obj => "security_deposit" in obj, get: obj => obj.security_deposit, set: (obj, value) => { obj.security_deposit = value; } }, metadata: _metadata }, _security_deposit_initializers, _security_deposit_extraInitializers);
        __esDecorate(null, null, _special_requests_decorators, { kind: "field", name: "special_requests", static: false, private: false, access: { has: obj => "special_requests" in obj, get: obj => obj.special_requests, set: (obj, value) => { obj.special_requests = value; } }, metadata: _metadata }, _special_requests_initializers, _special_requests_extraInitializers);
        __esDecorate(null, null, _cancellation_reason_decorators, { kind: "field", name: "cancellation_reason", static: false, private: false, access: { has: obj => "cancellation_reason" in obj, get: obj => obj.cancellation_reason, set: (obj, value) => { obj.cancellation_reason = value; } }, metadata: _metadata }, _cancellation_reason_initializers, _cancellation_reason_extraInitializers);
        __esDecorate(null, null, _confirmed_at_decorators, { kind: "field", name: "confirmed_at", static: false, private: false, access: { has: obj => "confirmed_at" in obj, get: obj => obj.confirmed_at, set: (obj, value) => { obj.confirmed_at = value; } }, metadata: _metadata }, _confirmed_at_initializers, _confirmed_at_extraInitializers);
        __esDecorate(null, null, _cancelled_at_decorators, { kind: "field", name: "cancelled_at", static: false, private: false, access: { has: obj => "cancelled_at" in obj, get: obj => obj.cancelled_at, set: (obj, value) => { obj.cancelled_at = value; } }, metadata: _metadata }, _cancelled_at_initializers, _cancelled_at_extraInitializers);
        __esDecorate(null, null, _completed_at_decorators, { kind: "field", name: "completed_at", static: false, private: false, access: { has: obj => "completed_at" in obj, get: obj => obj.completed_at, set: (obj, value) => { obj.completed_at = value; } }, metadata: _metadata }, _completed_at_initializers, _completed_at_extraInitializers);
        __esDecorate(null, null, _refunded_at_decorators, { kind: "field", name: "refunded_at", static: false, private: false, access: { has: obj => "refunded_at" in obj, get: obj => obj.refunded_at, set: (obj, value) => { obj.refunded_at = value; } }, metadata: _metadata }, _refunded_at_initializers, _refunded_at_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Booking = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Booking = _classThis;
})();
exports.Booking = Booking;
