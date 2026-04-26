"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let NotificationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NotificationService = _classThis = class {
        constructor(configService) {
            this.configService = configService;
            this.transporter = nodemailer.createTransport({
                host: this.configService.get('SMTP_HOST') || 'smtp.gmail.com',
                port: parseInt(this.configService.get('SMTP_PORT') || '587'),
                secure: false,
                auth: {
                    user: this.configService.get('SMTP_USER'),
                    pass: this.configService.get('SMTP_PASS'),
                },
            });
        }
        async sendEmail(payload) {
            try {
                await this.transporter.sendMail({
                    from: this.configService.get('SMTP_FROM') || 'noreply@rentro.com',
                    to: payload.to,
                    subject: payload.subject,
                    html: payload.html,
                    text: payload.text,
                });
                return true;
            }
            catch (error) {
                console.error('Email send error:', error);
                return false;
            }
        }
        async sendNewInquiryNotification(ownerEmail, data) {
            return this.sendEmail({
                to: ownerEmail,
                subject: `New Inquiry: ${data.listingTitle}`,
                html: `
        <h2>New Inquiry Received</h2>
        <p><strong>From:</strong> ${data.seekerName}</p>
        <p><strong>Listing:</strong> ${data.listingTitle}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${data.message}</blockquote>
        <p><a href="${this.configService.get('APP_URL')}/owner/inquiries">View Inquiry</a></p>
      `,
            });
        }
        async sendInquiryResponseNotification(seekerEmail, data) {
            return this.sendEmail({
                to: seekerEmail,
                subject: `Response to your inquiry: ${data.listingTitle}`,
                html: `
        <h2>You have a response!</h2>
        <p>The owner of <strong>${data.listingTitle}</strong> has responded to your inquiry:</p>
        <blockquote>${data.response}</blockquote>
        <p><a href="${this.configService.get('APP_URL')}/inquiries">View Full Conversation</a></p>
      `,
            });
        }
        async sendListingApprovedNotification(ownerEmail, data) {
            return this.sendEmail({
                to: ownerEmail,
                subject: `Your listing has been approved: ${data.listingTitle}`,
                html: `
        <h2>Listing Approved! 🎉</h2>
        <p>Great news! Your listing <strong>${data.listingTitle}</strong> has been approved and is now live.</p>
        <p><a href="${this.configService.get('APP_URL')}/listings/${data.listingId}">View Your Listing</a></p>
      `,
            });
        }
        async sendListingRejectedNotification(ownerEmail, data) {
            return this.sendEmail({
                to: ownerEmail,
                subject: `Listing requires changes: ${data.listingTitle}`,
                html: `
        <h2>Listing Not Approved</h2>
        <p>Your listing <strong>${data.listingTitle}</strong> requires some changes before it can go live.</p>
        <p><strong>Reason:</strong></p>
        <blockquote>${data.reason}</blockquote>
        <p><a href="${this.configService.get('APP_URL')}/owner/listings">Edit Your Listing</a></p>
      `,
            });
        }
    };
    __setFunctionName(_classThis, "NotificationService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationService = _classThis;
})();
exports.NotificationService = NotificationService;
