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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PaymentController = (() => {
    let _classDecorators = [(0, common_1.Controller)('payments')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _initiatePayment_decorators;
    let _verifyPayment_decorators;
    let _handleWebhook_decorators;
    let _getPayments_decorators;
    let _getPaymentById_decorators;
    var PaymentController = _classThis = class {
        constructor(paymentService) {
            this.paymentService = (__runInitializers(this, _instanceExtraInitializers), paymentService);
        }
        async initiatePayment(req, dto) {
            const userId = req.user.sub;
            const result = await this.paymentService.initiatePayment(userId, dto.booking_id, dto.payment_gateway);
            return {
                success: true,
                message: 'Payment initiated successfully',
                data: result,
            };
        }
        async verifyPayment(dto) {
            const payment = await this.paymentService.verifyPayment(dto.gateway_payment_id, dto.payment_gateway);
            return {
                success: true,
                message: 'Payment verified successfully',
                data: payment,
            };
        }
        async handleWebhook(gateway, stripeSignature, razorpaySignature, payload) {
            const signature = gateway === 'stripe' ? stripeSignature : razorpaySignature;
            await this.paymentService.handleWebhook(payload, signature, gateway);
            return { received: true };
        }
        async getPayments(req) {
            const userId = req.user.sub;
            const payments = await this.paymentService.getPaymentsByUser(userId);
            return {
                success: true,
                data: payments,
            };
        }
        async getPaymentById(id) {
            const payment = await this.paymentService.getPaymentById(id);
            return {
                success: true,
                data: payment,
            };
        }
    };
    __setFunctionName(_classThis, "PaymentController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _initiatePayment_decorators = [(0, common_1.Post)('initiate'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _verifyPayment_decorators = [(0, common_1.Post)('verify'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _handleWebhook_decorators = [(0, common_1.Post)('webhook/:gateway'), (0, common_1.HttpCode)(200)];
        _getPayments_decorators = [(0, common_1.Get)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _getPaymentById_decorators = [(0, common_1.Get)(':id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        __esDecorate(_classThis, null, _initiatePayment_decorators, { kind: "method", name: "initiatePayment", static: false, private: false, access: { has: obj => "initiatePayment" in obj, get: obj => obj.initiatePayment }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyPayment_decorators, { kind: "method", name: "verifyPayment", static: false, private: false, access: { has: obj => "verifyPayment" in obj, get: obj => obj.verifyPayment }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleWebhook_decorators, { kind: "method", name: "handleWebhook", static: false, private: false, access: { has: obj => "handleWebhook" in obj, get: obj => obj.handleWebhook }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPayments_decorators, { kind: "method", name: "getPayments", static: false, private: false, access: { has: obj => "getPayments" in obj, get: obj => obj.getPayments }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPaymentById_decorators, { kind: "method", name: "getPaymentById", static: false, private: false, access: { has: obj => "getPaymentById" in obj, get: obj => obj.getPaymentById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentController = _classThis;
})();
exports.PaymentController = PaymentController;
