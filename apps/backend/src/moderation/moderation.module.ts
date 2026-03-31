import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PGListing])],
  providers: [ModerationService],
  controllers: [ModerationController],
  exports: [ModerationService],
})
export class ModerationModule {}
