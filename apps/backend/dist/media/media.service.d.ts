import { Repository } from 'typeorm';
import { S3Service } from './s3.service';
import { Media } from '../typeorm/entities/media.entity';
export declare class MediaService {
    private mediaRepository;
    private s3Service;
    private readonly MAX_IMAGE_SIZE;
    private readonly MAX_VIDEO_SIZE;
    private readonly ALLOWED_IMAGE_TYPES;
    private readonly ALLOWED_VIDEO_TYPES;
    constructor(mediaRepository: Repository<Media>, s3Service: S3Service);
    /**
     * Upload an image with compression and thumbnail generation
     */
    uploadImage(file: Express.Multer.File, listingId: number): Promise<Media>;
    /**
     * Upload a video
     */
    uploadVideo(file: Express.Multer.File, listingId: number): Promise<Media>;
    /**
     * Delete media file
     */
    deleteMedia(mediaId: number, userId: number): Promise<void>;
    /**
     * Get all media for a listing
     */
    getListingMedia(listingId: number): Promise<Media[]>;
    /**
     * Set cover image for a listing
     */
    setCoverImage(mediaId: number, listingId: number): Promise<void>;
    /**
     * Update display order
     */
    updateDisplayOrder(mediaId: number, newOrder: number): Promise<void>;
    private validateImageFile;
    private validateVideoFile;
    private compressImage;
    private generateThumbnail;
    private getNextDisplayOrder;
}
