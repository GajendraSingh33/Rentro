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
exports.SeekerDashboardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SeekerDashboardController = (() => {
    let _classDecorators = [(0, common_1.Controller)('seeker/dashboard'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getDashboardOverview_decorators;
    let _getInquiryHistory_decorators;
    let _getInquiryStats_decorators;
    let _getActivityTimeline_decorators;
    var SeekerDashboardController = _classThis = class {
        constructor(dashboardService) {
            this.dashboardService = (__runInitializers(this, _instanceExtraInitializers), dashboardService);
        }
        /**
         * Get dashboard overview
         * GET /seeker/dashboard/overview
         */
        async getDashboardOverview(userId) {
            return this.dashboardService.getDashboardOverview(userId);
        }
        /**
         * Get inquiry history
         * GET /seeker/dashboard/inquiries
         */
        async getInquiryHistory(userId, query) {
            return this.dashboardService.getInquiryHistory(userId, query);
        }
        /**
         * Get inquiry statistics
         * GET /seeker/dashboard/inquiry-stats
         */
        async getInquiryStats(userId) {
            return this.dashboardService.getInquiryStats(userId);
        }
        /**
         * Get activity timeline
         * GET /seeker/dashboard/activity
         */
        async getActivityTimeline(userId, limit) {
            const activities = await this.dashboardService.getActivityTimeline(userId, limit ? parseInt(limit) : 20);
            return { activities };
        }
    };
    __setFunctionName(_classThis, "SeekerDashboardController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getDashboardOverview_decorators = [(0, common_1.Get)('overview'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getInquiryHistory_decorators = [(0, common_1.Get)('inquiries'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getInquiryStats_decorators = [(0, common_1.Get)('inquiry-stats'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getActivityTimeline_decorators = [(0, common_1.Get)('activity'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        __esDecorate(_classThis, null, _getDashboardOverview_decorators, { kind: "method", name: "getDashboardOverview", static: false, private: false, access: { has: obj => "getDashboardOverview" in obj, get: obj => obj.getDashboardOverview }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInquiryHistory_decorators, { kind: "method", name: "getInquiryHistory", static: false, private: false, access: { has: obj => "getInquiryHistory" in obj, get: obj => obj.getInquiryHistory }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInquiryStats_decorators, { kind: "method", name: "getInquiryStats", static: false, private: false, access: { has: obj => "getInquiryStats" in obj, get: obj => obj.getInquiryStats }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getActivityTimeline_decorators, { kind: "method", name: "getActivityTimeline", static: false, private: false, access: { has: obj => "getActivityTimeline" in obj, get: obj => obj.getActivityTimeline }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SeekerDashboardController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SeekerDashboardController = _classThis;
})();
exports.SeekerDashboardController = SeekerDashboardController;
