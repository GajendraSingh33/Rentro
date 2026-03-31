import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sharp from 'sharp';
import { S3Service } from './s3.service';
import { Media, MediaType } from '../typeorm/entities/media.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  // Maximum file sizes
  private readonly MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

  // Allowed MIME types
  private readonly ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];

  private readonly ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
  ];

  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private s3Service: S3Service,
  ) {}

  /**
   * Upload an image with compression and thumbnail generation
   */
  async uploadImage(
    file: Express.Multer.File,
    listingId: number,
  ): Promise<Media> {
    // Validate file
    this.validateImageFile(file);

    try {
      // Generate unique filename
      const fileExtension = file.originalname.split('.').pop();
      const uniqueFilename = `${uuidv4()}.${fileExtension}`;
      const s3Key = `listings/${listingId}/images/${uniqueFilename}`;
      const thumbnailKey = `listings/${listingId}/thumbnails/${uniqueFilename}`;

      // Compress and optimize image
      const compressedImage = await this.compressImage(file.buffer);
      
      // Generate thumbnail
      const thumbnail = await this.generateThumbnail(file.buffer);

      // Get image metadata
      const metadata = await sharp(file.buffer).metadata();

      // Upload to S3
      const [imageUrl, thumbnailUrl] = await Promise.all([
        this.s3Service.uploadFile(compressedImage, s3Key, 'image/webp'),
        this.s3Service.uploadFile(thumbnail, thumbnailKey, 'image/webp'),
      ]);

      // Save to database
      const media = this.mediaRepository.create({
        listing_id: listingId,
        media_type: MediaType.IMAGE,
        url: imageUrl,
        thumbnail_url: thumbnailUrl,
        original_filename: file.originalname,
        file_size: compressedImage.length,
        mime_type: 'image/webp', // Converted to WebP
        width: metadata.width,
        height: metadata.height,
        is_processed: true,
        display_order: await this.getNextDisplayOrder(listingId),
      });

      return await this.mediaRepository.save(media);
    } catch (error) {
      throw new BadRequestException(`Failed to upload image: ${error.message}`);
    }
  }

  /**
   * Upload a video
   */
  async uploadVideo(
    file: Express.Multer.File,
    listingId: number,
  ): Promise<Media> {
    // Validate file
    this.validateVideoFile(file);

    try {
      // Generate unique filename
      const fileExtension = file.originalname.split('.').pop();
      const uniqueFilename = `${uuidv4()}.${fileExtension}`;
      const s3Key = `listings/${listingId}/videos/${uniqueFilename}`;

      // Upload to S3
      const videoUrl = await this.s3Service.uploadFile(
        file.buffer,
        s3Key,
        file.mimetype,
      );

      // Save to database
      const media = this.mediaRepository.create({
        listing_id: listingId,
        media_type: MediaType.VIDEO,
        url: videoUrl,
        original_filename: file.originalname,
        file_size: file.size,
        mime_type: file.mimetype,
        is_processed: true,
        display_order: await this.getNextDisplayOrder(listingId),
      });

      return await this.mediaRepository.save(media);
    } catch (error) {
      throw new BadRequestException(`Failed to upload video: ${error.message}`);
    }
  }

  /**
   * Delete media file
   */
  async deleteMedia(mediaId: number, userId: number): Promise<void> {
    const media = await this.mediaRepository.findOne({
      where: { id: mediaId },
      relations: ['listing', 'listing.owner'],
    });

    if (!media) {
      throw new BadRequestException('Media not found');
    }

    // Check ownership
    if (media.listing.owner_id !== userId) {
      throw new BadRequestException('Unauthorized to delete this media');
    }

    // Delete from S3
    const s3Key = this.s3Service.extractKeyFromUrl(media.url);
    await this.s3Service.deleteFile(s3Key);

    // Delete thumbnail if exists
    if (media.thumbnail_url) {
      const thumbnailKey = this.s3Service.extractKeyFromUrl(media.thumbnail_url);
      await this.s3Service.deleteFile(thumbnailKey);
    }

    // Soft delete from database
    await this.mediaRepository.softDelete(mediaId);
  }

  /**
   * Get all media for a listing
   */
  async getListingMedia(listingId: number): Promise<Media[]> {
    return await this.mediaRepository.find({
      where: { listing_id: listingId },
      order: { display_order: 'ASC', created_at: 'ASC' },
    });
  }

  /**
   * Set cover image for a listing
   */
  async setCoverImage(mediaId: number, listingId: number): Promise<void> {
    // Remove existing cover
    await this.mediaRepository.update(
      { listing_id: listingId },
      { is_cover: false },
    );

    // Set new cover
    await this.mediaRepository.update(mediaId, { is_cover: true, display_order: 0 });
  }

  /**
   * Update display order
   */
  async updateDisplayOrder(
    mediaId: number,
    newOrder: number,
  ): Promise<void> {
    await this.mediaRepository.update(mediaId, { display_order: newOrder });
  }

  // Private helper methods

  private validateImageFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!this.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid image type. Allowed: ${this.ALLOWED_IMAGE_TYPES.join(', ')}`,
      );
    }

    if (file.size > this.MAX_IMAGE_SIZE) {
      throw new BadRequestException(
        `Image too large. Maximum size: ${this.MAX_IMAGE_SIZE / 1024 / 1024}MB`,
      );
    }
  }

  private validateVideoFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!this.ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid video type. Allowed: ${this.ALLOWED_VIDEO_TYPES.join(', ')}`,
      );
    }

    if (file.size > this.MAX_VIDEO_SIZE) {
      throw new BadRequestException(
        `Video too large. Maximum size: ${this.MAX_VIDEO_SIZE / 1024 / 1024}MB`,
      );
    }
  }

  private async compressImage(buffer: Buffer): Promise<Buffer> {
    return await sharp(buffer)
      .webp({ quality: 85 }) // Convert to WebP with 85% quality
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toBuffer();
  }

  private async generateThumbnail(buffer: Buffer): Promise<Buffer> {
    return await sharp(buffer)
      .webp({ quality: 70 })
      .resize(400, 300, {
        fit: 'cover',
      })
      .toBuffer();
  }

  private async getNextDisplayOrder(listingId: number): Promise<number> {
    const maxOrder = await this.mediaRepository
      .createQueryBuilder('media')
      .where('media.listing_id = :listingId', { listingId })
      .select('MAX(media.display_order)', 'max')
      .getRawOne();

    return (maxOrder?.max || 0) + 1;
  }
}
