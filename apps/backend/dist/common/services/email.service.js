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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EmailService = _classThis = class {
        constructor() {
            this.logger = new common_1.Logger(EmailService.name);
            this.initializeTransporter();
        }
        initializeTransporter() {
            // For development, use Ethereal (fake SMTP service)
            if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_HOST) {
                this.logger.warn('Using Ethereal email service for development. Set EMAIL_HOST for production!');
                // In production, configure with real email service
                this.transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'your_ethereal_email@ethereal.email',
                        pass: 'your_ethereal_password',
                    },
                });
            }
            else {
                // Production configuration
                this.transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: parseInt(process.env.EMAIL_PORT || '587'),
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });
            }
        }
        async sendEmail(options) {
            try {
                const info = await this.transporter.sendMail({
                    from: process.env.EMAIL_FROM || 'noreply@rentro.com',
                    to: options.to,
                    subject: options.subject,
                    html: options.html,
                    text: options.text,
                });
                this.logger.log(`Email sent to ${options.to}. Message ID: ${info.messageId}`);
            }
            catch (error) {
                this.logger.error(`Failed to send email to ${options.to}: ${error.message}`);
                throw error;
            }
        }
        async sendPasswordResetEmail(to, resetToken) {
            const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
            const html = `
      <h2>Password Reset Request</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the link below to proceed:</p>
      <a href="${resetUrl}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 20px 0;">
        Reset Password
      </a>
      <p>Or copy this link: <a href="${resetUrl}">${resetUrl}</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <hr />
      <p style="color: #999; font-size: 12px;">Rentro - PG Accommodation Platform</p>
    `;
            await this.sendEmail({
                to,
                subject: 'Reset Your Rentro Password',
                html,
                text: `Click here to reset your password: ${resetUrl}`,
            });
        }
        async sendWelcomeEmail(to, firstName) {
            const html = `
      <h2>Welcome to Rentro!</h2>
      <p>Hi ${firstName},</p>
      <p>Thank you for joining Rentro - your destination for finding the perfect PG accommodation.</p>
      <p>Your account is now active and ready to use. Start exploring amazing listings or list your property today!</p>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" style="background-color: #0ea5e9; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 20px 0;">
        Go to Dashboard
      </a>
      <p>Questions? Visit our <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/help">Help Center</a></p>
      <hr />
      <p style="color: #999; font-size: 12px;">Rentro - PG Accommodation Platform</p>
    `;
            await this.sendEmail({
                to,
                subject: 'Welcome to Rentro!',
                html,
                text: 'Welcome to Rentro!',
            });
        }
        async sendEmailVerificationEmail(to, verificationToken) {
            const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
            const html = `
      <h2>Verify Your Email Address</h2>
      <p>Hello,</p>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verifyUrl}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 20px 0;">
        Verify Email
      </a>
      <p>Or copy this link: <a href="${verifyUrl}">${verifyUrl}</a></p>
      <p>This link will expire in 24 hours.</p>
      <hr />
      <p style="color: #999; font-size: 12px;">Rentro - PG Accommodation Platform</p>
    `;
            await this.sendEmail({
                to,
                subject: 'Verify Your Rentro Email',
                html,
                text: `Click here to verify your email: ${verifyUrl}`,
            });
        }
    };
    __setFunctionName(_classThis, "EmailService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmailService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmailService = _classThis;
})();
exports.EmailService = EmailService;
