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
exports.SeekerDashboardService = void 0;
const common_1 = require("@nestjs/common");
const inquiry_entity_1 = require("../typeorm/entities/inquiry.entity");
const pg_listing_entity_1 = require("../typeorm/entities/pg-listing.entity");
let SeekerDashboardService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SeekerDashboardService = _classThis = class {
        constructor(favoriteRepository, inquiryRepository, reviewRepository, listingRepository) {
            this.favoriteRepository = favoriteRepository;
            this.inquiryRepository = inquiryRepository;
            this.reviewRepository = reviewRepository;
            this.listingRepository = listingRepository;
        }
        /**
         * Get seeker dashboard overview
         */
        async getDashboardOverview(userId) {
            // Get counts
            const [favoritesCount, inquiriesSent, inquiriesResponded, reviewsWritten,] = await Promise.all([
                this.favoriteRepository.count({ where: { user_id: userId } }),
                this.inquiryRepository.count({ where: { seeker_id: userId } }),
                this.inquiryRepository.count({
                    where: {
                        seeker_id: userId,
                        status: inquiry_entity_1.InquiryStatus.RESPONDED,
                    },
                }),
                this.reviewRepository.count({ where: { user_id: userId } }),
            ]);
            // Get recent favorites
            const recentFavorites = await this.getRecentFavorites(userId, 5);
            // Get recent inquiries
            const recentInquiries = await this.getRecentInquiries(userId, 5);
            // Get recommended listings
            const recommendedListings = await this.getRecommendedListings(userId, 6);
            return {
                favorites_count: favoritesCount,
                inquiries_sent: inquiriesSent,
                inquiries_responded: inquiriesResponded,
                reviews_written: reviewsWritten,
                recent_favorites: recentFavorites,
                recent_inquiries: recentInquiries,
                recommended_listings: recommendedListings,
            };
        }
        /**
         * Get seeker's inquiry history
         */
        async getInquiryHistory(userId, query) {
            const page = query.page || 1;
            const limit = query.limit || 10;
            const skip = (page - 1) * limit;
            const [inquiries, total] = await this.inquiryRepository
                .createQueryBuilder('inquiry')
                .leftJoinAndSelect('inquiry.listing', 'listing')
                .leftJoinAndSelect('listing.owner', 'owner')
                .leftJoinAndSelect('listing.media', 'media')
                .where('inquiry.seeker_id = :userId', { userId })
                .orderBy('inquiry.created_at', 'DESC')
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            const data = inquiries.map((inquiry) => {
                const thumbnail = inquiry.listing?.media?.find((m) => m.type === 'image' && m.is_thumbnail)?.url ||
                    inquiry.listing?.media?.find((m) => m.type === 'image')?.url ||
                    null;
                return {
                    id: inquiry.id,
                    listing_id: inquiry.listing_id,
                    listing: {
                        id: inquiry.listing?.id,
                        title: inquiry.listing?.title || 'Listing Unavailable',
                        address: inquiry.listing?.address || '',
                        city: inquiry.listing?.city || '',
                        monthly_rent: Number(inquiry.listing?.monthly_rent) || 0,
                        thumbnail_url: thumbnail,
                        owner_name: inquiry.listing?.owner
                            ? `${inquiry.listing.owner.first_name} ${inquiry.listing.owner.last_name || ''}`
                            : 'Unknown',
                    },
                    message: inquiry.message,
                    status: inquiry.status,
                    response: inquiry.response || null,
                    responded_at: inquiry.responded_at || null,
                    contact_revealed: inquiry.contact_revealed || false,
                    created_at: inquiry.created_at,
                };
            });
            return {
                data,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        /**
         * Get inquiry statistics
         */
        async getInquiryStats(userId) {
            const stats = await this.inquiryRepository
                .createQueryBuilder('inquiry')
                .select('inquiry.status', 'status')
                .addSelect('COUNT(*)', 'count')
                .where('inquiry.seeker_id = :userId', { userId })
                .groupBy('inquiry.status')
                .getRawMany();
            const result = {
                total: 0,
                pending: 0,
                viewed: 0,
                responded: 0,
                rejected: 0,
            };
            stats.forEach((s) => {
                const count = parseInt(s.count);
                result.total += count;
                switch (s.status) {
                    case inquiry_entity_1.InquiryStatus.NEW:
                        result.pending = count;
                        break;
                    case inquiry_entity_1.InquiryStatus.VIEWED:
                        result.viewed = count;
                        break;
                    case inquiry_entity_1.InquiryStatus.RESPONDED:
                        result.responded = count;
                        break;
                    case inquiry_entity_1.InquiryStatus.REJECTED:
                        result.rejected = count;
                        break;
                }
            });
            return result;
        }
        /**
         * Get activity timeline
         */
        async getActivityTimeline(userId, limit = 20) {
            // Get recent favorites
            const favorites = await this.favoriteRepository
                .createQueryBuilder('favorite')
                .leftJoinAndSelect('favorite.listing', 'listing')
                .where('favorite.user_id = :userId', { userId })
                .orderBy('favorite.created_at', 'DESC')
                .limit(10)
                .getMany();
            // Get recent inquiries
            const inquiries = await this.inquiryRepository
                .createQueryBuilder('inquiry')
                .leftJoinAndSelect('inquiry.listing', 'listing')
                .where('inquiry.seeker_id = :userId', { userId })
                .orderBy('inquiry.created_at', 'DESC')
                .limit(10)
                .getMany();
            // Get recent reviews
            const reviews = await this.reviewRepository
                .createQueryBuilder('review')
                .leftJoinAndSelect('review.listing', 'listing')
                .where('review.user_id = :userId', { userId })
                .orderBy('review.created_at', 'DESC')
                .limit(10)
                .getMany();
            // Combine and sort
            const timeline = [];
            favorites.forEach((f) => {
                timeline.push({
                    type: 'favorite',
                    title: 'Added to favorites',
                    description: f.listing?.title || 'Unknown listing',
                    listing_id: f.listing_id,
                    created_at: f.created_at,
                });
            });
            inquiries.forEach((i) => {
                timeline.push({
                    type: 'inquiry',
                    title: 'Sent inquiry',
                    description: i.listing?.title || 'Unknown listing',
                    listing_id: i.listing_id,
                    created_at: i.created_at,
                });
                if (i.responded_at) {
                    timeline.push({
                        type: 'inquiry_response',
                        title: 'Received response',
                        description: i.listing?.title || 'Unknown listing',
                        listing_id: i.listing_id,
                        created_at: i.responded_at,
                    });
                }
            });
            reviews.forEach((r) => {
                timeline.push({
                    type: 'review',
                    title: 'Posted review',
                    description: `${r.rating} stars - ${r.listing?.title || 'Unknown listing'}`,
                    listing_id: r.listing_id,
                    created_at: r.created_at,
                });
            });
            // Sort by date and limit
            return timeline
                .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
                .slice(0, limit);
        }
        // Private helper methods
        async getRecentFavorites(userId, limit) {
            const favorites = await this.favoriteRepository
                .createQueryBuilder('favorite')
                .leftJoinAndSelect('favorite.listing', 'listing')
                .leftJoinAndSelect('listing.media', 'media')
                .where('favorite.user_id = :userId', { userId })
                .orderBy('favorite.created_at', 'DESC')
                .limit(limit)
                .getMany();
            return favorites.map((f) => {
                const thumbnail = f.listing?.media?.find((m) => m.type === 'image' && m.is_thumbnail)?.url ||
                    f.listing?.media?.find((m) => m.type === 'image')?.url ||
                    null;
                return {
                    id: f.id,
                    listing_id: f.listing_id,
                    title: f.listing?.title || 'Unavailable',
                    city: f.listing?.city || '',
                    monthly_rent: Number(f.listing?.monthly_rent) || 0,
                    thumbnail_url: thumbnail,
                    created_at: f.created_at,
                };
            });
        }
        async getRecentInquiries(userId, limit) {
            const inquiries = await this.inquiryRepository
                .createQueryBuilder('inquiry')
                .leftJoinAndSelect('inquiry.listing', 'listing')
                .leftJoinAndSelect('listing.owner', 'owner')
                .where('inquiry.seeker_id = :userId', { userId })
                .orderBy('inquiry.created_at', 'DESC')
                .limit(limit)
                .getMany();
            return inquiries.map((i) => ({
                id: i.id,
                listing_id: i.listing_id,
                listing_title: i.listing?.title || 'Unavailable',
                status: i.status,
                owner_name: i.listing?.owner
                    ? `${i.listing.owner.first_name} ${i.listing.owner.last_name || ''}`
                    : 'Unknown',
                has_response: !!i.response,
                created_at: i.created_at,
            }));
        }
        async getRecommendedListings(userId, limit) {
            // Get user's favorite cities and price ranges for recommendations
            const favorites = await this.favoriteRepository.find({
                where: { user_id: userId },
                relations: ['listing'],
                take: 10,
            });
            const favoriteCities = [...new Set(favorites.map((f) => f.listing?.city).filter(Boolean))];
            const favoriteListingIds = favorites.map((f) => f.listing_id);
            // Build query for recommendations
            const queryBuilder = this.listingRepository
                .createQueryBuilder('listing')
                .leftJoinAndSelect('listing.media', 'media')
                .where('listing.status = :status', { status: pg_listing_entity_1.ListingStatus.ACTIVE })
                .andWhere('listing.deleted_at IS NULL')
                .andWhere('(listing.available_beds > 0 OR listing.available_rooms > 0)');
            // Exclude already favorited
            if (favoriteListingIds.length > 0) {
                queryBuilder.andWhere('listing.id NOT IN (:...favoriteIds)', {
                    favoriteIds: favoriteListingIds,
                });
            }
            // Prefer user's favorite cities
            if (favoriteCities.length > 0) {
                queryBuilder.addOrderBy(`CASE WHEN listing.city IN ('${favoriteCities.join("','")}') THEN 0 ELSE 1 END`, 'ASC');
            }
            // Order by quality metrics
            queryBuilder
                .addOrderBy('listing.is_featured', 'DESC')
                .addOrderBy('listing.average_rating', 'DESC', 'NULLS LAST')
                .addOrderBy('listing.view_count', 'DESC')
                .limit(limit);
            const listings = await queryBuilder.getMany();
            return listings.map((l) => {
                const thumbnail = l.media?.find((m) => m.type === 'image' && m.is_thumbnail)?.url ||
                    l.media?.find((m) => m.type === 'image')?.url ||
                    null;
                return {
                    id: l.id,
                    title: l.title,
                    address: l.address,
                    city: l.city,
                    monthly_rent: Number(l.monthly_rent),
                    room_type: l.room_type,
                    average_rating: l.average_rating ? Number(l.average_rating) : null,
                    thumbnail_url: thumbnail,
                };
            });
        }
    };
    __setFunctionName(_classThis, "SeekerDashboardService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SeekerDashboardService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SeekerDashboardService = _classThis;
})();
exports.SeekerDashboardService = SeekerDashboardService;
