import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
  private region: string;

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION') || 'us-east-1';
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET') || 'rentro-media';

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  /**
   * Upload a file to S3
   * @param file - File buffer to upload
   * @param key - S3 object key (file path)
   * @param contentType - MIME type of the file
   * @returns S3 object URL
   */
  async uploadFile(
    file: Buffer,
    key: string,
    contentType: string,
  ): Promise<string> {
    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: key,
          Body: file,
          ContentType: contentType,
          ACL: 'public-read', // Make files publicly accessible
        },
      });

      await upload.done();

      // Return the public URL
      return this.getPublicUrl(key);
    } catch (error) {
      throw new Error(`Failed to upload file to S3: ${error.message}`);
    }
  }

  /**
   * Delete a file from S3
   * @param key - S3 object key to delete
   */
  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
    } catch (error) {
      throw new Error(`Failed to delete file from S3: ${error.message}`);
    }
  }

  /**
   * Get file from S3
   * @param key - S3 object key
   * @returns File buffer
   */
  async getFile(key: string): Promise<Buffer> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const response = await this.s3Client.send(command);
      const stream = response.Body as any;
      
      return Buffer.from(await stream.transformToByteArray());
    } catch (error) {
      throw new Error(`Failed to get file from S3: ${error.message}`);
    }
  }

  /**
   * Generate public URL for an S3 object
   * @param key - S3 object key
   * @returns Public URL
   */
  getPublicUrl(key: string): string {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
  }

  /**
   * Extract S3 key from URL
   * @param url - S3 URL
   * @returns S3 key
   */
  extractKeyFromUrl(url: string): string {
    const urlParts = url.split('.amazonaws.com/');
    return urlParts.length > 1 ? urlParts[1] : '';
  }

  /**
   * Check if S3 credentials are configured
   * @returns true if credentials are set
   */
  isConfigured(): boolean {
    return !!(
      this.configService.get<string>('AWS_ACCESS_KEY_ID') &&
      this.configService.get<string>('AWS_SECRET_ACCESS_KEY')
    );
  }
}
