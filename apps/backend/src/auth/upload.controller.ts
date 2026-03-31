import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Request, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { FileUploadService } from '../common/services/file-upload.service';
import { UserResponseDto } from './dtos/response.dto';

@Controller('auth/upload')
export class UploadController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post('profile-picture')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserResponseDto> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Upload file and get URL
    const fileUrl = await this.fileUploadService.uploadProfilePicture(file);

    // Update user profile with new avatar URL
    const updatedProfile = await this.authService.updateAvatar(req.user.id, fileUrl);

    return updatedProfile;
  }
}
