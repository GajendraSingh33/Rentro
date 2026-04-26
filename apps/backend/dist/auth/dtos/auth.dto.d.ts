import { UserRole } from '../../typeorm/entities/user.entity';
export declare class RegisterDto {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    phone_number?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshTokenDto {
    refresh_token: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    password: string;
}
export declare class UpdateProfileDto {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    bio?: string;
}
