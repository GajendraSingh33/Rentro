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
exports.ListingService = void 0;
const common_1 = require("@nestjs/common");
const pg_listing_entity_1 = require("../typeorm/entities/pg-listing.entity");
let ListingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ListingService = _classThis = class {
        constructor(listingRepository) {
            this.listingRepository = listingRepository;
        }
        /**
         * Create a new PG listing
         */
        async createListing(createListingDto, userId) {
            // Validate available counts
            if (createListingDto.available_rooms > createListingDto.total_rooms) {
                throw new common_1.BadRequestException('Available rooms cannot exceed total rooms');
            }
            if (createListingDto.available_beds > createListingDto.total_beds) {
                throw new common_1.BadRequestException('Available beds cannot exceed total beds');
            }
            // Convert arrays to JSON strings
            const listingData = {
                ...createListingDto,
                owner_id: userId,
                status: pg_listing_entity_1.ListingStatus.DRAFT, // Start as draft
                amenities: createListingDto.amenities
                    ? JSON.stringify(createListingDto.amenities)
                    : null,
                nearby_landmarks: createListingDto.nearby_landmarks
                    ? JSON.stringify(createListingDto.nearby_landmarks)
                    : null,
            };
            const listing = this.listingRepository.create(listingData);
            return await this.listingRepository.save(listing);
        }
        /**
         * Update an existing listing
         */
        async updateListing(listingId, updateListingDto, userId) {
            const listing = await this.findListingById(listingId);
            // Check ownership
            if (listing.owner_id !== userId) {
                throw new common_1.ForbiddenException('You can only update your own listings');
            }
            // Validate available counts if provided
            if (updateListingDto.available_rooms !== undefined &&
                updateListingDto.available_rooms > (updateListingDto.total_rooms || listing.total_rooms)) {
                throw new common_1.BadRequestException('Available rooms cannot exceed total rooms');
            }
            if (updateListingDto.available_beds !== undefined &&
                updateListingDto.available_beds > (updateListingDto.total_beds || listing.total_beds)) {
                throw new common_1.BadRequestException('Available beds cannot exceed total beds');
            }
            // Convert arrays to JSON strings if provided
            const updateData = { ...updateListingDto };
            if (updateListingDto.amenities) {
                updateData.amenities = JSON.stringify(updateListingDto.amenities);
            }
            if (updateListingDto.nearby_landmarks) {
                updateData.nearby_landmarks = JSON.stringify(updateListingDto.nearby_landmarks);
            }
            await this.listingRepository.update(listingId, updateData);
            return await this.findListingById(listingId);
        }
        /**
         * Soft delete a listing
         */
        async deleteListing(listingId, userId) {
            const listing = await this.findListingById(listingId);
            // Check ownership
            if (listing.owner_id !== userId) {
                throw new common_1.ForbiddenException('You can only delete your own listings');
            }
            await this.listingRepository.softDelete(listingId);
        }
        /**
         * Get paginated and filtered listings
         */
        async getListings(filterDto) {
            const page = filterDto.page || 1;
            const limit = filterDto.limit || 20;
            const skip = (page - 1) * limit;
            const queryBuilder = this.listingRepository
                .createQueryBuilder('listing')
                .leftJoinAndSelect('listing.owner', 'owner')
                .leftJoinAndSelect('listing.media', 'media')
                .where('listing.deleted_at IS NULL');
            // Apply filters
            if (filterDto.city) {
                queryBuilder.andWhere('LOWER(listing.city) = LOWER(:city)', {
                    city: filterDto.city,
                });
            }
            if (filterDto.state) {
                queryBuilder.andWhere('LOWER(listing.state) = LOWER(:state)', {
                    state: filterDto.state,
                });
            }
            if (filterDto.min_rent !== undefined) {
                queryBuilder.andWhere('listing.monthly_rent >= :minRent', {
                    minRent: filterDto.min_rent,
                });
            }
            if (filterDto.max_rent !== undefined) {
                queryBuilder.andWhere('listing.monthly_rent <= :maxRent', {
                    maxRent: filterDto.max_rent,
                });
            }
            if (filterDto.room_type) {
                queryBuilder.andWhere('listing.room_type = :roomType', {
                    roomType: filterDto.room_type,
                });
            }
            if (filterDto.gender_preference) {
                queryBuilder.andWhere('listing.gender_preference = :genderPreference', {
                    genderPreference: filterDto.gender_preference,
                });
            }
            if (filterDto.food_type) {
                queryBuilder.andWhere('listing.food_type = :foodType', {
                    foodType: filterDto.food_type,
                });
            }
            if (filterDto.status) {
                queryBuilder.andWhere('listing.status = :status', {
                    status: filterDto.status,
                });
            }
            else {
                // By default, only show active listings
                queryBuilder.andWhere('listing.status = :status', {
                    status: pg_listing_entity_1.ListingStatus.ACTIVE,
                });
            }
            // Amenities filter (JSON contains)
            if (filterDto.amenities && filterDto.amenities.length > 0) {
                filterDto.amenities.forEach((amenity, index) => {
                    queryBuilder.andWhere(`listing.amenities LIKE :amenity${index}`, {
                        [`amenity${index}`]: `%${amenity}%`,
                    });
                });
            }
            // Sorting
            const sortBy = filterDto.sort_by || 'created_at';
            const sortOrder = filterDto.sort_order || 'DESC';
            if (sortBy === 'rent') {
                queryBuilder.orderBy('listing.monthly_rent', sortOrder);
            }
            else if (sortBy === 'popularity') {
                queryBuilder.orderBy('listing.view_count', sortOrder);
            }
            else {
                queryBuilder.orderBy(`listing.${sortBy}`, sortOrder);
            }
            // Get total count
            const total = await queryBuilder.getCount();
            // Apply pagination
            const data = await queryBuilder.skip(skip).take(limit).getMany();
            return {
                data,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        /**
         * Get a single listing by ID
         */
        async getListingById(listingId) {
            const listing = await this.listingRepository
                .createQueryBuilder('listing')
                .leftJoinAndSelect('listing.owner', 'owner')
                .leftJoinAndSelect('listing.media', 'media')
                .where('listing.id = :id', { id: listingId })
                .andWhere('listing.deleted_at IS NULL')
                .getOne();
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            // Increment view count
            await this.listingRepository.increment({ id: listingId }, 'view_count', 1);
            return listing;
        }
        /**
         * Get all listings for a specific owner
         */
        async getOwnerListings(userId) {
            return await this.listingRepository.find({
                where: { owner_id: userId },
                relations: ['media'],
                order: { created_at: 'DESC' },
            });
        }
        /**
         * Toggle listing status (active/inactive/draft)
         */
        async toggleListingStatus(listingId, statusDto, userId) {
            const listing = await this.findListingById(listingId);
            // Check ownership
            if (listing.owner_id !== userId) {
                throw new common_1.ForbiddenException('You can only update status of your own listings');
            }
            // Update status
            await this.listingRepository.update(listingId, {
                status: statusDto.status,
                rejection_reason: statusDto.rejection_reason || null,
            });
            return await this.findListingById(listingId);
        }
        /**
         * Approve a listing (admin/moderator only)
         */
        async approveListing(listingId, approverId) {
            const listing = await this.findListingById(listingId);
            if (listing.status !== pg_listing_entity_1.ListingStatus.PENDING_APPROVAL) {
                throw new common_1.BadRequestException('Only pending listings can be approved');
            }
            await this.listingRepository.update(listingId, {
                status: pg_listing_entity_1.ListingStatus.ACTIVE,
                approved_by: approverId,
                approved_at: new Date(),
                rejection_reason: null,
            });
            return await this.findListingById(listingId);
        }
        /**
         * Reject a listing (admin/moderator only)
         */
        async rejectListing(listingId, reason) {
            const listing = await this.findListingById(listingId);
            if (listing.status !== pg_listing_entity_1.ListingStatus.PENDING_APPROVAL) {
                throw new common_1.BadRequestException('Only pending listings can be rejected');
            }
            await this.listingRepository.update(listingId, {
                status: pg_listing_entity_1.ListingStatus.REJECTED,
                rejection_reason: reason,
            });
            return await this.findListingById(listingId);
        }
        /**
         * Submit listing for approval
         */
        async submitForApproval(listingId, userId) {
            const listing = await this.findListingById(listingId);
            // Check ownership
            if (listing.owner_id !== userId) {
                throw new common_1.ForbiddenException('You can only submit your own listings for approval');
            }
            if (listing.status !== pg_listing_entity_1.ListingStatus.DRAFT) {
                throw new common_1.BadRequestException('Only draft listings can be submitted');
            }
            await this.listingRepository.update(listingId, {
                status: pg_listing_entity_1.ListingStatus.PENDING_APPROVAL,
            });
            return await this.findListingById(listingId);
        }
        // Private helper method
        async findListingById(listingId) {
            const listing = await this.listingRepository.findOne({
                where: { id: listingId },
                relations: ['owner', 'media'],
            });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            return listing;
        }
    };
    __setFunctionName(_classThis, "ListingService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListingService = _classThis;
})();
exports.ListingService = ListingService;
