import { MediaService } from './media.service';
import { Media } from '../typeorm/entities/media.entity';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    /**
     * Upload an image
     * POST /media/upload-image
     */
    uploadImage(file: Express.Multer.File, listingId: number, req: any): Promise<Media>;
    /**
     * Upload a video
     * POST /media/upload-video
     */
    uploadVideo(file: Express.Multer.File, listingId: number, req: any): Promise<Media>;
    /**
     * Get all media for a listing
     * GET /media/listing/:listingId
     */
    getListingMedia(listingId: number): Promise<Media[]>;
    /**
     * Delete media
     * DELETE /media/:id
     */
    deleteMedia(id: number, req: any): Promise<{
        message: string;
    }>;
    /**
     * Set cover image
     * PATCH /media/:id/set-cover
     */
    setCoverImage(id: number, listingId: number): Promise<{
        message: string;
    }>;
    /**
     * Update display order
     * PATCH /media/:id/order
     */
    updateDisplayOrder(id: number, order: number): Promise<{
        message: string;
    }>;
}
