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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = _classThis = class {
        constructor(userRepository, jwtService, emailService) {
            this.userRepository = userRepository;
            this.jwtService = jwtService;
            this.emailService = emailService;
            this.logger = new common_1.Logger(AuthService.name);
        }
        async register(registerDto) {
            const { email, password, first_name, last_name, role, phone_number } = registerDto;
            // Check if user already exists
            const existingUser = await this.userRepository.findOne({
                where: { email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('Email already registered. Please login or use a different email.');
            }
            // Hash password
            const password_hash = await bcrypt.hash(password, 10);
            try {
                // Create new user
                const user = this.userRepository.create({
                    email,
                    password_hash,
                    first_name,
                    last_name,
                    role,
                    phone_number,
                    email_verified: false,
                });
                const savedUser = await this.userRepository.save(user);
                this.logger.log(`New user registered: ${email} with role ${role}`);
                // Send welcome email
                try {
                    await this.emailService.sendWelcomeEmail(email, first_name);
                }
                catch (emailError) {
                    this.logger.error(`Failed to send welcome email: ${emailError.message}`);
                    // Don't throw error - user is registered even if email fails
                }
                // Generate tokens
                const tokens = await this.generateTokens(savedUser.id);
                return {
                    user: this.mapUserToDto(savedUser),
                    ...tokens,
                };
            }
            catch (error) {
                this.logger.error(`Registration error: ${error.message}`);
                throw new common_1.BadRequestException('Failed to register user. Please try again.');
            }
        }
        async login(loginDto) {
            const { email, password } = loginDto;
            // Find user by email
            const user = await this.userRepository.findOne({
                where: { email },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            // Check if user is active
            if (!user.is_active) {
                throw new common_1.UnauthorizedException('This account has been deactivated');
            }
            // Validate password
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            // Update last login
            user.last_login_at = new Date();
            await this.userRepository.save(user);
            // Generate tokens
            const tokens = await this.generateTokens(user.id);
            this.logger.log(`User logged in: ${email}`);
            return {
                user: this.mapUserToDto(user),
                ...tokens,
            };
        }
        async refreshToken(refreshTokenDto) {
            const { refresh_token } = refreshTokenDto;
            try {
                const payload = this.jwtService.verify(refresh_token, {
                    secret: process.env.REFRESH_TOKEN_SECRET,
                });
                // Get user
                const user = await this.userRepository.findOne({
                    where: { id: payload.sub },
                });
                if (!user || !user.is_active) {
                    throw new common_1.UnauthorizedException('Invalid refresh token');
                }
                // Generate new tokens
                const tokens = await this.generateTokens(user.id);
                return tokens;
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid or expired refresh token');
            }
        }
        async validateUser(id) {
            const user = await this.userRepository.findOne({
                where: { id },
            });
            if (!user || !user.is_active) {
                throw new common_1.UnauthorizedException('User not found or inactive');
            }
            return user;
        }
        async forgotPassword(forgotPasswordDto) {
            const { email } = forgotPasswordDto;
            const user = await this.userRepository.findOne({
                where: { email },
            });
            if (!user) {
                // For security, don't reveal if email exists or not
                return {
                    message: 'If the email exists, a password reset link will be sent',
                    success: true,
                };
            }
            try {
                // Generate reset token (valid for 1 hour)
                const resetToken = this.jwtService.sign({ sub: user.id, type: 'password_reset' }, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
                // Send reset email
                try {
                    await this.emailService.sendPasswordResetEmail(email, resetToken);
                }
                catch (emailError) {
                    this.logger.error(`Failed to send password reset email: ${emailError.message}`);
                    // Don't throw error - token is valid even if email fails
                }
                return {
                    message: 'If the email exists, a password reset link will be sent',
                    success: true,
                };
            }
            catch (error) {
                this.logger.error(`Forgot password error: ${error.message}`);
                throw new common_1.BadRequestException('Failed to process password reset request');
            }
        }
        async resetPassword(resetPasswordDto) {
            const { token, password } = resetPasswordDto;
            try {
                // Verify token
                const payload = this.jwtService.verify(token, {
                    secret: process.env.JWT_SECRET,
                });
                if (payload.type !== 'password_reset') {
                    throw new common_1.UnauthorizedException('Invalid token');
                }
                const user = await this.userRepository.findOne({
                    where: { id: payload.sub },
                });
                if (!user) {
                    throw new common_1.UnauthorizedException('User not found');
                }
                // Hash new password
                const password_hash = await bcrypt.hash(password, 10);
                // Update password
                user.password_hash = password_hash;
                await this.userRepository.save(user);
                this.logger.log(`Password reset for user: ${user.email}`);
                return {
                    message: 'Password reset successfully. Please login with your new password.',
                    success: true,
                };
            }
            catch (error) {
                this.logger.error(`Reset password error: ${error.message}`);
                throw new common_1.UnauthorizedException('Invalid or expired reset token');
            }
        }
        async updateProfile(userId, updateProfileDto) {
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            // Update only provided fields
            if (updateProfileDto.first_name) {
                user.first_name = updateProfileDto.first_name;
            }
            if (updateProfileDto.last_name) {
                user.last_name = updateProfileDto.last_name;
            }
            if (updateProfileDto.phone_number) {
                user.phone_number = updateProfileDto.phone_number;
            }
            if (updateProfileDto.bio) {
                user.bio = updateProfileDto.bio;
            }
            const updatedUser = await this.userRepository.save(user);
            this.logger.log(`User profile updated: ${user.email}`);
            return this.mapUserToDto(updatedUser);
        }
        async updateAvatar(userId, avatarUrl) {
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            // Delete old avatar if exists
            if (user.avatar_url) {
                try {
                    // Optionally delete old file from disk
                    // await this.fileUploadService.deleteFile(user.avatar_url);
                }
                catch (error) {
                    this.logger.warn(`Failed to delete old avatar: ${error.message}`);
                }
            }
            user.avatar_url = avatarUrl;
            const updatedUser = await this.userRepository.save(user);
            this.logger.log(`User avatar updated: ${user.email}`);
            return this.mapUserToDto(updatedUser);
        }
        async getProfile(userId) {
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            return this.mapUserToDto(user);
        }
        async generateTokens(userId) {
            const payload = { sub: userId };
            const expiresIn = parseInt(process.env.JWT_EXPIRY || '24h'.match(/\d+/)[0]) * 3600; // Convert to seconds
            const access_token = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRY || '24h',
            });
            const refresh_token = this.jwtService.sign(payload, {
                secret: process.env.REFRESH_TOKEN_SECRET,
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
            });
            return {
                access_token,
                refresh_token,
                expires_in: expiresIn,
            };
        }
        mapUserToDto(user) {
            return {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                full_name: user.full_name,
                phone_number: user.phone_number,
                avatar_url: user.avatar_url,
                role: user.role,
                bio: user.bio,
                email_verified: user.email_verified,
                is_active: user.is_active,
                last_login_at: user.last_login_at,
                created_at: user.created_at,
                updated_at: user.updated_at,
            };
        }
    };
    __setFunctionName(_classThis, "AuthService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
