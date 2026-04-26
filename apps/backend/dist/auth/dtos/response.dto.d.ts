import { UserRole } from '../../typeorm/entities/user.entity';
export declare class UserResponseDto {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone_number?: string;
    avatar_url?: string;
    role: UserRole;
    bio?: string;
    email_verified: boolean;
    is_active: boolean;
    last_login_at?: Date;
    created_at: Date;
    updated_at: Date;
}
export declare class AuthResponseDto {
    user: UserResponseDto;
    access_token: string;
    refresh_token: string;
    expires_in: number;
}
export declare class LoginResponseDto {
    user: UserResponseDto;
    access_token: string;
    refresh_token: string;
    expires_in: number;
}
export declare class RefreshTokenResponseDto {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}
export declare class PasswordResetResponseDto {
    message: string;
    success: boolean;
}
export declare class PasswordForgotResponseDto {
    message: string;
    success: boolean;
}
