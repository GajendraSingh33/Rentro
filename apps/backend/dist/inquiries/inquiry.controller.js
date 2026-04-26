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
exports.InquiryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let InquiryController = (() => {
    let _classDecorators = [(0, common_1.Controller)('inquiries'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createInquiry_decorators;
    let _getInquiries_decorators;
    let _getInquiry_decorators;
    let _updateStatus_decorators;
    let _respondToInquiry_decorators;
    let _getOwnerStats_decorators;
    let _revealContact_decorators;
    var InquiryController = _classThis = class {
        constructor(inquiryService) {
            this.inquiryService = (__runInitializers(this, _instanceExtraInitializers), inquiryService);
        }
        async createInquiry(createDto, req) {
            return await this.inquiryService.createInquiry(req.user.id, createDto);
        }
        async getInquiries(filterDto, req) {
            const userId = req.user.id;
            const role = req.user.role;
            if (role === 'OWNER') {
                return await this.inquiryService.getOwnerInquiries(userId, filterDto);
            }
            else {
                return await this.inquiryService.getSeekerInquiries(userId, filterDto);
            }
        }
        async getInquiry(id, req) {
            const inquiry = await this.inquiryService.getInquiryById(id);
            // Check access
            if (req.user.id !== inquiry.seeker_id && req.user.id !== inquiry.owner_id) {
                throw new common_1.ForbiddenException('Not authorized to view this inquiry');
            }
            // Mark as viewed if owner viewing
            if (req.user.id === inquiry.owner_id && inquiry.status === 'new') {
                await this.inquiryService.updateStatus(id, { status: 'viewed' });
            }
            return inquiry;
        }
        async updateStatus(id, updateDto, req) {
            const inquiry = await this.inquiryService.getInquiryById(id);
            if (inquiry.owner_id !== req.user.id) {
                throw new common_1.ForbiddenException('Not authorized');
            }
            return await this.inquiryService.updateStatus(id, updateDto);
        }
        async respondToInquiry(id, respondDto, req) {
            const inquiry = await this.inquiryService.getInquiryById(id);
            if (inquiry.owner_id !== req.user.id) {
                throw new common_1.ForbiddenException('Not authorized');
            }
            return await this.inquiryService.respondToInquiry(id, respondDto.response_message);
        }
        async getOwnerStats(req) {
            return await this.inquiryService.getOwnerInquiryStats(req.user.id);
        }
        async revealContact(id, req) {
            const inquiry = await this.inquiryService.getInquiryById(id);
            if (inquiry.owner_id !== req.user.id) {
                throw new common_1.ForbiddenException('Not authorized');
            }
            return await this.inquiryService.revealContact(id);
        }
    };
    __setFunctionName(_classThis, "InquiryController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createInquiry_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)('SEEKER')];
        _getInquiries_decorators = [(0, common_1.Get)()];
        _getInquiry_decorators = [(0, common_1.Get)(':id')];
        _updateStatus_decorators = [(0, common_1.Patch)(':id/status'), (0, roles_decorator_1.Roles)('OWNER')];
        _respondToInquiry_decorators = [(0, common_1.Post)(':id/respond'), (0, roles_decorator_1.Roles)('OWNER')];
        _getOwnerStats_decorators = [(0, common_1.Get)('stats/owner'), (0, roles_decorator_1.Roles)('OWNER')];
        _revealContact_decorators = [(0, common_1.Post)(':id/reveal-contact'), (0, roles_decorator_1.Roles)('OWNER')];
        __esDecorate(_classThis, null, _createInquiry_decorators, { kind: "method", name: "createInquiry", static: false, private: false, access: { has: obj => "createInquiry" in obj, get: obj => obj.createInquiry }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInquiries_decorators, { kind: "method", name: "getInquiries", static: false, private: false, access: { has: obj => "getInquiries" in obj, get: obj => obj.getInquiries }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInquiry_decorators, { kind: "method", name: "getInquiry", static: false, private: false, access: { has: obj => "getInquiry" in obj, get: obj => obj.getInquiry }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateStatus_decorators, { kind: "method", name: "updateStatus", static: false, private: false, access: { has: obj => "updateStatus" in obj, get: obj => obj.updateStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _respondToInquiry_decorators, { kind: "method", name: "respondToInquiry", static: false, private: false, access: { has: obj => "respondToInquiry" in obj, get: obj => obj.respondToInquiry }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOwnerStats_decorators, { kind: "method", name: "getOwnerStats", static: false, private: false, access: { has: obj => "getOwnerStats" in obj, get: obj => obj.getOwnerStats }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _revealContact_decorators, { kind: "method", name: "revealContact", static: false, private: false, access: { has: obj => "revealContact" in obj, get: obj => obj.revealContact }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InquiryController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InquiryController = _classThis;
})();
exports.InquiryController = InquiryController;
