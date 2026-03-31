import { IsEmail, IsString, MinLength, MaxLength, IsEnum, IsOptional, Matches } from 'class-validator';
import { UserRole } from '../../typeorm/entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain uppercase, lowercase, number, and special character',
  })
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  first_name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  last_name: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @Matches(/^[0-9+\-\s()]+$/, {
    message: 'Invalid phone number format',
  })
  phone_number?: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refresh_token: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain uppercase, lowercase, number, and special character',
  })
  password: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  last_name?: string;

  @IsOptional()
  @Matches(/^[0-9+\-\s()]+$/, {
    message: 'Invalid phone number format',
  })
  phone_number?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
