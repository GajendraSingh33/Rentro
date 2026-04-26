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
exports.ModerationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
class RejectDto {
}
class FlagDto {
}
let ModerationController = (() => {
    let _classDecorators = [(0, common_1.Controller)('admin/moderation'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('ADMIN')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getPendingListings_decorators;
    let _approveListing_decorators;
    let _rejectListing_decorators;
    let _flagListing_decorators;
    let _unflagListing_decorators;
    let _getStats_decorators;
    var ModerationController = _classThis = class {
        constructor(moderationService) {
            this.moderationService = (__runInitializers(this, _instanceExtraInitializers), moderationService);
        }
        async getPendingListings(page = 1, limit = 20) {
            return await this.moderationService.getPendingListings(page, limit);
        }
        async approveListing(id, req) {
            return await this.moderationService.approveListing(id, req.user.id);
        }
        async rejectListing(id, rejectDto, req) {
            return await this.moderationService.rejectListing(id, req.user.id, rejectDto.reason);
        }
        async flagListing(id, flagDto) {
            return await this.moderationService.flagListing(id, flagDto.reason);
        }
        async unflagListing(id) {
            return await this.moderationService.unflagListing(id);
        }
        async getStats() {
            return await this.moderationService.getModerationStats();
        }
    };
    __setFunctionName(_classThis, "ModerationController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getPendingListings_decorators = [(0, common_1.Get)('pending')];
        _approveListing_decorators = [(0, common_1.Post)('listings/:id/approve')];
        _rejectListing_decorators = [(0, common_1.Post)('listings/:id/reject')];
        _flagListing_decorators = [(0, common_1.Post)('listings/:id/flag')];
        _unflagListing_decorators = [(0, common_1.Post)('listings/:id/unflag')];
        _getStats_decorators = [(0, common_1.Get)('stats')];
        __esDecorate(_classThis, null, _getPendingListings_decorators, { kind: "method", name: "getPendingListings", static: false, private: false, access: { has: obj => "getPendingListings" in obj, get: obj => obj.getPendingListings }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approveListing_decorators, { kind: "method", name: "approveListing", static: false, private: false, access: { has: obj => "approveListing" in obj, get: obj => obj.approveListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _rejectListing_decorators, { kind: "method", name: "rejectListing", static: false, private: false, access: { has: obj => "rejectListing" in obj, get: obj => obj.rejectListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _flagListing_decorators, { kind: "method", name: "flagListing", static: false, private: false, access: { has: obj => "flagListing" in obj, get: obj => obj.flagListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unflagListing_decorators, { kind: "method", name: "unflagListing", static: false, private: false, access: { has: obj => "unflagListing" in obj, get: obj => obj.unflagListing }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: obj => "getStats" in obj, get: obj => obj.getStats }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ModerationController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ModerationController = _classThis;
})();
exports.ModerationController = ModerationController;
