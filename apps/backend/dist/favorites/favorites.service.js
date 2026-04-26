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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const pg_listing_entity_1 = require("../typeorm/entities/pg-listing.entity");
let FavoritesService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FavoritesService = _classThis = class {
        constructor(favoriteRepository, listingRepository) {
            this.favoriteRepository = favoriteRepository;
            this.listingRepository = listingRepository;
        }
        /**
         * Add a listing to favorites
         */
        async addFavorite(userId, dto) {
            // Check if listing exists and is active
            const listing = await this.listingRepository.findOne({
                where: {
                    id: dto.listing_id,
                    status: pg_listing_entity_1.ListingStatus.ACTIVE,
                },
                relations: ['media'],
            });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found or not active');
            }
            // Check if already favorited
            const existing = await this.favoriteRepository.findOne({
                where: {
                    user_id: userId,
                    listing_id: dto.listing_id,
                },
            });
            if (existing) {
                throw new common_1.ConflictException('Listing already in favorites');
            }
            // Create favorite
            const favorite = this.favoriteRepository.create({
                user_id: userId,
                listing_id: dto.listing_id,
                notes: dto.notes,
            });
            const saved = await this.favoriteRepository.save(favorite);
            return this.transformToResponse(saved, listing);
        }
        /**
         * Remove a listing from favorites
         */
        async removeFavorite(userId, listingId) {
            const favorite = await this.favoriteRepository.findOne({
                where: {
                    user_id: userId,
                    listing_id: listingId,
                },
            });
            if (!favorite) {
                throw new common_1.NotFoundException('Favorite not found');
            }
            await this.favoriteRepository.remove(favorite);
        }
        /**
         * Toggle favorite status
         */
        async toggleFavorite(userId, listingId) {
            const existing = await this.favoriteRepository.findOne({
                where: {
                    user_id: userId,
                    listing_id: listingId,
                },
            });
            if (existing) {
                await this.favoriteRepository.remove(existing);
                return { is_favorite: false, favorite_id: null };
            }
            // Add to favorites
            const listing = await this.listingRepository.findOne({
                where: {
                    id: listingId,
                    status: pg_listing_entity_1.ListingStatus.ACTIVE,
                },
            });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found or not active');
            }
            const favorite = this.favoriteRepository.create({
                user_id: userId,
                listing_id: listingId,
            });
            const saved = await this.favoriteRepository.save(favorite);
            return { is_favorite: true, favorite_id: saved.id };
        }
        /**
         * Update favorite notes
         */
        async updateFavorite(userId, favoriteId, dto) {
            const favorite = await this.favoriteRepository.findOne({
                where: {
                    id: favoriteId,
                    user_id: userId,
                },
                relations: ['listing', 'listing.media'],
            });
            if (!favorite) {
                throw new common_1.NotFoundException('Favorite not found');
            }
            favorite.notes = dto.notes || null;
            const saved = await this.favoriteRepository.save(favorite);
            return this.transformToResponse(saved, favorite.listing);
        }
        /**
         * Get user's favorites list
         */
        async getFavorites(userId, query) {
            const page = query.page || 1;
            const limit = query.limit || 20;
            const skip = (page - 1) * limit;
            const [favorites, total] = await this.favoriteRepository
                .createQueryBuilder('favorite')
                .leftJoinAndSelect('favorite.listing', 'listing')
                .leftJoinAndSelect('listing.media', 'media')
                .where('favorite.user_id = :userId', { userId })
                .andWhere('listing.deleted_at IS NULL')
                .orderBy('favorite.created_at', 'DESC')
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            return {
                data: favorites.map((f) => this.transformToResponse(f, f.listing)),
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        /**
         * Check if a listing is favorited
         */
        async checkFavorite(userId, listingId) {
            const favorite = await this.favoriteRepository.findOne({
                where: {
                    user_id: userId,
                    listing_id: listingId,
                },
            });
            return {
                is_favorite: !!favorite,
                favorite_id: favorite?.id || null,
            };
        }
        /**
         * Check multiple listings for favorites (batch)
         */
        async checkMultipleFavorites(userId, listingIds) {
            const favorites = await this.favoriteRepository.find({
                where: {
                    user_id: userId,
                },
                select: ['listing_id'],
            });
            const favoriteSet = new Set(favorites.map((f) => f.listing_id));
            const result = {};
            listingIds.forEach((id) => {
                result[id] = favoriteSet.has(id);
            });
            return result;
        }
        /**
         * Get favorites count for user
         */
        async getFavoritesCount(userId) {
            return this.favoriteRepository.count({
                where: { user_id: userId },
            });
        }
        /**
         * Get listing IDs that user has favorited
         */
        async getFavoriteListingIds(userId) {
            const favorites = await this.favoriteRepository.find({
                where: { user_id: userId },
                select: ['listing_id'],
            });
            return favorites.map((f) => f.listing_id);
        }
        // Private helper methods
        transformToResponse(favorite, listing) {
            const thumbnail = listing.media?.find((m) => m.type === 'image' && m.is_thumbnail)?.url ||
                listing.media?.find((m) => m.type === 'image')?.url ||
                null;
            return {
                id: favorite.id,
                listing_id: favorite.listing_id,
                notes: favorite.notes,
                created_at: favorite.created_at,
                listing: {
                    id: listing.id,
                    title: listing.title,
                    address: listing.address,
                    city: listing.city,
                    monthly_rent: Number(listing.monthly_rent),
                    room_type: listing.room_type,
                    gender_preference: listing.gender_preference,
                    available_rooms: listing.available_rooms,
                    available_beds: listing.available_beds,
                    average_rating: listing.average_rating
                        ? Number(listing.average_rating)
                        : null,
                    thumbnail_url: thumbnail,
                    is_available: listing.available_beds > 0 || listing.available_rooms > 0,
                },
            };
        }
    };
    __setFunctionName(_classThis, "FavoritesService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FavoritesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FavoritesService = _classThis;
})();
exports.FavoritesService = FavoritesService;
