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
exports.AvailabilityController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
class UpdateAvailabilityDto {
}
class BulkUpdateDto {
}
class CreateRoomDto {
}
let AvailabilityController = (() => {
    let _classDecorators = [(0, common_1.Controller)('listings/:listingId/availability'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getAvailability_decorators;
    let _updateAvailability_decorators;
    let _bulkUpdateAvailability_decorators;
    let _createRoom_decorators;
    var AvailabilityController = _classThis = class {
        constructor(availabilityService) {
            this.availabilityService = (__runInitializers(this, _instanceExtraInitializers), availabilityService);
        }
        async getAvailability(listingId) {
            return await this.availabilityService.getAvailability(listingId);
        }
        async updateAvailability(listingId, roomNumber, updateDto) {
            return await this.availabilityService.updateAvailability(listingId, roomNumber, updateDto);
        }
        async bulkUpdateAvailability(listingId, bulkDto) {
            return await this.availabilityService.bulkUpdateAvailability(listingId, bulkDto.updates);
        }
        async createRoom(listingId, createDto) {
            return await this.availabilityService.createRoomAvailability(listingId, createDto.room_number, createDto.total_beds);
        }
    };
    __setFunctionName(_classThis, "AvailabilityController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAvailability_decorators = [(0, common_1.Get)()];
        _updateAvailability_decorators = [(0, common_1.Put)(':roomNumber'), (0, roles_decorator_1.Roles)('OWNER')];
        _bulkUpdateAvailability_decorators = [(0, common_1.Patch)('bulk'), (0, roles_decorator_1.Roles)('OWNER')];
        _createRoom_decorators = [(0, common_1.Put)('rooms'), (0, roles_decorator_1.Roles)('OWNER')];
        __esDecorate(_classThis, null, _getAvailability_decorators, { kind: "method", name: "getAvailability", static: false, private: false, access: { has: obj => "getAvailability" in obj, get: obj => obj.getAvailability }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateAvailability_decorators, { kind: "method", name: "updateAvailability", static: false, private: false, access: { has: obj => "updateAvailability" in obj, get: obj => obj.updateAvailability }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _bulkUpdateAvailability_decorators, { kind: "method", name: "bulkUpdateAvailability", static: false, private: false, access: { has: obj => "bulkUpdateAvailability" in obj, get: obj => obj.bulkUpdateAvailability }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createRoom_decorators, { kind: "method", name: "createRoom", static: false, private: false, access: { has: obj => "createRoom" in obj, get: obj => obj.createRoom }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AvailabilityController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AvailabilityController = _classThis;
})();
exports.AvailabilityController = AvailabilityController;
