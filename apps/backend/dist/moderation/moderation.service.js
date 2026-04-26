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
exports.ModerationService = void 0;
const common_1 = require("@nestjs/common");
const pg_listing_entity_1 = require("../typeorm/entities/pg-listing.entity");
let ModerationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ModerationService = _classThis = class {
        constructor(listingRepository) {
            this.listingRepository = listingRepository;
        }
        async getPendingListings(page = 1, limit = 20) {
            const [listings, total] = await this.listingRepository.findAndCount({
                where: { status: pg_listing_entity_1.ListingStatus.PENDING_APPROVAL },
                relations: ['owner'],
                order: { created_at: 'ASC' },
                take: limit,
                skip: (page - 1) * limit,
            });
            return {
                data: listings,
                meta: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit),
                },
            };
        }
        async approveListing(listingId, moderatorId) {
            const listing = await this.listingRepository.findOne({ where: { id: listingId } });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            if (listing.status !== pg_listing_entity_1.ListingStatus.PENDING_APPROVAL) {
                throw new common_1.BadRequestException('Listing is not pending approval');
            }
            listing.status = pg_listing_entity_1.ListingStatus.ACTIVE;
            listing.approved_at = new Date();
            listing.approved_by = moderatorId;
            listing.rejection_reason = null;
            return await this.listingRepository.save(listing);
        }
        async rejectListing(listingId, moderatorId, reason) {
            const listing = await this.listingRepository.findOne({ where: { id: listingId } });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            if (listing.status !== pg_listing_entity_1.ListingStatus.PENDING_APPROVAL) {
                throw new common_1.BadRequestException('Listing is not pending approval');
            }
            listing.status = pg_listing_entity_1.ListingStatus.REJECTED;
            listing.rejection_reason = reason;
            listing.approved_by = moderatorId;
            return await this.listingRepository.save(listing);
        }
        async flagListing(listingId, reason) {
            const listing = await this.listingRepository.findOne({ where: { id: listingId } });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            listing.is_flagged = true;
            listing.flag_reason = reason;
            listing.status = pg_listing_entity_1.ListingStatus.PENDING_APPROVAL;
            return await this.listingRepository.save(listing);
        }
        async unflagListing(listingId) {
            const listing = await this.listingRepository.findOne({ where: { id: listingId } });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            listing.is_flagged = false;
            listing.flag_reason = null;
            return await this.listingRepository.save(listing);
        }
        async getModerationStats() {
            const pending = await this.listingRepository.count({ where: { status: pg_listing_entity_1.ListingStatus.PENDING_APPROVAL } });
            const flagged = await this.listingRepository.count({ where: { is_flagged: true } });
            const rejected = await this.listingRepository.count({ where: { status: pg_listing_entity_1.ListingStatus.REJECTED } });
            return { pending, flagged, rejected };
        }
    };
    __setFunctionName(_classThis, "ModerationService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ModerationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ModerationService = _classThis;
})();
exports.ModerationService = ModerationService;
