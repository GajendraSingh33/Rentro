import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto, UpdateProfileDto } from './dtos/auth.dto';
import { UserResponseDto, AuthResponseDto, RefreshTokenResponseDto, PasswordResetResponseDto, PasswordForgotResponseDto } from './dtos/response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto>;
    getProfile(req: any): Promise<UserResponseDto>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<UserResponseDto>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<PasswordForgotResponseDto>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<PasswordResetResponseDto>;
}
