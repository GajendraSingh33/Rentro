import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private s3Client;
    private bucketName;
    private region;
    constructor(configService: ConfigService);
    /**
     * Upload a file to S3
     * @param file - File buffer to upload
     * @param key - S3 object key (file path)
     * @param contentType - MIME type of the file
     * @returns S3 object URL
     */
    uploadFile(file: Buffer, key: string, contentType: string): Promise<string>;
    /**
     * Delete a file from S3
     * @param key - S3 object key to delete
     */
    deleteFile(key: string): Promise<void>;
    /**
     * Get file from S3
     * @param key - S3 object key
     * @returns File buffer
     */
    getFile(key: string): Promise<Buffer>;
    /**
     * Generate public URL for an S3 object
     * @param key - S3 object key
     * @returns Public URL
     */
    getPublicUrl(key: string): string;
    /**
     * Extract S3 key from URL
     * @param url - S3 URL
     * @returns S3 key
     */
    extractKeyFromUrl(url: string): string;
    /**
     * Check if S3 credentials are configured
     * @returns true if credentials are set
     */
    isConfigured(): boolean;
}
