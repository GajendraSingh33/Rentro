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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
let AdminController = (() => {
    let _classDecorators = [(0, common_1.Controller)('admin'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _listUsers_decorators;
    let _getUserById_decorators;
    let _updateUser_decorators;
    let _updateUserStatus_decorators;
    let _updateUserRole_decorators;
    let _deleteUser_decorators;
    let _listListings_decorators;
    let _getListingById_decorators;
    let _moderateListing_decorators;
    let _verifyListing_decorators;
    let _featureListing_decorators;
    let _deleteListing_decorators;
    let _getPlatformOverview_decorators;
    let _getUserGrowthStats_decorators;
    let _getListingStats_decorators;
    let _getCityStats_decorators;
    let _getRecentActivity_decorators;
    var AdminController = _classThis = class {
        constructor(adminService) {
            this.adminService = (__runInitializers(this, _instanceExtraInitializers), adminService);
        }
        // ============ User Management ============
        async listUsers(dto) {
            return this.adminService.listUsers(dto);
        }
        async getUserById(id) {
            return this.adminService.getUserById(id);
        }
        async updateUser(id, dto) {
            return this.adminService.updateUser(id, dto);
        }
        async updateUserStatus(id, dto, adminId) {
            return this.adminService.updateUserStatus(id, dto, adminId);
        }
        async updateUserRole(id, dto, adminId) {
            return this.adminService.updateUserRole(id, dto, adminId);
        }
        async deleteUser(id, adminId) {
            return this.adminService.deleteUser(id, adminId);
        }
        // ============ Listing Moderation ============
        async listListings(dto) {
            return this.adminService.listListings(dto);
        }
        async getListingById(id) {
            return this.adminService.getListingById(id);
        }
        async moderateListing(id, dto, adminId) {
            return this.adminService.moderateListing(id, dto, adminId);
        }
        async verifyListing(id, dto) {
            return this.adminService.verifyListing(id, dto);
        }
        async featureListing(id, dto) {
            return this.adminService.featureListing(id, dto);
        }
        async deleteListing(id) {
            return this.adminService.deleteListing(id);
        }
        // ============ Analytics ============
        async getPlatformOverview() {
            return this.adminService.getPlatformOverview();
        }
        async getUserGrowthStats(dto) {
            return this.adminService.getUserGrowthStats(dto);
        }
        async getListingStats(dto) {
            return this.adminService.getListingStats(dto);
        }
        async getCityStats() {
            return this.adminService.getCityStats();
        }
        async getRecentActivity(limit) {
            return this.adminService.getRecentActivity(limit || 20);
        }
    };
    __setFunctionName(_classThis, "AdminController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _listUsers_decorators = [(0, common_1.Get)('users')];
        _getUserById_decorators = [(0, common_1.Get)('users/:id')];
        _updateUser_decorators = [(0, common_1.Patch)('users/:id')];
        _updateUserStatus_decorators = [(0, common_1.Patch)('users/:id/status')];
        _updateUserRole_decorators = [(0, common_1.Patch)('users/:id/role')];
        _deleteUser_decorators = [(0, common_1.Delete)('users/:id')];
        _listListings_decorators = [(0, common_1.Get)('listings')];
        _getListingById_decorators = [(0, common_1.Get)('listings/:id')];
        _moderateListing_decorators = [(0, common_1.Post)('listings/:id/moderate')];
        _verifyListing_decorators = [(0, common_1.Post)('listings/:id/verify')];
        _featureListing_decorators = [(0, common_1.Post)('listings/:id/feature')];
        _deleteListing_decorators = [(0, common_1.Delete)('listings/:id')];
        _getPlatformOverview_decorators = [(0, common_1.Get)('analytics/overview')];
        _getUserGrowthStats_decorators = [(0, common_1.Get)('analytics/users')];
        _getListingStats_decorators = [(0, common_1.Get)('analytics/listings')];
        _getCityStats_decorators = [(0, common_1.Get)('analytics/cities')];
        _getRecentActivity_decorators = [(0, common_1.Get)('analytics/activity')];
        __esDecorate(_classThis, null, _listUsers_decorators, { kind: "method", name: "listUsers", static: false, private: false, access: { has: obj => "listUsers" in obj, get: obj => obj.listUsers }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserById_decorators, { kind: "method", name: "getUserById", static: false, private: false, access: { has: obj => "getUserById" in obj, get: obj => obj.getUserById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUser_decorators, { kind: "method", name: "updateUser", static: false, private: false, access: { has: obj => "updateUser" in obj, get: obj => obj.updateUser }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUserStatus_decorators, { kind: "method", name: "updateUserStatus", static: false, private: false, access: { has: obj => "updateUserStatus" in obj, get: obj => obj.updateUserStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUserRole_decorators, { kind: "method", name: "updateUserRole", static: false, private: false, access: { has: obj => "updateUserRole" in obj, get: obj => obj.updateUserRole }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteUser_decorators, { kind: "method", name: "deleteUser", static: false, private: false, access: { has: obj => "deleteUser" in obj, get: obj => obj.deleteUser }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listListings_decorators, { kind: "method", name: "listListings", static: false, private: false, access: { has: obj => "listListings" in obj, get: obj => obj.listListings }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getListingById_decorators, { kind: "method", name: "getListingById", static: false, private: false, access: { has: obj => "getListingById" in obj, get: obj => obj.getListingById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _moderateListing_decorators, { kind: "method", name: "moderateListing", static: false, private: false, access: { has: obj => "moderateListing" in obj, get: obj => obj.moderateListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyListing_decorators, { kind: "method", name: "verifyListing", static: false, private: false, access: { has: obj => "verifyListing" in obj, get: obj => obj.verifyListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _featureListing_decorators, { kind: "method", name: "featureListing", static: false, private: false, access: { has: obj => "featureListing" in obj, get: obj => obj.featureListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteListing_decorators, { kind: "method", name: "deleteListing", static: false, private: false, access: { has: obj => "deleteListing" in obj, get: obj => obj.deleteListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPlatformOverview_decorators, { kind: "method", name: "getPlatformOverview", static: false, private: false, access: { has: obj => "getPlatformOverview" in obj, get: obj => obj.getPlatformOverview }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserGrowthStats_decorators, { kind: "method", name: "getUserGrowthStats", static: false, private: false, access: { has: obj => "getUserGrowthStats" in obj, get: obj => obj.getUserGrowthStats }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getListingStats_decorators, { kind: "method", name: "getListingStats", static: false, private: false, access: { has: obj => "getListingStats" in obj, get: obj => obj.getListingStats }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCityStats_decorators, { kind: "method", name: "getCityStats", static: false, private: false, access: { has: obj => "getCityStats" in obj, get: obj => obj.getCityStats }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRecentActivity_decorators, { kind: "method", name: "getRecentActivity", static: false, private: false, access: { has: obj => "getRecentActivity" in obj, get: obj => obj.getRecentActivity }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminController = _classThis;
})();
exports.AdminController = AdminController;
