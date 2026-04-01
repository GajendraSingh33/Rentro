import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeekerDashboardController } from './seeker-dashboard.controller';
import { SeekerDashboardService } from './seeker-dashboard.service';
import { Favorite } from '../typeorm/entities/favorite.entity';
import { Inquiry } from '../typeorm/entities/inquiry.entity';
import { Review } from '../typeorm/entities/review.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Inquiry, Review, PGListing])],
  controllers: [SeekerDashboardController],
  providers: [SeekerDashboardService],
  exports: [SeekerDashboardService],
})
export class SeekerDashboardModule {}
