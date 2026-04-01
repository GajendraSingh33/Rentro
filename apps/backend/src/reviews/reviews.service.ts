import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review, ReviewStatus } from '../typeorm/entities/review.entity';
import { PGListing, ListingStatus } from '../typeorm/entities/pg-listing.entity';
import {
  CreateReviewDto,
  UpdateReviewDto,
  OwnerResponseDto,
  ReviewsQueryDto,
  ReviewResponseDto,
  ReviewsListResponseDto,
  RatingSummaryDto,
} from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
  ) {}

  /**
   * Create a new review
   */
  async createReview(
    userId: number,
    dto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    // Check if listing exists
    const listing = await this.listingRepository.findOne({
      where: { id: dto.listing_id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    // Cannot review own listing
    if (listing.owner_id === userId) {
      throw new ForbiddenException('You cannot review your own listing');
    }

    // Check for existing review
    const existing = await this.reviewRepository.findOne({
      where: {
        user_id: userId,
        listing_id: dto.listing_id,
      },
    });

    if (existing) {
      throw new ConflictException(
        'You have already reviewed this listing. Please update your existing review.',
      );
    }

    // Create review
    const review = this.reviewRepository.create({
      user_id: userId,
      listing_id: dto.listing_id,
      rating: dto.rating,
      cleanliness_rating: dto.cleanliness_rating,
      amenities_rating: dto.amenities_rating,
      location_rating: dto.location_rating,
      value_for_money_rating: dto.value_for_money_rating,
      owner_response_rating: dto.owner_response_rating,
      title: dto.title,
      content: dto.content,
      pros: dto.pros ? JSON.stringify(dto.pros) : null,
      cons: dto.cons ? JSON.stringify(dto.cons) : null,
      stay_duration_months: dto.stay_duration_months,
      stayed_from: dto.stayed_from ? new Date(dto.stayed_from) : null,
      stayed_until: dto.stayed_until ? new Date(dto.stayed_until) : null,
      is_current_resident: dto.is_current_resident || false,
      status: ReviewStatus.APPROVED, // Auto-approve for now
    });

    const saved = await this.reviewRepository.save(review);

    // Update listing average rating
    await this.updateListingRating(dto.listing_id);

    // Fetch with relations
    const fullReview = await this.reviewRepository.findOne({
      where: { id: saved.id },
      relations: ['user'],
    });

    return this.transformToResponse(fullReview);
  }

  /**
   * Update an existing review
   */
  async updateReview(
    userId: number,
    reviewId: number,
    dto: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['user'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.user_id !== userId) {
      throw new ForbiddenException('You can only update your own reviews');
    }

    // Update fields
    if (dto.rating !== undefined) review.rating = dto.rating;
    if (dto.cleanliness_rating !== undefined)
      review.cleanliness_rating = dto.cleanliness_rating;
    if (dto.amenities_rating !== undefined)
      review.amenities_rating = dto.amenities_rating;
    if (dto.location_rating !== undefined)
      review.location_rating = dto.location_rating;
    if (dto.value_for_money_rating !== undefined)
      review.value_for_money_rating = dto.value_for_money_rating;
    if (dto.owner_response_rating !== undefined)
      review.owner_response_rating = dto.owner_response_rating;
    if (dto.title !== undefined) review.title = dto.title;
    if (dto.content !== undefined) review.content = dto.content;
    if (dto.pros !== undefined) review.pros = JSON.stringify(dto.pros);
    if (dto.cons !== undefined) review.cons = JSON.stringify(dto.cons);

    const saved = await this.reviewRepository.save(review);

    // Update listing average rating
    await this.updateListingRating(review.listing_id);

    return this.transformToResponse(saved);
  }

  /**
   * Delete a review
   */
  async deleteReview(userId: number, reviewId: number): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.user_id !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    const listingId = review.listing_id;
    await this.reviewRepository.softDelete(reviewId);

    // Update listing average rating
    await this.updateListingRating(listingId);
  }

  /**
   * Get reviews for a listing
   */
  async getListingReviews(
    listingId: number,
    query: ReviewsQueryDto,
  ): Promise<ReviewsListResponseDto> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .where('review.listing_id = :listingId', { listingId })
      .andWhere('review.deleted_at IS NULL')
      .andWhere('review.status = :status', { status: ReviewStatus.APPROVED });

    // Filter by minimum rating
    if (query.min_rating) {
      queryBuilder.andWhere('review.rating >= :minRating', {
        minRating: query.min_rating,
      });
    }

    // Sorting
    switch (query.sort_by) {
      case 'oldest':
        queryBuilder.orderBy('review.created_at', 'ASC');
        break;
      case 'highest_rating':
        queryBuilder.orderBy('review.rating', 'DESC');
        break;
      case 'lowest_rating':
        queryBuilder.orderBy('review.rating', 'ASC');
        break;
      case 'most_helpful':
        queryBuilder.orderBy('review.helpful_count', 'DESC');
        break;
      case 'newest':
      default:
        queryBuilder.orderBy('review.created_at', 'DESC');
    }

    const [reviews, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    // Get rating summary
    const summary = await this.getRatingSummary(listingId);

    return {
      data: reviews.map((r) => this.transformToResponse(r)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      average_rating: summary.average_rating,
      rating_distribution: summary.rating_distribution,
    };
  }

  /**
   * Get rating summary for a listing
   */
  async getRatingSummary(listingId: number): Promise<RatingSummaryDto> {
    const stats = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avgRating')
      .addSelect('AVG(review.cleanliness_rating)', 'avgCleanliness')
      .addSelect('AVG(review.amenities_rating)', 'avgAmenities')
      .addSelect('AVG(review.location_rating)', 'avgLocation')
      .addSelect('AVG(review.value_for_money_rating)', 'avgValue')
      .addSelect('AVG(review.owner_response_rating)', 'avgOwnerResponse')
      .addSelect('COUNT(*)', 'totalCount')
      .where('review.listing_id = :listingId', { listingId })
      .andWhere('review.deleted_at IS NULL')
      .andWhere('review.status = :status', { status: ReviewStatus.APPROVED })
      .getRawOne();

    // Get rating distribution
    const distribution = await this.reviewRepository
      .createQueryBuilder('review')
      .select('FLOOR(review.rating)', 'rating')
      .addSelect('COUNT(*)', 'count')
      .where('review.listing_id = :listingId', { listingId })
      .andWhere('review.deleted_at IS NULL')
      .andWhere('review.status = :status', { status: ReviewStatus.APPROVED })
      .groupBy('FLOOR(review.rating)')
      .getRawMany();

    const ratingDist = {
      '5': 0,
      '4': 0,
      '3': 0,
      '2': 0,
      '1': 0,
    };

    distribution.forEach((d) => {
      const key = Math.floor(d.rating).toString() as '1' | '2' | '3' | '4' | '5';
      if (ratingDist[key] !== undefined) {
        ratingDist[key] = parseInt(d.count);
      }
    });

    return {
      average_rating: stats.avgRating ? parseFloat(stats.avgRating) : null,
      total_reviews: parseInt(stats.totalCount) || 0,
      rating_distribution: ratingDist,
      category_averages: {
        cleanliness: stats.avgCleanliness
          ? parseFloat(stats.avgCleanliness)
          : null,
        amenities: stats.avgAmenities ? parseFloat(stats.avgAmenities) : null,
        location: stats.avgLocation ? parseFloat(stats.avgLocation) : null,
        value_for_money: stats.avgValue ? parseFloat(stats.avgValue) : null,
        owner_response: stats.avgOwnerResponse
          ? parseFloat(stats.avgOwnerResponse)
          : null,
      },
    };
  }

  /**
   * Add owner response to a review
   */
  async addOwnerResponse(
    ownerId: number,
    reviewId: number,
    dto: OwnerResponseDto,
  ): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['listing', 'user'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.listing.owner_id !== ownerId) {
      throw new ForbiddenException(
        'You can only respond to reviews on your own listings',
      );
    }

    review.owner_response = dto.response;
    review.owner_responded_at = new Date();

    const saved = await this.reviewRepository.save(review);
    return this.transformToResponse(saved);
  }

  /**
   * Mark review as helpful
   */
  async markHelpful(userId: number, reviewId: number): Promise<{ helpful_count: number }> {
    // In a real app, you'd track which users marked which reviews as helpful
    // For simplicity, we just increment the count
    await this.reviewRepository.increment({ id: reviewId }, 'helpful_count', 1);
    
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    return { helpful_count: review?.helpful_count || 0 };
  }

  /**
   * Report a review
   */
  async reportReview(
    userId: number,
    reviewId: number,
    reason: string,
  ): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    // Increment report count (in real app, store individual reports)
    await this.reviewRepository.increment({ id: reviewId }, 'report_count', 1);

    // If report count exceeds threshold, flag for moderation
    if (review.report_count + 1 >= 3) {
      await this.reviewRepository.update(reviewId, {
        status: ReviewStatus.FLAGGED,
      });
    }
  }

  /**
   * Get user's reviews
   */
  async getUserReviews(
    userId: number,
    query: ReviewsQueryDto,
  ): Promise<ReviewsListResponseDto> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [reviews, total] = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.listing', 'listing')
      .where('review.user_id = :userId', { userId })
      .andWhere('review.deleted_at IS NULL')
      .orderBy('review.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: reviews.map((r) => this.transformToResponse(r)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      average_rating: null,
      rating_distribution: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
    };
  }

  // Private helper methods

  private async updateListingRating(listingId: number): Promise<void> {
    const stats = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avgRating')
      .addSelect('COUNT(*)', 'count')
      .where('review.listing_id = :listingId', { listingId })
      .andWhere('review.deleted_at IS NULL')
      .andWhere('review.status = :status', { status: ReviewStatus.APPROVED })
      .getRawOne();

    await this.listingRepository.update(listingId, {
      average_rating: stats.avgRating ? parseFloat(stats.avgRating) : null,
      review_count: parseInt(stats.count) || 0,
    });
  }

  private transformToResponse(review: Review): ReviewResponseDto {
    let pros: string[] = [];
    let cons: string[] = [];

    try {
      pros = review.pros ? JSON.parse(review.pros) : [];
      cons = review.cons ? JSON.parse(review.cons) : [];
    } catch (e) {
      // Ignore JSON parse errors
    }

    return {
      id: review.id,
      listing_id: review.listing_id,
      rating: Number(review.rating),
      cleanliness_rating: review.cleanliness_rating
        ? Number(review.cleanliness_rating)
        : null,
      amenities_rating: review.amenities_rating
        ? Number(review.amenities_rating)
        : null,
      location_rating: review.location_rating
        ? Number(review.location_rating)
        : null,
      value_for_money_rating: review.value_for_money_rating
        ? Number(review.value_for_money_rating)
        : null,
      owner_response_rating: review.owner_response_rating
        ? Number(review.owner_response_rating)
        : null,
      title: review.title,
      content: review.content,
      pros,
      cons,
      stay_duration_months: review.stay_duration_months,
      is_current_resident: review.is_current_resident,
      is_verified: review.is_verified,
      helpful_count: review.helpful_count,
      owner_response: review.owner_response,
      owner_responded_at: review.owner_responded_at,
      created_at: review.created_at,
      reviewer: {
        id: review.user?.id,
        name: review.user?.first_name
          ? `${review.user.first_name} ${review.user.last_name?.[0] || ''}.`
          : 'Anonymous',
        avatar_url: null, // Add avatar field to User entity if needed
      },
    };
  }
}
