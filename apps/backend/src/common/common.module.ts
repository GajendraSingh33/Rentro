import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { FileUploadService } from './services/file-upload.service';

@Module({
  providers: [EmailService, FileUploadService],
  exports: [EmailService, FileUploadService],
})
export class CommonModule {}
