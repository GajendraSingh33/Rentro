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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let DashboardController = (() => {
    let _classDecorators = [(0, common_1.Controller)('owner/dashboard'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('OWNER')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getOverview_decorators;
    let _getTopListings_decorators;
    let _getViewsOverTime_decorators;
    let _getInquiriesOverTime_decorators;
    var DashboardController = _classThis = class {
        constructor(analyticsService) {
            this.analyticsService = (__runInitializers(this, _instanceExtraInitializers), analyticsService);
        }
        async getOverview(req) {
            return await this.analyticsService.getOwnerDashboardOverview(req.user.id);
        }
        async getTopListings(req) {
            return await this.analyticsService.getTopPerformingListings(req.user.id, 5);
        }
        async getViewsOverTime(req) {
            return await this.analyticsService.getViewsOverTime(req.user.id, 30);
        }
        async getInquiriesOverTime(req) {
            return await this.analyticsService.getInquiriesOverTime(req.user.id, 30);
        }
    };
    __setFunctionName(_classThis, "DashboardController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getOverview_decorators = [(0, common_1.Get)('overview')];
        _getTopListings_decorators = [(0, common_1.Get)('top-listings')];
        _getViewsOverTime_decorators = [(0, common_1.Get)('views-over-time')];
        _getInquiriesOverTime_decorators = [(0, common_1.Get)('inquiries-over-time')];
        __esDecorate(_classThis, null, _getOverview_decorators, { kind: "method", name: "getOverview", static: false, private: false, access: { has: obj => "getOverview" in obj, get: obj => obj.getOverview }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTopListings_decorators, { kind: "method", name: "getTopListings", static: false, private: false, access: { has: obj => "getTopListings" in obj, get: obj => obj.getTopListings }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getViewsOverTime_decorators, { kind: "method", name: "getViewsOverTime", static: false, private: false, access: { has: obj => "getViewsOverTime" in obj, get: obj => obj.getViewsOverTime }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInquiriesOverTime_decorators, { kind: "method", name: "getInquiriesOverTime", static: false, private: false, access: { has: obj => "getInquiriesOverTime" in obj, get: obj => obj.getInquiriesOverTime }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DashboardController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DashboardController = _classThis;
})();
exports.DashboardController = DashboardController;
