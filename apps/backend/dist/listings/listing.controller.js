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
exports.ListingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../typeorm/entities/user.entity");
let ListingController = (() => {
    let _classDecorators = [(0, common_1.Controller)('listings')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createListing_decorators;
    let _getListings_decorators;
    let _getListingById_decorators;
    let _getMyListings_decorators;
    let _updateListing_decorators;
    let _deleteListing_decorators;
    let _updateListingStatus_decorators;
    let _submitForApproval_decorators;
    let _approveListing_decorators;
    let _rejectListing_decorators;
    var ListingController = _classThis = class {
        constructor(listingService) {
            this.listingService = (__runInitializers(this, _instanceExtraInitializers), listingService);
        }
        /**
         * Create a new listing
         * POST /listings
         */
        async createListing(createListingDto, req) {
            return await this.listingService.createListing(createListingDto, req.user.id);
        }
        /**
         * Get all listings (public, filtered, paginated)
         * GET /listings
         */
        async getListings(filterDto) {
            return await this.listingService.getListings(filterDto);
        }
        /**
         * Get a single listing by ID
         * GET /listings/:id
         */
        async getListingById(id) {
            return await this.listingService.getListingById(id);
        }
        /**
         * Get all listings for the authenticated owner
         * GET /listings/owner/me
         */
        async getMyListings(req) {
            return await this.listingService.getOwnerListings(req.user.id);
        }
        /**
         * Update a listing
         * PUT /listings/:id
         */
        async updateListing(id, updateListingDto, req) {
            return await this.listingService.updateListing(id, updateListingDto, req.user.id);
        }
        /**
         * Delete a listing
         * DELETE /listings/:id
         */
        async deleteListing(id, req) {
            await this.listingService.deleteListing(id, req.user.id);
        }
        /**
         * Update listing status
         * PATCH /listings/:id/status
         */
        async updateListingStatus(id, statusDto, req) {
            return await this.listingService.toggleListingStatus(id, statusDto, req.user.id);
        }
        /**
         * Submit listing for approval
         * POST /listings/:id/submit
         */
        async submitForApproval(id, req) {
            return await this.listingService.submitForApproval(id, req.user.id);
        }
        /**
         * Approve a listing (Admin/Moderator only)
         * POST /listings/:id/approve
         */
        async approveListing(id, req) {
            return await this.listingService.approveListing(id, req.user.id);
        }
        /**
         * Reject a listing (Admin/Moderator only)
         * POST /listings/:id/reject
         */
        async rejectListing(id, reason) {
            return await this.listingService.rejectListing(id, reason);
        }
    };
    __setFunctionName(_classThis, "ListingController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createListing_decorators = [(0, common_1.Post)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.OWNER)];
        _getListings_decorators = [(0, common_1.Get)()];
        _getListingById_decorators = [(0, common_1.Get)(':id')];
        _getMyListings_decorators = [(0, common_1.Get)('owner/me'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.OWNER)];
        _updateListing_decorators = [(0, common_1.Put)(':id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.OWNER)];
        _deleteListing_decorators = [(0, common_1.Delete)(':id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.OWNER), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
        _updateListingStatus_decorators = [(0, common_1.Patch)(':id/status'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.OWNER)];
        _submitForApproval_decorators = [(0, common_1.Post)(':id/submit'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.OWNER)];
        _approveListing_decorators = [(0, common_1.Post)(':id/approve'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN)];
        _rejectListing_decorators = [(0, common_1.Post)(':id/reject'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN)];
        __esDecorate(_classThis, null, _createListing_decorators, { kind: "method", name: "createListing", static: false, private: false, access: { has: obj => "createListing" in obj, get: obj => obj.createListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getListings_decorators, { kind: "method", name: "getListings", static: false, private: false, access: { has: obj => "getListings" in obj, get: obj => obj.getListings }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getListingById_decorators, { kind: "method", name: "getListingById", static: false, private: false, access: { has: obj => "getListingById" in obj, get: obj => obj.getListingById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyListings_decorators, { kind: "method", name: "getMyListings", static: false, private: false, access: { has: obj => "getMyListings" in obj, get: obj => obj.getMyListings }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateListing_decorators, { kind: "method", name: "updateListing", static: false, private: false, access: { has: obj => "updateListing" in obj, get: obj => obj.updateListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteListing_decorators, { kind: "method", name: "deleteListing", static: false, private: false, access: { has: obj => "deleteListing" in obj, get: obj => obj.deleteListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateListingStatus_decorators, { kind: "method", name: "updateListingStatus", static: false, private: false, access: { has: obj => "updateListingStatus" in obj, get: obj => obj.updateListingStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _submitForApproval_decorators, { kind: "method", name: "submitForApproval", static: false, private: false, access: { has: obj => "submitForApproval" in obj, get: obj => obj.submitForApproval }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approveListing_decorators, { kind: "method", name: "approveListing", static: false, private: false, access: { has: obj => "approveListing" in obj, get: obj => obj.approveListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _rejectListing_decorators, { kind: "method", name: "rejectListing", static: false, private: false, access: { has: obj => "rejectListing" in obj, get: obj => obj.rejectListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListingController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListingController = _classThis;
})();
exports.ListingController = ListingController;
