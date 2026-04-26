"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ReviewsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('reviews')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createReview_decorators;
    let _getListingReviews_decorators;
    let _getRatingSummary_decorators;
    let _getMyReviews_decorators;
    let _updateReview_decorators;
    let _deleteReview_decorators;
    let _addOwnerResponse_decorators;
    let _markHelpful_decorators;
    let _reportReview_decorators;
    var ReviewsController = _classThis = class {
        constructor(reviewsService) {
            this.reviewsService = (__runInitializers(this, _instanceExtraInitializers), reviewsService);
        }
        /**
         * Create a new review
         * POST /reviews
         */
        async createReview(userId, dto) {
            return this.reviewsService.createReview(userId, dto);
        }
        /**
         * Get reviews for a listing
         * GET /reviews/listing/:listingId
         */
        async getListingReviews(listingId, query) {
            return this.reviewsService.getListingReviews(listingId, query);
        }
        /**
         * Get rating summary for a listing
         * GET /reviews/listing/:listingId/summary
         */
        async getRatingSummary(listingId) {
            return this.reviewsService.getRatingSummary(listingId);
        }
        /**
         * Get user's reviews
         * GET /reviews/my-reviews
         */
        async getMyReviews(userId, query) {
            return this.reviewsService.getUserReviews(userId, query);
        }
        /**
         * Update a review
         * PUT /reviews/:reviewId
         */
        async updateReview(userId, reviewId, dto) {
            return this.reviewsService.updateReview(userId, reviewId, dto);
        }
        /**
         * Delete a review
         * DELETE /reviews/:reviewId
         */
        async deleteReview(userId, reviewId) {
            return this.reviewsService.deleteReview(userId, reviewId);
        }
        /**
         * Add owner response to a review
         * POST /reviews/:reviewId/owner-response
         */
        async addOwnerResponse(ownerId, reviewId, dto) {
            return this.reviewsService.addOwnerResponse(ownerId, reviewId, dto);
        }
        /**
         * Mark review as helpful
         * POST /reviews/:reviewId/helpful
         */
        async markHelpful(userId, reviewId) {
            return this.reviewsService.markHelpful(userId, reviewId);
        }
        /**
         * Report a review
         * POST /reviews/:reviewId/report
         */
        async reportReview(userId, reviewId, body) {
            return this.reviewsService.reportReview(userId, reviewId, body.reason);
        }
    };
    __setFunctionName(_classThis, "ReviewsController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createReview_decorators = [(0, common_1.Post)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED)];
        _getListingReviews_decorators = [(0, common_1.Get)('listing/:listingId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getRatingSummary_decorators = [(0, common_1.Get)('listing/:listingId/summary'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getMyReviews_decorators = [(0, common_1.Get)('my-reviews'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _updateReview_decorators = [(0, common_1.Put)(':reviewId'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _deleteReview_decorators = [(0, common_1.Delete)(':reviewId'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
        _addOwnerResponse_decorators = [(0, common_1.Post)(':reviewId/owner-response'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _markHelpful_decorators = [(0, common_1.Post)(':reviewId/helpful'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _reportReview_decorators = [(0, common_1.Post)(':reviewId/report'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
        __esDecorate(_classThis, null, _createReview_decorators, { kind: "method", name: "createReview", static: false, private: false, access: { has: obj => "createReview" in obj, get: obj => obj.createReview }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getListingReviews_decorators, { kind: "method", name: "getListingReviews", static: false, private: false, access: { has: obj => "getListingReviews" in obj, get: obj => obj.getListingReviews }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRatingSummary_decorators, { kind: "method", name: "getRatingSummary", static: false, private: false, access: { has: obj => "getRatingSummary" in obj, get: obj => obj.getRatingSummary }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyReviews_decorators, { kind: "method", name: "getMyReviews", static: false, private: false, access: { has: obj => "getMyReviews" in obj, get: obj => obj.getMyReviews }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateReview_decorators, { kind: "method", name: "updateReview", static: false, private: false, access: { has: obj => "updateReview" in obj, get: obj => obj.updateReview }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteReview_decorators, { kind: "method", name: "deleteReview", static: false, private: false, access: { has: obj => "deleteReview" in obj, get: obj => obj.deleteReview }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addOwnerResponse_decorators, { kind: "method", name: "addOwnerResponse", static: false, private: false, access: { has: obj => "addOwnerResponse" in obj, get: obj => obj.addOwnerResponse }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markHelpful_decorators, { kind: "method", name: "markHelpful", static: false, private: false, access: { has: obj => "markHelpful" in obj, get: obj => obj.markHelpful }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reportReview_decorators, { kind: "method", name: "reportReview", static: false, private: false, access: { has: obj => "reportReview" in obj, get: obj => obj.reportReview }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReviewsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReviewsController = _classThis;
})();
exports.ReviewsController = ReviewsController;
