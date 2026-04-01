import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from '../typeorm/entities/review.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, PGListing])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
