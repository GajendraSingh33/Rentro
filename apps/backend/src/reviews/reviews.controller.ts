import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import {
  CreateReviewDto,
  UpdateReviewDto,
  OwnerResponseDto,
  ReviewsQueryDto,
  ReviewsListResponseDto,
  ReviewResponseDto,
  RatingSummaryDto,
} from './dto/review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  /**
   * Create a new review
   * POST /reviews
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createReview(
    @GetUser('id') userId: number,
    @Body() dto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    return this.reviewsService.createReview(userId, dto);
  }

  /**
   * Get reviews for a listing
   * GET /reviews/listing/:listingId
   */
  @Get('listing/:listingId')
  @HttpCode(HttpStatus.OK)
  async getListingReviews(
    @Param('listingId', ParseIntPipe) listingId: number,
    @Query() query: ReviewsQueryDto,
  ): Promise<ReviewsListResponseDto> {
    return this.reviewsService.getListingReviews(listingId, query);
  }

  /**
   * Get rating summary for a listing
   * GET /reviews/listing/:listingId/summary
   */
  @Get('listing/:listingId/summary')
  @HttpCode(HttpStatus.OK)
  async getRatingSummary(
    @Param('listingId', ParseIntPipe) listingId: number,
  ): Promise<RatingSummaryDto> {
    return this.reviewsService.getRatingSummary(listingId);
  }

  /**
   * Get user's reviews
   * GET /reviews/my-reviews
   */
  @Get('my-reviews')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getMyReviews(
    @GetUser('id') userId: number,
    @Query() query: ReviewsQueryDto,
  ): Promise<ReviewsListResponseDto> {
    return this.reviewsService.getUserReviews(userId, query);
  }

  /**
   * Update a review
   * PUT /reviews/:reviewId
   */
  @Put(':reviewId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateReview(
    @GetUser('id') userId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() dto: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
    return this.reviewsService.updateReview(userId, reviewId, dto);
  }

  /**
   * Delete a review
   * DELETE /reviews/:reviewId
   */
  @Delete(':reviewId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(
    @GetUser('id') userId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<void> {
    return this.reviewsService.deleteReview(userId, reviewId);
  }

  /**
   * Add owner response to a review
   * POST /reviews/:reviewId/owner-response
   */
  @Post(':reviewId/owner-response')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async addOwnerResponse(
    @GetUser('id') ownerId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() dto: OwnerResponseDto,
  ): Promise<ReviewResponseDto> {
    return this.reviewsService.addOwnerResponse(ownerId, reviewId, dto);
  }

  /**
   * Mark review as helpful
   * POST /reviews/:reviewId/helpful
   */
  @Post(':reviewId/helpful')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async markHelpful(
    @GetUser('id') userId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<{ helpful_count: number }> {
    return this.reviewsService.markHelpful(userId, reviewId);
  }

  /**
   * Report a review
   * POST /reviews/:reviewId/report
   */
  @Post(':reviewId/report')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async reportReview(
    @GetUser('id') userId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() body: { reason: string },
  ): Promise<void> {
    return this.reviewsService.reportReview(userId, reviewId, body.reason);
  }
}
