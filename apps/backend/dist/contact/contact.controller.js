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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
class UpdateContactDto {
}
let ContactController = (() => {
    let _classDecorators = [(0, common_1.Controller)('contact'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getListingContact_decorators;
    let _revealListingContact_decorators;
    let _updateListingContact_decorators;
    var ContactController = _classThis = class {
        constructor(contactService) {
            this.contactService = (__runInitializers(this, _instanceExtraInitializers), contactService);
        }
        async getListingContact(id, req) {
            // Only owners can see full contact info
            const revealed = req.user.role === 'OWNER';
            return await this.contactService.getListingContact(id, revealed);
        }
        async revealListingContact(id, req) {
            // Track contact reveal for analytics
            return await this.contactService.getListingContact(id, true);
        }
        async updateListingContact(id, updateDto) {
            return await this.contactService.updateListingContact(id, updateDto);
        }
    };
    __setFunctionName(_classThis, "ContactController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getListingContact_decorators = [(0, common_1.Get)('listing/:id')];
        _revealListingContact_decorators = [(0, common_1.Get)('listing/:id/reveal')];
        _updateListingContact_decorators = [(0, common_1.Put)('listing/:id'), (0, roles_decorator_1.Roles)('OWNER')];
        __esDecorate(_classThis, null, _getListingContact_decorators, { kind: "method", name: "getListingContact", static: false, private: false, access: { has: obj => "getListingContact" in obj, get: obj => obj.getListingContact }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _revealListingContact_decorators, { kind: "method", name: "revealListingContact", static: false, private: false, access: { has: obj => "revealListingContact" in obj, get: obj => obj.revealListingContact }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateListingContact_decorators, { kind: "method", name: "updateListingContact", static: false, private: false, access: { has: obj => "updateListingContact" in obj, get: obj => obj.updateListingContact }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactController = _classThis;
})();
exports.ContactController = ContactController;
