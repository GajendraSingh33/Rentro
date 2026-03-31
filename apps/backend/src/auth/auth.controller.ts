import { Controller, Post, Get, Put, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto, UpdateProfileDto } from './dtos/auth.dto';
import { UserResponseDto, AuthResponseDto, RefreshTokenResponseDto, PasswordResetResponseDto, PasswordForgotResponseDto } from './dtos/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req): Promise<UserResponseDto> {
    return this.authService.getProfile(req.user.id);
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto): Promise<UserResponseDto> {
    return this.authService.updateProfile(req.user.id, updateProfileDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<PasswordForgotResponseDto> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<PasswordResetResponseDto> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
