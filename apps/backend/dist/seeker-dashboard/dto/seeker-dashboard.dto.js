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
exports.SavedSearchDto = exports.SeekerPreferencesDto = exports.InquiryHistoryListDto = exports.InquiryHistoryDto = exports.RecommendedListingDto = exports.RecentInquiryDto = exports.RecentFavoriteDto = exports.SeekerDashboardOverviewDto = exports.DashboardQueryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let DashboardQueryDto = (() => {
    var _a;
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return _a = class DashboardQueryDto {
            constructor() {
                this.page = __runInitializers(this, _page_initializers, 1);
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 10));
                __runInitializers(this, _limit_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(50)];
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.DashboardQueryDto = DashboardQueryDto;
class SeekerDashboardOverviewDto {
}
exports.SeekerDashboardOverviewDto = SeekerDashboardOverviewDto;
class RecentFavoriteDto {
}
exports.RecentFavoriteDto = RecentFavoriteDto;
class RecentInquiryDto {
}
exports.RecentInquiryDto = RecentInquiryDto;
class RecommendedListingDto {
}
exports.RecommendedListingDto = RecommendedListingDto;
class InquiryHistoryDto {
}
exports.InquiryHistoryDto = InquiryHistoryDto;
class InquiryHistoryListDto {
}
exports.InquiryHistoryListDto = InquiryHistoryListDto;
let SeekerPreferencesDto = (() => {
    var _a;
    let _preferred_city_decorators;
    let _preferred_city_initializers = [];
    let _preferred_city_extraInitializers = [];
    let _min_budget_decorators;
    let _min_budget_initializers = [];
    let _min_budget_extraInitializers = [];
    let _max_budget_decorators;
    let _max_budget_initializers = [];
    let _max_budget_extraInitializers = [];
    let _preferred_room_type_decorators;
    let _preferred_room_type_initializers = [];
    let _preferred_room_type_extraInitializers = [];
    let _preferred_gender_decorators;
    let _preferred_gender_initializers = [];
    let _preferred_gender_extraInitializers = [];
    let _preferred_food_type_decorators;
    let _preferred_food_type_initializers = [];
    let _preferred_food_type_extraInitializers = [];
    let _amenities_decorators;
    let _amenities_initializers = [];
    let _amenities_extraInitializers = [];
    let _occupation_decorators;
    let _occupation_initializers = [];
    let _occupation_extraInitializers = [];
    return _a = class SeekerPreferencesDto {
            constructor() {
                this.preferred_city = __runInitializers(this, _preferred_city_initializers, void 0);
                this.min_budget = (__runInitializers(this, _preferred_city_extraInitializers), __runInitializers(this, _min_budget_initializers, void 0));
                this.max_budget = (__runInitializers(this, _min_budget_extraInitializers), __runInitializers(this, _max_budget_initializers, void 0));
                this.preferred_room_type = (__runInitializers(this, _max_budget_extraInitializers), __runInitializers(this, _preferred_room_type_initializers, void 0));
                this.preferred_gender = (__runInitializers(this, _preferred_room_type_extraInitializers), __runInitializers(this, _preferred_gender_initializers, void 0));
                this.preferred_food_type = (__runInitializers(this, _preferred_gender_extraInitializers), __runInitializers(this, _preferred_food_type_initializers, void 0));
                this.amenities = (__runInitializers(this, _preferred_food_type_extraInitializers), __runInitializers(this, _amenities_initializers, void 0));
                this.occupation = (__runInitializers(this, _amenities_extraInitializers), __runInitializers(this, _occupation_initializers, void 0));
                __runInitializers(this, _occupation_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _preferred_city_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _min_budget_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
            _max_budget_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
            _preferred_room_type_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _preferred_gender_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _preferred_food_type_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _amenities_decorators = [(0, class_validator_1.IsOptional)()];
            _occupation_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _preferred_city_decorators, { kind: "field", name: "preferred_city", static: false, private: false, access: { has: obj => "preferred_city" in obj, get: obj => obj.preferred_city, set: (obj, value) => { obj.preferred_city = value; } }, metadata: _metadata }, _preferred_city_initializers, _preferred_city_extraInitializers);
            __esDecorate(null, null, _min_budget_decorators, { kind: "field", name: "min_budget", static: false, private: false, access: { has: obj => "min_budget" in obj, get: obj => obj.min_budget, set: (obj, value) => { obj.min_budget = value; } }, metadata: _metadata }, _min_budget_initializers, _min_budget_extraInitializers);
            __esDecorate(null, null, _max_budget_decorators, { kind: "field", name: "max_budget", static: false, private: false, access: { has: obj => "max_budget" in obj, get: obj => obj.max_budget, set: (obj, value) => { obj.max_budget = value; } }, metadata: _metadata }, _max_budget_initializers, _max_budget_extraInitializers);
            __esDecorate(null, null, _preferred_room_type_decorators, { kind: "field", name: "preferred_room_type", static: false, private: false, access: { has: obj => "preferred_room_type" in obj, get: obj => obj.preferred_room_type, set: (obj, value) => { obj.preferred_room_type = value; } }, metadata: _metadata }, _preferred_room_type_initializers, _preferred_room_type_extraInitializers);
            __esDecorate(null, null, _preferred_gender_decorators, { kind: "field", name: "preferred_gender", static: false, private: false, access: { has: obj => "preferred_gender" in obj, get: obj => obj.preferred_gender, set: (obj, value) => { obj.preferred_gender = value; } }, metadata: _metadata }, _preferred_gender_initializers, _preferred_gender_extraInitializers);
            __esDecorate(null, null, _preferred_food_type_decorators, { kind: "field", name: "preferred_food_type", static: false, private: false, access: { has: obj => "preferred_food_type" in obj, get: obj => obj.preferred_food_type, set: (obj, value) => { obj.preferred_food_type = value; } }, metadata: _metadata }, _preferred_food_type_initializers, _preferred_food_type_extraInitializers);
            __esDecorate(null, null, _amenities_decorators, { kind: "field", name: "amenities", static: false, private: false, access: { has: obj => "amenities" in obj, get: obj => obj.amenities, set: (obj, value) => { obj.amenities = value; } }, metadata: _metadata }, _amenities_initializers, _amenities_extraInitializers);
            __esDecorate(null, null, _occupation_decorators, { kind: "field", name: "occupation", static: false, private: false, access: { has: obj => "occupation" in obj, get: obj => obj.occupation, set: (obj, value) => { obj.occupation = value; } }, metadata: _metadata }, _occupation_initializers, _occupation_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.SeekerPreferencesDto = SeekerPreferencesDto;
class SavedSearchDto {
}
exports.SavedSearchDto = SavedSearchDto;
