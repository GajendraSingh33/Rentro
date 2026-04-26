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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListingResponseDto = exports.AdminUserResponseDto = exports.CityStatsDto = exports.ListingStatsDto = exports.UserGrowthDto = exports.PlatformOverviewDto = exports.AnalyticsQueryDto = exports.FeatureListingDto = exports.VerifyListingDto = exports.ModerationActionDto = exports.ListListingsDto = exports.AdminUpdateUserDto = exports.UpdateUserRoleDto = exports.UpdateUserStatusDto = exports.ListUsersDto = exports.ListingStatus = exports.UserStatus = exports.UserRole = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var UserRole;
(function (UserRole) {
    UserRole["SEEKER"] = "SEEKER";
    UserRole["OWNER"] = "OWNER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
    UserStatus["SUSPENDED"] = "suspended";
    UserStatus["PENDING"] = "pending";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var ListingStatus;
(function (ListingStatus) {
    ListingStatus["PENDING"] = "pending";
    ListingStatus["APPROVED"] = "approved";
    ListingStatus["REJECTED"] = "rejected";
    ListingStatus["FLAGGED"] = "flagged";
    ListingStatus["SUSPENDED"] = "suspended";
})(ListingStatus || (exports.ListingStatus = ListingStatus = {}));
// User Management DTOs
let ListUsersDto = (() => {
    var _a;
    let _search_decorators;
    let _search_initializers = [];
    let _search_extraInitializers = [];
    let _role_decorators;
    let _role_initializers = [];
    let _role_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    let _sort_by_decorators;
    let _sort_by_initializers = [];
    let _sort_by_extraInitializers = [];
    let _sort_order_decorators;
    let _sort_order_initializers = [];
    let _sort_order_extraInitializers = [];
    return _a = class ListUsersDto {
            constructor() {
                this.search = __runInitializers(this, _search_initializers, void 0);
                this.role = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                this.status = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.page = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 20));
                this.sort_by = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _sort_by_initializers, 'created_at'));
                this.sort_order = (__runInitializers(this, _sort_by_extraInitializers), __runInitializers(this, _sort_order_initializers, 'DESC'));
                __runInitializers(this, _sort_order_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _search_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _role_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(UserRole)];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(UserStatus)];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            _sort_by_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _sort_order_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search, set: (obj, value) => { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: obj => "role" in obj, get: obj => obj.role, set: (obj, value) => { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _sort_by_decorators, { kind: "field", name: "sort_by", static: false, private: false, access: { has: obj => "sort_by" in obj, get: obj => obj.sort_by, set: (obj, value) => { obj.sort_by = value; } }, metadata: _metadata }, _sort_by_initializers, _sort_by_extraInitializers);
            __esDecorate(null, null, _sort_order_decorators, { kind: "field", name: "sort_order", static: false, private: false, access: { has: obj => "sort_order" in obj, get: obj => obj.sort_order, set: (obj, value) => { obj.sort_order = value; } }, metadata: _metadata }, _sort_order_initializers, _sort_order_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.ListUsersDto = ListUsersDto;
let UpdateUserStatusDto = (() => {
    var _a;
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _reason_decorators;
    let _reason_initializers = [];
    let _reason_extraInitializers = [];
    return _a = class UpdateUserStatusDto {
            constructor() {
                this.status = __runInitializers(this, _status_initializers, void 0);
                this.reason = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
                __runInitializers(this, _reason_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, class_validator_1.IsEnum)(UserStatus)];
            _reason_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: obj => "reason" in obj, get: obj => obj.reason, set: (obj, value) => { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UpdateUserStatusDto = UpdateUserStatusDto;
let UpdateUserRoleDto = (() => {
    var _a;
    let _role_decorators;
    let _role_initializers = [];
    let _role_extraInitializers = [];
    return _a = class UpdateUserRoleDto {
            constructor() {
                this.role = __runInitializers(this, _role_initializers, void 0);
                __runInitializers(this, _role_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _role_decorators = [(0, class_validator_1.IsEnum)(UserRole)];
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: obj => "role" in obj, get: obj => obj.role, set: (obj, value) => { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UpdateUserRoleDto = UpdateUserRoleDto;
let AdminUpdateUserDto = (() => {
    var _a;
    let _first_name_decorators;
    let _first_name_initializers = [];
    let _first_name_extraInitializers = [];
    let _last_name_decorators;
    let _last_name_initializers = [];
    let _last_name_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _phone_decorators;
    let _phone_initializers = [];
    let _phone_extraInitializers = [];
    let _email_verified_decorators;
    let _email_verified_initializers = [];
    let _email_verified_extraInitializers = [];
    let _phone_verified_decorators;
    let _phone_verified_initializers = [];
    let _phone_verified_extraInitializers = [];
    return _a = class AdminUpdateUserDto {
            constructor() {
                this.first_name = __runInitializers(this, _first_name_initializers, void 0);
                this.last_name = (__runInitializers(this, _first_name_extraInitializers), __runInitializers(this, _last_name_initializers, void 0));
                this.email = (__runInitializers(this, _last_name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.phone = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.email_verified = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _email_verified_initializers, void 0));
                this.phone_verified = (__runInitializers(this, _email_verified_extraInitializers), __runInitializers(this, _phone_verified_initializers, void 0));
                __runInitializers(this, _phone_verified_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _first_name_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _last_name_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _email_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)()];
            _phone_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _email_verified_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _phone_verified_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _first_name_decorators, { kind: "field", name: "first_name", static: false, private: false, access: { has: obj => "first_name" in obj, get: obj => obj.first_name, set: (obj, value) => { obj.first_name = value; } }, metadata: _metadata }, _first_name_initializers, _first_name_extraInitializers);
            __esDecorate(null, null, _last_name_decorators, { kind: "field", name: "last_name", static: false, private: false, access: { has: obj => "last_name" in obj, get: obj => obj.last_name, set: (obj, value) => { obj.last_name = value; } }, metadata: _metadata }, _last_name_initializers, _last_name_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: obj => "phone" in obj, get: obj => obj.phone, set: (obj, value) => { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _email_verified_decorators, { kind: "field", name: "email_verified", static: false, private: false, access: { has: obj => "email_verified" in obj, get: obj => obj.email_verified, set: (obj, value) => { obj.email_verified = value; } }, metadata: _metadata }, _email_verified_initializers, _email_verified_extraInitializers);
            __esDecorate(null, null, _phone_verified_decorators, { kind: "field", name: "phone_verified", static: false, private: false, access: { has: obj => "phone_verified" in obj, get: obj => obj.phone_verified, set: (obj, value) => { obj.phone_verified = value; } }, metadata: _metadata }, _phone_verified_initializers, _phone_verified_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.AdminUpdateUserDto = AdminUpdateUserDto;
// Listing Moderation DTOs
let ListListingsDto = (() => {
    var _a;
    let _search_decorators;
    let _search_initializers = [];
    let _search_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _city_decorators;
    let _city_initializers = [];
    let _city_extraInitializers = [];
    let _owner_id_decorators;
    let _owner_id_initializers = [];
    let _owner_id_extraInitializers = [];
    let _is_verified_decorators;
    let _is_verified_initializers = [];
    let _is_verified_extraInitializers = [];
    let _is_featured_decorators;
    let _is_featured_initializers = [];
    let _is_featured_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return _a = class ListListingsDto {
            constructor() {
                this.search = __runInitializers(this, _search_initializers, void 0);
                this.status = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.city = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.owner_id = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _owner_id_initializers, void 0));
                this.is_verified = (__runInitializers(this, _owner_id_extraInitializers), __runInitializers(this, _is_verified_initializers, void 0));
                this.is_featured = (__runInitializers(this, _is_verified_extraInitializers), __runInitializers(this, _is_featured_initializers, void 0));
                this.page = (__runInitializers(this, _is_featured_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 20));
                __runInitializers(this, _limit_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _search_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ListingStatus)];
            _city_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _owner_id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
            _is_verified_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _is_featured_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search, set: (obj, value) => { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: obj => "city" in obj, get: obj => obj.city, set: (obj, value) => { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _owner_id_decorators, { kind: "field", name: "owner_id", static: false, private: false, access: { has: obj => "owner_id" in obj, get: obj => obj.owner_id, set: (obj, value) => { obj.owner_id = value; } }, metadata: _metadata }, _owner_id_initializers, _owner_id_extraInitializers);
            __esDecorate(null, null, _is_verified_decorators, { kind: "field", name: "is_verified", static: false, private: false, access: { has: obj => "is_verified" in obj, get: obj => obj.is_verified, set: (obj, value) => { obj.is_verified = value; } }, metadata: _metadata }, _is_verified_initializers, _is_verified_extraInitializers);
            __esDecorate(null, null, _is_featured_decorators, { kind: "field", name: "is_featured", static: false, private: false, access: { has: obj => "is_featured" in obj, get: obj => obj.is_featured, set: (obj, value) => { obj.is_featured = value; } }, metadata: _metadata }, _is_featured_initializers, _is_featured_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.ListListingsDto = ListListingsDto;
let ModerationActionDto = (() => {
    var _a;
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _reason_decorators;
    let _reason_initializers = [];
    let _reason_extraInitializers = [];
    let _notify_owner_decorators;
    let _notify_owner_initializers = [];
    let _notify_owner_extraInitializers = [];
    return _a = class ModerationActionDto {
            constructor() {
                this.status = __runInitializers(this, _status_initializers, void 0);
                this.reason = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
                this.notify_owner = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _notify_owner_initializers, true));
                __runInitializers(this, _notify_owner_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, class_validator_1.IsEnum)(ListingStatus)];
            _reason_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _notify_owner_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: obj => "reason" in obj, get: obj => obj.reason, set: (obj, value) => { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            __esDecorate(null, null, _notify_owner_decorators, { kind: "field", name: "notify_owner", static: false, private: false, access: { has: obj => "notify_owner" in obj, get: obj => obj.notify_owner, set: (obj, value) => { obj.notify_owner = value; } }, metadata: _metadata }, _notify_owner_initializers, _notify_owner_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.ModerationActionDto = ModerationActionDto;
let VerifyListingDto = (() => {
    var _a;
    let _is_verified_decorators;
    let _is_verified_initializers = [];
    let _is_verified_extraInitializers = [];
    let _verification_notes_decorators;
    let _verification_notes_initializers = [];
    let _verification_notes_extraInitializers = [];
    return _a = class VerifyListingDto {
            constructor() {
                this.is_verified = __runInitializers(this, _is_verified_initializers, void 0);
                this.verification_notes = (__runInitializers(this, _is_verified_extraInitializers), __runInitializers(this, _verification_notes_initializers, void 0));
                __runInitializers(this, _verification_notes_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _is_verified_decorators = [(0, class_validator_1.IsBoolean)()];
            _verification_notes_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _is_verified_decorators, { kind: "field", name: "is_verified", static: false, private: false, access: { has: obj => "is_verified" in obj, get: obj => obj.is_verified, set: (obj, value) => { obj.is_verified = value; } }, metadata: _metadata }, _is_verified_initializers, _is_verified_extraInitializers);
            __esDecorate(null, null, _verification_notes_decorators, { kind: "field", name: "verification_notes", static: false, private: false, access: { has: obj => "verification_notes" in obj, get: obj => obj.verification_notes, set: (obj, value) => { obj.verification_notes = value; } }, metadata: _metadata }, _verification_notes_initializers, _verification_notes_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.VerifyListingDto = VerifyListingDto;
let FeatureListingDto = (() => {
    var _a;
    let _is_featured_decorators;
    let _is_featured_initializers = [];
    let _is_featured_extraInitializers = [];
    let _feature_until_decorators;
    let _feature_until_initializers = [];
    let _feature_until_extraInitializers = [];
    return _a = class FeatureListingDto {
            constructor() {
                this.is_featured = __runInitializers(this, _is_featured_initializers, void 0);
                this.feature_until = (__runInitializers(this, _is_featured_extraInitializers), __runInitializers(this, _feature_until_initializers, void 0)); // ISO date string
                __runInitializers(this, _feature_until_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _is_featured_decorators = [(0, class_validator_1.IsBoolean)()];
            _feature_until_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _is_featured_decorators, { kind: "field", name: "is_featured", static: false, private: false, access: { has: obj => "is_featured" in obj, get: obj => obj.is_featured, set: (obj, value) => { obj.is_featured = value; } }, metadata: _metadata }, _is_featured_initializers, _is_featured_extraInitializers);
            __esDecorate(null, null, _feature_until_decorators, { kind: "field", name: "feature_until", static: false, private: false, access: { has: obj => "feature_until" in obj, get: obj => obj.feature_until, set: (obj, value) => { obj.feature_until = value; } }, metadata: _metadata }, _feature_until_initializers, _feature_until_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.FeatureListingDto = FeatureListingDto;
// Analytics DTOs
let AnalyticsQueryDto = (() => {
    var _a;
    let _start_date_decorators;
    let _start_date_initializers = [];
    let _start_date_extraInitializers = [];
    let _end_date_decorators;
    let _end_date_initializers = [];
    let _end_date_extraInitializers = [];
    let _granularity_decorators;
    let _granularity_initializers = [];
    let _granularity_extraInitializers = [];
    return _a = class AnalyticsQueryDto {
            constructor() {
                this.start_date = __runInitializers(this, _start_date_initializers, void 0);
                this.end_date = (__runInitializers(this, _start_date_extraInitializers), __runInitializers(this, _end_date_initializers, void 0));
                this.granularity = (__runInitializers(this, _end_date_extraInitializers), __runInitializers(this, _granularity_initializers, 'day'));
                __runInitializers(this, _granularity_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _start_date_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _end_date_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _granularity_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _start_date_decorators, { kind: "field", name: "start_date", static: false, private: false, access: { has: obj => "start_date" in obj, get: obj => obj.start_date, set: (obj, value) => { obj.start_date = value; } }, metadata: _metadata }, _start_date_initializers, _start_date_extraInitializers);
            __esDecorate(null, null, _end_date_decorators, { kind: "field", name: "end_date", static: false, private: false, access: { has: obj => "end_date" in obj, get: obj => obj.end_date, set: (obj, value) => { obj.end_date = value; } }, metadata: _metadata }, _end_date_initializers, _end_date_extraInitializers);
            __esDecorate(null, null, _granularity_decorators, { kind: "field", name: "granularity", static: false, private: false, access: { has: obj => "granularity" in obj, get: obj => obj.granularity, set: (obj, value) => { obj.granularity = value; } }, metadata: _metadata }, _granularity_initializers, _granularity_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.AnalyticsQueryDto = AnalyticsQueryDto;
class PlatformOverviewDto {
}
exports.PlatformOverviewDto = PlatformOverviewDto;
class UserGrowthDto {
}
exports.UserGrowthDto = UserGrowthDto;
class ListingStatsDto {
}
exports.ListingStatsDto = ListingStatsDto;
class CityStatsDto {
}
exports.CityStatsDto = CityStatsDto;
// Response DTOs
class AdminUserResponseDto {
}
exports.AdminUserResponseDto = AdminUserResponseDto;
class AdminListingResponseDto {
}
exports.AdminListingResponseDto = AdminListingResponseDto;
