import { Injectable, BadRequestException, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../typeorm/entities/user.entity';
import { RegisterDto, LoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto, UpdateProfileDto } from './dtos/auth.dto';
import { UserResponseDto, AuthResponseDto, RefreshTokenResponseDto, PasswordResetResponseDto, PasswordForgotResponseDto } from './dtos/response.dto';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, first_name, last_name, role, phone_number } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered. Please login or use a different email.');
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
      } catch (emailError) {
        this.logger.error(`Failed to send welcome email: ${emailError.message}`);
        // Don't throw error - user is registered even if email fails
      }

      // Generate tokens
      const tokens = await this.generateTokens(savedUser.id);

      return {
        user: this.mapUserToDto(savedUser),
        ...tokens,
      };
    } catch (error) {
      this.logger.error(`Registration error: ${error.message}`);
      throw new BadRequestException('Failed to register user. Please try again.');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new UnauthorizedException('This account has been deactivated');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
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

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
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
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user.id);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async validateUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user || !user.is_active) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<PasswordForgotResponseDto> {
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
      const resetToken = this.jwtService.sign(
        { sub: user.id, type: 'password_reset' },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );

      // Send reset email
      try {
        await this.emailService.sendPasswordResetEmail(email, resetToken);
      } catch (emailError) {
        this.logger.error(`Failed to send password reset email: ${emailError.message}`);
        // Don't throw error - token is valid even if email fails
      }

      return {
        message: 'If the email exists, a password reset link will be sent',
        success: true,
      };
    } catch (error) {
      this.logger.error(`Forgot password error: ${error.message}`);
      throw new BadRequestException('Failed to process password reset request');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<PasswordResetResponseDto> {
    const { token, password } = resetPasswordDto;

    try {
      // Verify token
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      if (payload.type !== 'password_reset') {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
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
    } catch (error) {
      this.logger.error(`Reset password error: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
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

  async updateAvatar(userId: number, avatarUrl: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Delete old avatar if exists
    if (user.avatar_url) {
      try {
        // Optionally delete old file from disk
        // await this.fileUploadService.deleteFile(user.avatar_url);
      } catch (error) {
        this.logger.warn(`Failed to delete old avatar: ${error.message}`);
      }
    }

    user.avatar_url = avatarUrl;
    const updatedUser = await this.userRepository.save(user);

    this.logger.log(`User avatar updated: ${user.email}`);

    return this.mapUserToDto(updatedUser);
  }

  async getProfile(userId: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.mapUserToDto(user);
  }

  private async generateTokens(userId: number): Promise<{ access_token: string; refresh_token: string; expires_in: number }> {
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

  private mapUserToDto(user: User): UserResponseDto {
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
}
