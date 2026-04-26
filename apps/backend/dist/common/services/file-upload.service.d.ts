export interface UploadOptions {
    maxSize?: number;
    allowedMimes?: string[];
}
export declare class FileUploadService {
    private readonly logger;
    private readonly uploadsDir;
    constructor();
    uploadProfilePicture(file: Express.Multer.File): Promise<string>;
    uploadListingImage(file: Express.Multer.File): Promise<string>;
    uploadListingVideo(file: Express.Multer.File): Promise<string>;
    private uploadFile;
    deleteFile(filePath: string): Promise<void>;
}
