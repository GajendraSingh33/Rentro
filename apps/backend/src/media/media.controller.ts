import {
  Controller,
  Post,
  Delete,
  Get,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  ParseIntPipe,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MediaService } from './media.service';
import { Media } from '../typeorm/entities/media.entity';

@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  /**
   * Upload an image
   * POST /media/upload-image
   */
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('listingId', ParseIntPipe) listingId: number,
    @Request() req,
  ): Promise<Media> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return await this.mediaService.uploadImage(file, listingId);
  }

  /**
   * Upload a video
   * POST /media/upload-video
   */
  @Post('upload-video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body('listingId', ParseIntPipe) listingId: number,
    @Request() req,
  ): Promise<Media> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return await this.mediaService.uploadVideo(file, listingId);
  }

  /**
   * Get all media for a listing
   * GET /media/listing/:listingId
   */
  @Get('listing/:listingId')
  async getListingMedia(
    @Param('listingId', ParseIntPipe) listingId: number,
  ): Promise<Media[]> {
    return await this.mediaService.getListingMedia(listingId);
  }

  /**
   * Delete media
   * DELETE /media/:id
   */
  @Delete(':id')
  async deleteMedia(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<{ message: string }> {
    await this.mediaService.deleteMedia(id, req.user.id);
    return { message: 'Media deleted successfully' };
  }

  /**
   * Set cover image
   * PATCH /media/:id/set-cover
   */
  @Patch(':id/set-cover')
  async setCoverImage(
    @Param('id', ParseIntPipe) id: number,
    @Body('listingId', ParseIntPipe) listingId: number,
  ): Promise<{ message: string }> {
    await this.mediaService.setCoverImage(id, listingId);
    return { message: 'Cover image updated successfully' };
  }

  /**
   * Update display order
   * PATCH /media/:id/order
   */
  @Patch(':id/order')
  async updateDisplayOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body('order', ParseIntPipe) order: number,
  ): Promise<{ message: string }> {
    await this.mediaService.updateDisplayOrder(id, order);
    return { message: 'Display order updated successfully' };
  }
}
