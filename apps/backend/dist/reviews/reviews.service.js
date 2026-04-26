"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const review_entity_1 = require("../typeorm/entities/review.entity");
let ReviewsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ReviewsService = _classThis = class {
        constructor(reviewRepository, listingRepository) {
            this.reviewRepository = reviewRepository;
            this.listingRepository = listingRepository;
        }
        /**
         * Create a new review
         */
        async createReview(userId, dto) {
            // Check if listing exists
            const listing = await this.listingRepository.findOne({
                where: { id: dto.listing_id },
            });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            // Cannot review own listing
            if (listing.owner_id === userId) {
                throw new common_1.ForbiddenException('You cannot review your own listing');
            }
            // Check for existing review
            const existing = await this.reviewRepository.findOne({
                where: {
                    user_id: userId,
                    listing_id: dto.listing_id,
                },
            });
            if (existing) {
                throw new common_1.ConflictException('You have already reviewed this listing. Please update your existing review.');
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
                status: review_entity_1.ReviewStatus.APPROVED, // Auto-approve for now
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
        async updateReview(userId, reviewId, dto) {
            const review = await this.reviewRepository.findOne({
                where: { id: reviewId },
                relations: ['user'],
            });
            if (!review) {
                throw new common_1.NotFoundException('Review not found');
            }
            if (review.user_id !== userId) {
                throw new common_1.ForbiddenException('You can only update your own reviews');
            }
            // Update fields
            if (dto.rating !== undefined)
                review.rating = dto.rating;
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
            if (dto.title !== undefined)
                review.title = dto.title;
            if (dto.content !== undefined)
                review.content = dto.content;
            if (dto.pros !== undefined)
                review.pros = JSON.stringify(dto.pros);
            if (dto.cons !== undefined)
                review.cons = JSON.stringify(dto.cons);
            const saved = await this.reviewRepository.save(review);
            // Update listing average rating
            await this.updateListingRating(review.listing_id);
            return this.transformToResponse(saved);
        }
        /**
         * Delete a review
         */
        async deleteReview(userId, reviewId) {
            const review = await this.reviewRepository.findOne({
                where: { id: reviewId },
            });
            if (!review) {
                throw new common_1.NotFoundException('Review not found');
            }
            if (review.user_id !== userId) {
                throw new common_1.ForbiddenException('You can only delete your own reviews');
            }
            const listingId = review.listing_id;
            await this.reviewRepository.softDelete(reviewId);
            // Update listing average rating
            await this.updateListingRating(listingId);
        }
        /**
         * Get reviews for a listing
         */
        async getListingReviews(listingId, query) {
            const page = query.page || 1;
            const limit = query.limit || 10;
            const skip = (page - 1) * limit;
            const queryBuilder = this.reviewRepository
                .createQueryBuilder('review')
                .leftJoinAndSelect('review.user', 'user')
                .where('review.listing_id = :listingId', { listingId })
                .andWhere('review.deleted_at IS NULL')
                .andWhere('review.status = :status', { status: review_entity_1.ReviewStatus.APPROVED });
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
        async getRatingSummary(listingId) {
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
                .andWhere('review.status = :status', { status: review_entity_1.ReviewStatus.APPROVED })
                .getRawOne();
            // Get rating distribution
            const distribution = await this.reviewRepository
                .createQueryBuilder('review')
                .select('FLOOR(review.rating)', 'rating')
                .addSelect('COUNT(*)', 'count')
                .where('review.listing_id = :listingId', { listingId })
                .andWhere('review.deleted_at IS NULL')
                .andWhere('review.status = :status', { status: review_entity_1.ReviewStatus.APPROVED })
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
                const key = Math.floor(d.rating).toString();
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
        async addOwnerResponse(ownerId, reviewId, dto) {
            const review = await this.reviewRepository.findOne({
                where: { id: reviewId },
                relations: ['listing', 'user'],
            });
            if (!review) {
                throw new common_1.NotFoundException('Review not found');
            }
            if (review.listing.owner_id !== ownerId) {
                throw new common_1.ForbiddenException('You can only respond to reviews on your own listings');
            }
            review.owner_response = dto.response;
            review.owner_responded_at = new Date();
            const saved = await this.reviewRepository.save(review);
            return this.transformToResponse(saved);
        }
        /**
         * Mark review as helpful
         */
        async markHelpful(userId, reviewId) {
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
        async reportReview(userId, reviewId, reason) {
            const review = await this.reviewRepository.findOne({
                where: { id: reviewId },
            });
            if (!review) {
                throw new common_1.NotFoundException('Review not found');
            }
            // Increment report count (in real app, store individual reports)
            await this.reviewRepository.increment({ id: reviewId }, 'report_count', 1);
            // If report count exceeds threshold, flag for moderation
            if (review.report_count + 1 >= 3) {
                await this.reviewRepository.update(reviewId, {
                    status: review_entity_1.ReviewStatus.FLAGGED,
                });
            }
        }
        /**
         * Get user's reviews
         */
        async getUserReviews(userId, query) {
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
        async updateListingRating(listingId) {
            const stats = await this.reviewRepository
                .createQueryBuilder('review')
                .select('AVG(review.rating)', 'avgRating')
                .addSelect('COUNT(*)', 'count')
                .where('review.listing_id = :listingId', { listingId })
                .andWhere('review.deleted_at IS NULL')
                .andWhere('review.status = :status', { status: review_entity_1.ReviewStatus.APPROVED })
                .getRawOne();
            await this.listingRepository.update(listingId, {
                average_rating: stats.avgRating ? parseFloat(stats.avgRating) : null,
                review_count: parseInt(stats.count) || 0,
            });
        }
        transformToResponse(review) {
            let pros = [];
            let cons = [];
            try {
                pros = review.pros ? JSON.parse(review.pros) : [];
                cons = review.cons ? JSON.parse(review.cons) : [];
            }
            catch (e) {
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
    };
    __setFunctionName(_classThis, "ReviewsService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReviewsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReviewsService = _classThis;
})();
exports.ReviewsService = ReviewsService;
