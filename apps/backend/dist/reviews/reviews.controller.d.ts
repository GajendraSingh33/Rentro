import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto, OwnerResponseDto, ReviewsQueryDto, ReviewsListResponseDto, ReviewResponseDto, RatingSummaryDto } from './dto/review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    /**
     * Create a new review
     * POST /reviews
     */
    createReview(userId: number, dto: CreateReviewDto): Promise<ReviewResponseDto>;
    /**
     * Get reviews for a listing
     * GET /reviews/listing/:listingId
     */
    getListingReviews(listingId: number, query: ReviewsQueryDto): Promise<ReviewsListResponseDto>;
    /**
     * Get rating summary for a listing
     * GET /reviews/listing/:listingId/summary
     */
    getRatingSummary(listingId: number): Promise<RatingSummaryDto>;
    /**
     * Get user's reviews
     * GET /reviews/my-reviews
     */
    getMyReviews(userId: number, query: ReviewsQueryDto): Promise<ReviewsListResponseDto>;
    /**
     * Update a review
     * PUT /reviews/:reviewId
     */
    updateReview(userId: number, reviewId: number, dto: UpdateReviewDto): Promise<ReviewResponseDto>;
    /**
     * Delete a review
     * DELETE /reviews/:reviewId
     */
    deleteReview(userId: number, reviewId: number): Promise<void>;
    /**
     * Add owner response to a review
     * POST /reviews/:reviewId/owner-response
     */
    addOwnerResponse(ownerId: number, reviewId: number, dto: OwnerResponseDto): Promise<ReviewResponseDto>;
    /**
     * Mark review as helpful
     * POST /reviews/:reviewId/helpful
     */
    markHelpful(userId: number, reviewId: number): Promise<{
        helpful_count: number;
    }>;
    /**
     * Report a review
     * POST /reviews/:reviewId/report
     */
    reportReview(userId: number, reviewId: number, body: {
        reason: string;
    }): Promise<void>;
}
