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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
let AnalyticsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnalyticsService = _classThis = class {
        constructor(listingRepository, inquiryRepository) {
            this.listingRepository = listingRepository;
            this.inquiryRepository = inquiryRepository;
        }
        async getOwnerDashboardOverview(ownerId) {
            const [listings, inquiries] = await Promise.all([
                this.listingRepository.find({ where: { owner_id: ownerId } }),
                this.inquiryRepository.find({ where: { owner_id: ownerId } }),
            ]);
            const totalListings = listings.length;
            const activeListings = listings.filter(l => l.status === 'active').length;
            const draftListings = listings.filter(l => l.status === 'draft').length;
            const totalViews = listings.reduce((sum, l) => sum + l.view_count, 0);
            const totalInquiries = inquiries.length;
            const newInquiries = inquiries.filter(i => i.status === 'new').length;
            const respondedInquiries = inquiries.filter(i => i.status === 'responded').length;
            return {
                listings: { total: totalListings, active: activeListings, draft: draftListings },
                views: { total: totalViews },
                inquiries: { total: totalInquiries, new: newInquiries, responded: respondedInquiries },
                inquiryRate: totalViews > 0 ? ((totalInquiries / totalViews) * 100).toFixed(2) : 0,
            };
        }
        async getListingAnalytics(listingId) {
            const listing = await this.listingRepository.findOne({ where: { id: listingId } });
            if (!listing)
                return null;
            const inquiries = await this.inquiryRepository.count({ where: { listing_id: listingId } });
            return {
                views: listing.view_count,
                inquiries,
                inquiryRate: listing.view_count > 0 ? ((inquiries / listing.view_count) * 100).toFixed(2) : 0,
                averageRating: listing.average_rating,
                reviewCount: listing.review_count,
            };
        }
        async getTopPerformingListings(ownerId, limit = 5) {
            return await this.listingRepository
                .createQueryBuilder('listing')
                .where('listing.owner_id = :ownerId', { ownerId })
                .orderBy('listing.view_count', 'DESC')
                .take(limit)
                .getMany();
        }
        async getViewsOverTime(ownerId, days = 30) {
            // Simplified - in production, use a separate analytics table
            const listings = await this.listingRepository.find({ where: { owner_id: ownerId } });
            const totalViews = listings.reduce((sum, l) => sum + l.view_count, 0);
            return [{ date: new Date().toISOString().split('T')[0], views: totalViews }];
        }
        async getInquiriesOverTime(ownerId, days = 30) {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);
            const inquiries = await this.inquiryRepository
                .createQueryBuilder('inquiry')
                .where('inquiry.owner_id = :ownerId', { ownerId })
                .andWhere('inquiry.created_at >= :startDate', { startDate })
                .select("DATE(inquiry.created_at)", "date")
                .addSelect("COUNT(*)", "count")
                .groupBy("DATE(inquiry.created_at)")
                .getRawMany();
            return inquiries;
        }
    };
    __setFunctionName(_classThis, "AnalyticsService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnalyticsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnalyticsService = _classThis;
})();
exports.AnalyticsService = AnalyticsService;
