import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';
import { RegisterDto, LoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto, UpdateProfileDto } from './dtos/auth.dto';
import { UserResponseDto, AuthResponseDto, RefreshTokenResponseDto, PasswordResetResponseDto, PasswordForgotResponseDto } from './dtos/response.dto';
import { EmailService } from '../common/services/email.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly emailService;
    private readonly logger;
    constructor(userRepository: Repository<User>, jwtService: JwtService, emailService: EmailService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto>;
    validateUser(id: number): Promise<User>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<PasswordForgotResponseDto>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<PasswordResetResponseDto>;
    updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<UserResponseDto>;
    updateAvatar(userId: number, avatarUrl: string): Promise<UserResponseDto>;
    getProfile(userId: number): Promise<UserResponseDto>;
    private generateTokens;
    private mapUserToDto;
}
