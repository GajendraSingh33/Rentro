import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquiry } from '../typeorm/entities/inquiry.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { User } from '../typeorm/entities/user.entity';
import { InquiryService } from './inquiry.service';
import { InquiryController } from './inquiry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry, PGListing, User])],
  providers: [InquiryService],
  controllers: [InquiryController],
  exports: [InquiryService],
})
export class InquiryModule {}
