import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { S3Service } from './s3.service';
import { Media } from '../typeorm/entities/media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    ConfigModule,
  ],
  controllers: [MediaController],
  providers: [MediaService, S3Service],
  exports: [MediaService, S3Service],
})
export class MediaModule {}
