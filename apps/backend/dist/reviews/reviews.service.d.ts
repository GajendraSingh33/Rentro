import { Repository } from 'typeorm';
import { Review } from '../typeorm/entities/review.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { CreateReviewDto, UpdateReviewDto, OwnerResponseDto, ReviewsQueryDto, ReviewResponseDto, ReviewsListResponseDto, RatingSummaryDto } from './dto/review.dto';
export declare class ReviewsService {
    private reviewRepository;
    private listingRepository;
    constructor(reviewRepository: Repository<Review>, listingRepository: Repository<PGListing>);
    /**
     * Create a new review
     */
    createReview(userId: number, dto: CreateReviewDto): Promise<ReviewResponseDto>;
    /**
     * Update an existing review
     */
    updateReview(userId: number, reviewId: number, dto: UpdateReviewDto): Promise<ReviewResponseDto>;
    /**
     * Delete a review
     */
    deleteReview(userId: number, reviewId: number): Promise<void>;
    /**
     * Get reviews for a listing
     */
    getListingReviews(listingId: number, query: ReviewsQueryDto): Promise<ReviewsListResponseDto>;
    /**
     * Get rating summary for a listing
     */
    getRatingSummary(listingId: number): Promise<RatingSummaryDto>;
    /**
     * Add owner response to a review
     */
    addOwnerResponse(ownerId: number, reviewId: number, dto: OwnerResponseDto): Promise<ReviewResponseDto>;
    /**
     * Mark review as helpful
     */
    markHelpful(userId: number, reviewId: number): Promise<{
        helpful_count: number;
    }>;
    /**
     * Report a review
     */
    reportReview(userId: number, reviewId: number, reason: string): Promise<void>;
    /**
     * Get user's reviews
     */
    getUserReviews(userId: number, query: ReviewsQueryDto): Promise<ReviewsListResponseDto>;
    private updateListingRating;
    private transformToResponse;
}
