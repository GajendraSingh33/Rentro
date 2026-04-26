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
exports.Payment = exports.PaymentMethod = exports.PaymentStatus = void 0;
const typeorm_1 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
const user_entity_1 = require("./user.entity");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PROCESSING"] = "processing";
    PaymentStatus["COMPLETED"] = "completed";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["REFUNDED"] = "refunded";
    PaymentStatus["PARTIALLY_REFUNDED"] = "partially_refunded";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CREDIT_CARD"] = "credit_card";
    PaymentMethod["DEBIT_CARD"] = "debit_card";
    PaymentMethod["UPI"] = "upi";
    PaymentMethod["NET_BANKING"] = "net_banking";
    PaymentMethod["WALLET"] = "wallet";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
let Payment = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('payments'), (0, typeorm_1.Index)(['booking_id']), (0, typeorm_1.Index)(['user_id']), (0, typeorm_1.Index)(['gateway_payment_id']), (0, typeorm_1.Index)(['status', 'created_at'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _booking_id_decorators;
    let _booking_id_initializers = [];
    let _booking_id_extraInitializers = [];
    let _booking_decorators;
    let _booking_initializers = [];
    let _booking_extraInitializers = [];
    let _user_id_decorators;
    let _user_id_initializers = [];
    let _user_id_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _amount_decorators;
    let _amount_initializers = [];
    let _amount_extraInitializers = [];
    let _refund_amount_decorators;
    let _refund_amount_initializers = [];
    let _refund_amount_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _payment_method_decorators;
    let _payment_method_initializers = [];
    let _payment_method_extraInitializers = [];
    let _gateway_payment_id_decorators;
    let _gateway_payment_id_initializers = [];
    let _gateway_payment_id_extraInitializers = [];
    let _payment_gateway_decorators;
    let _payment_gateway_initializers = [];
    let _payment_gateway_extraInitializers = [];
    let _receipt_url_decorators;
    let _receipt_url_initializers = [];
    let _receipt_url_extraInitializers = [];
    let _gateway_response_decorators;
    let _gateway_response_initializers = [];
    let _gateway_response_extraInitializers = [];
    let _failure_reason_decorators;
    let _failure_reason_initializers = [];
    let _failure_reason_extraInitializers = [];
    let _paid_at_decorators;
    let _paid_at_initializers = [];
    let _paid_at_extraInitializers = [];
    let _refunded_at_decorators;
    let _refunded_at_initializers = [];
    let _refunded_at_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    var Payment = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.booking_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _booking_id_initializers, void 0));
            this.booking = (__runInitializers(this, _booking_id_extraInitializers), __runInitializers(this, _booking_initializers, void 0));
            this.user_id = (__runInitializers(this, _booking_extraInitializers), __runInitializers(this, _user_id_initializers, void 0));
            this.user = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.amount = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.refund_amount = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _refund_amount_initializers, void 0));
            this.status = (__runInitializers(this, _refund_amount_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.payment_method = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _payment_method_initializers, void 0));
            this.gateway_payment_id = (__runInitializers(this, _payment_method_extraInitializers), __runInitializers(this, _gateway_payment_id_initializers, void 0)); // Stripe/Razorpay payment ID
            this.payment_gateway = (__runInitializers(this, _gateway_payment_id_extraInitializers), __runInitializers(this, _payment_gateway_initializers, void 0)); // 'stripe' or 'razorpay'
            this.receipt_url = (__runInitializers(this, _payment_gateway_extraInitializers), __runInitializers(this, _receipt_url_initializers, void 0));
            this.gateway_response = (__runInitializers(this, _receipt_url_extraInitializers), __runInitializers(this, _gateway_response_initializers, void 0));
            this.failure_reason = (__runInitializers(this, _gateway_response_extraInitializers), __runInitializers(this, _failure_reason_initializers, void 0));
            this.paid_at = (__runInitializers(this, _failure_reason_extraInitializers), __runInitializers(this, _paid_at_initializers, void 0));
            this.refunded_at = (__runInitializers(this, _paid_at_extraInitializers), __runInitializers(this, _refunded_at_initializers, void 0));
            this.created_at = (__runInitializers(this, _refunded_at_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Payment");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _booking_id_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _booking_decorators = [(0, typeorm_1.ManyToOne)(() => booking_entity_1.Booking, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'booking_id' })];
        _user_id_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'user_id' })];
        _amount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _refund_amount_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: PaymentStatus,
                default: PaymentStatus.PENDING,
            }), (0, typeorm_1.Index)()];
        _payment_method_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: PaymentMethod,
            })];
        _gateway_payment_id_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, unique: true }), (0, typeorm_1.Index)()];
        _payment_gateway_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'stripe' })];
        _receipt_url_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
        _gateway_response_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _failure_reason_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _paid_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _refunded_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _booking_id_decorators, { kind: "field", name: "booking_id", static: false, private: false, access: { has: obj => "booking_id" in obj, get: obj => obj.booking_id, set: (obj, value) => { obj.booking_id = value; } }, metadata: _metadata }, _booking_id_initializers, _booking_id_extraInitializers);
        __esDecorate(null, null, _booking_decorators, { kind: "field", name: "booking", static: false, private: false, access: { has: obj => "booking" in obj, get: obj => obj.booking, set: (obj, value) => { obj.booking = value; } }, metadata: _metadata }, _booking_initializers, _booking_extraInitializers);
        __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: obj => "user_id" in obj, get: obj => obj.user_id, set: (obj, value) => { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: obj => "amount" in obj, get: obj => obj.amount, set: (obj, value) => { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _refund_amount_decorators, { kind: "field", name: "refund_amount", static: false, private: false, access: { has: obj => "refund_amount" in obj, get: obj => obj.refund_amount, set: (obj, value) => { obj.refund_amount = value; } }, metadata: _metadata }, _refund_amount_initializers, _refund_amount_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _payment_method_decorators, { kind: "field", name: "payment_method", static: false, private: false, access: { has: obj => "payment_method" in obj, get: obj => obj.payment_method, set: (obj, value) => { obj.payment_method = value; } }, metadata: _metadata }, _payment_method_initializers, _payment_method_extraInitializers);
        __esDecorate(null, null, _gateway_payment_id_decorators, { kind: "field", name: "gateway_payment_id", static: false, private: false, access: { has: obj => "gateway_payment_id" in obj, get: obj => obj.gateway_payment_id, set: (obj, value) => { obj.gateway_payment_id = value; } }, metadata: _metadata }, _gateway_payment_id_initializers, _gateway_payment_id_extraInitializers);
        __esDecorate(null, null, _payment_gateway_decorators, { kind: "field", name: "payment_gateway", static: false, private: false, access: { has: obj => "payment_gateway" in obj, get: obj => obj.payment_gateway, set: (obj, value) => { obj.payment_gateway = value; } }, metadata: _metadata }, _payment_gateway_initializers, _payment_gateway_extraInitializers);
        __esDecorate(null, null, _receipt_url_decorators, { kind: "field", name: "receipt_url", static: false, private: false, access: { has: obj => "receipt_url" in obj, get: obj => obj.receipt_url, set: (obj, value) => { obj.receipt_url = value; } }, metadata: _metadata }, _receipt_url_initializers, _receipt_url_extraInitializers);
        __esDecorate(null, null, _gateway_response_decorators, { kind: "field", name: "gateway_response", static: false, private: false, access: { has: obj => "gateway_response" in obj, get: obj => obj.gateway_response, set: (obj, value) => { obj.gateway_response = value; } }, metadata: _metadata }, _gateway_response_initializers, _gateway_response_extraInitializers);
        __esDecorate(null, null, _failure_reason_decorators, { kind: "field", name: "failure_reason", static: false, private: false, access: { has: obj => "failure_reason" in obj, get: obj => obj.failure_reason, set: (obj, value) => { obj.failure_reason = value; } }, metadata: _metadata }, _failure_reason_initializers, _failure_reason_extraInitializers);
        __esDecorate(null, null, _paid_at_decorators, { kind: "field", name: "paid_at", static: false, private: false, access: { has: obj => "paid_at" in obj, get: obj => obj.paid_at, set: (obj, value) => { obj.paid_at = value; } }, metadata: _metadata }, _paid_at_initializers, _paid_at_extraInitializers);
        __esDecorate(null, null, _refunded_at_decorators, { kind: "field", name: "refunded_at", static: false, private: false, access: { has: obj => "refunded_at" in obj, get: obj => obj.refunded_at, set: (obj, value) => { obj.refunded_at = value; } }, metadata: _metadata }, _refunded_at_initializers, _refunded_at_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Payment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Payment = _classThis;
})();
exports.Payment = Payment;
