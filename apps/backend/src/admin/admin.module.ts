import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../typeorm/entities/user.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { Inquiry } from '../typeorm/entities/inquiry.entity';
import { Review } from '../typeorm/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PGListing, Inquiry, Review])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
