import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';

export interface UploadOptions {
  maxSize?: number; // in bytes
  allowedMimes?: string[];
}

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);
  private readonly uploadsDir = path.join(process.cwd(), 'uploads');

  constructor() {
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async uploadProfilePicture(file: Express.Multer.File): Promise<string> {
    const options: UploadOptions = {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedMimes: ['image/jpeg', 'image/png', 'image/webp'],
    };

    return this.uploadFile(file, 'profiles', options);
  }

  async uploadListingImage(file: Express.Multer.File): Promise<string> {
    const options: UploadOptions = {
      maxSize: 10 * 1024 * 1024, // 10MB
      allowedMimes: ['image/jpeg', 'image/png', 'image/webp'],
    };

    return this.uploadFile(file, 'listings', options);
  }

  async uploadListingVideo(file: Express.Multer.File): Promise<string> {
    const options: UploadOptions = {
      maxSize: 100 * 1024 * 1024, // 100MB
      allowedMimes: ['video/mp4', 'video/webm', 'video/quicktime'],
    };

    return this.uploadFile(file, 'videos', options);
  }

  private async uploadFile(
    file: Express.Multer.File,
    category: string,
    options: UploadOptions,
  ): Promise<string> {
    // Validate file
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Check file size
    if (options.maxSize && file.size > options.maxSize) {
      throw new BadRequestException(
        `File size exceeds maximum of ${options.maxSize / 1024 / 1024}MB`,
      );
    }

    // Check MIME type
    if (options.allowedMimes && !options.allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type not allowed. Allowed types: ${options.allowedMimes.join(', ')}`,
      );
    }

    try {
      const fileName = `${uuid()}-${Date.now()}`;
      const categoryDir = path.join(this.uploadsDir, category);

      // Create category directory if it doesn't exist
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      // For images, optimize and compress
      if (file.mimetype.startsWith('image/')) {
        const filePath = path.join(categoryDir, `${fileName}.webp`);

        await sharp(file.buffer)
          .resize(2000, 2000, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(filePath);

        this.logger.log(`Image uploaded: ${fileName}.webp`);
        return `uploads/${category}/${fileName}.webp`;
      }

      // For videos, save as-is
      const ext = path.extname(file.originalname);
      const filePath = path.join(categoryDir, `${fileName}${ext}`);
      fs.writeFileSync(filePath, file.buffer);

      this.logger.log(`File uploaded: ${fileName}${ext}`);
      return `uploads/${category}/${fileName}${ext}`;
    } catch (error) {
      this.logger.error(`File upload error: ${error.message}`);
      throw new BadRequestException(`Failed to upload file: ${error.message}`);
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(process.cwd(), filePath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        this.logger.log(`File deleted: ${filePath}`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete file: ${error.message}`);
      throw new BadRequestException(`Failed to delete file: ${error.message}`);
    }
  }
}
