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
exports.RatingSummaryDto = exports.ReviewsListResponseDto = exports.ReviewResponseDto = exports.ReviewsQueryDto = exports.OwnerResponseDto = exports.UpdateReviewDto = exports.CreateReviewDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let CreateReviewDto = (() => {
    var _a;
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _rating_decorators;
    let _rating_initializers = [];
    let _rating_extraInitializers = [];
    let _cleanliness_rating_decorators;
    let _cleanliness_rating_initializers = [];
    let _cleanliness_rating_extraInitializers = [];
    let _amenities_rating_decorators;
    let _amenities_rating_initializers = [];
    let _amenities_rating_extraInitializers = [];
    let _location_rating_decorators;
    let _location_rating_initializers = [];
    let _location_rating_extraInitializers = [];
    let _value_for_money_rating_decorators;
    let _value_for_money_rating_initializers = [];
    let _value_for_money_rating_extraInitializers = [];
    let _owner_response_rating_decorators;
    let _owner_response_rating_initializers = [];
    let _owner_response_rating_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _pros_decorators;
    let _pros_initializers = [];
    let _pros_extraInitializers = [];
    let _cons_decorators;
    let _cons_initializers = [];
    let _cons_extraInitializers = [];
    let _stay_duration_months_decorators;
    let _stay_duration_months_initializers = [];
    let _stay_duration_months_extraInitializers = [];
    let _stayed_from_decorators;
    let _stayed_from_initializers = [];
    let _stayed_from_extraInitializers = [];
    let _stayed_until_decorators;
    let _stayed_until_initializers = [];
    let _stayed_until_extraInitializers = [];
    let _is_current_resident_decorators;
    let _is_current_resident_initializers = [];
    let _is_current_resident_extraInitializers = [];
    return _a = class CreateReviewDto {
            constructor() {
                this.listing_id = __runInitializers(this, _listing_id_initializers, void 0);
                this.rating = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _rating_initializers, void 0));
                this.cleanliness_rating = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _cleanliness_rating_initializers, void 0));
                this.amenities_rating = (__runInitializers(this, _cleanliness_rating_extraInitializers), __runInitializers(this, _amenities_rating_initializers, void 0));
                this.location_rating = (__runInitializers(this, _amenities_rating_extraInitializers), __runInitializers(this, _location_rating_initializers, void 0));
                this.value_for_money_rating = (__runInitializers(this, _location_rating_extraInitializers), __runInitializers(this, _value_for_money_rating_initializers, void 0));
                this.owner_response_rating = (__runInitializers(this, _value_for_money_rating_extraInitializers), __runInitializers(this, _owner_response_rating_initializers, void 0));
                this.title = (__runInitializers(this, _owner_response_rating_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.content = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.pros = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _pros_initializers, void 0));
                this.cons = (__runInitializers(this, _pros_extraInitializers), __runInitializers(this, _cons_initializers, void 0));
                this.stay_duration_months = (__runInitializers(this, _cons_extraInitializers), __runInitializers(this, _stay_duration_months_initializers, void 0));
                this.stayed_from = (__runInitializers(this, _stay_duration_months_extraInitializers), __runInitializers(this, _stayed_from_initializers, void 0));
                this.stayed_until = (__runInitializers(this, _stayed_from_extraInitializers), __runInitializers(this, _stayed_until_initializers, void 0));
                this.is_current_resident = (__runInitializers(this, _stayed_until_extraInitializers), __runInitializers(this, _is_current_resident_initializers, void 0));
                __runInitializers(this, _is_current_resident_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listing_id_decorators = [(0, class_validator_1.IsNumber)()];
            _rating_decorators = [(0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _cleanliness_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _amenities_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _location_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _value_for_money_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _owner_response_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _title_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(255)];
            _content_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(20), (0, class_validator_1.MaxLength)(2000)];
            _pros_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _cons_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _stay_duration_months_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _stayed_from_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _stayed_until_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _is_current_resident_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
            __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: obj => "rating" in obj, get: obj => obj.rating, set: (obj, value) => { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
            __esDecorate(null, null, _cleanliness_rating_decorators, { kind: "field", name: "cleanliness_rating", static: false, private: false, access: { has: obj => "cleanliness_rating" in obj, get: obj => obj.cleanliness_rating, set: (obj, value) => { obj.cleanliness_rating = value; } }, metadata: _metadata }, _cleanliness_rating_initializers, _cleanliness_rating_extraInitializers);
            __esDecorate(null, null, _amenities_rating_decorators, { kind: "field", name: "amenities_rating", static: false, private: false, access: { has: obj => "amenities_rating" in obj, get: obj => obj.amenities_rating, set: (obj, value) => { obj.amenities_rating = value; } }, metadata: _metadata }, _amenities_rating_initializers, _amenities_rating_extraInitializers);
            __esDecorate(null, null, _location_rating_decorators, { kind: "field", name: "location_rating", static: false, private: false, access: { has: obj => "location_rating" in obj, get: obj => obj.location_rating, set: (obj, value) => { obj.location_rating = value; } }, metadata: _metadata }, _location_rating_initializers, _location_rating_extraInitializers);
            __esDecorate(null, null, _value_for_money_rating_decorators, { kind: "field", name: "value_for_money_rating", static: false, private: false, access: { has: obj => "value_for_money_rating" in obj, get: obj => obj.value_for_money_rating, set: (obj, value) => { obj.value_for_money_rating = value; } }, metadata: _metadata }, _value_for_money_rating_initializers, _value_for_money_rating_extraInitializers);
            __esDecorate(null, null, _owner_response_rating_decorators, { kind: "field", name: "owner_response_rating", static: false, private: false, access: { has: obj => "owner_response_rating" in obj, get: obj => obj.owner_response_rating, set: (obj, value) => { obj.owner_response_rating = value; } }, metadata: _metadata }, _owner_response_rating_initializers, _owner_response_rating_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _pros_decorators, { kind: "field", name: "pros", static: false, private: false, access: { has: obj => "pros" in obj, get: obj => obj.pros, set: (obj, value) => { obj.pros = value; } }, metadata: _metadata }, _pros_initializers, _pros_extraInitializers);
            __esDecorate(null, null, _cons_decorators, { kind: "field", name: "cons", static: false, private: false, access: { has: obj => "cons" in obj, get: obj => obj.cons, set: (obj, value) => { obj.cons = value; } }, metadata: _metadata }, _cons_initializers, _cons_extraInitializers);
            __esDecorate(null, null, _stay_duration_months_decorators, { kind: "field", name: "stay_duration_months", static: false, private: false, access: { has: obj => "stay_duration_months" in obj, get: obj => obj.stay_duration_months, set: (obj, value) => { obj.stay_duration_months = value; } }, metadata: _metadata }, _stay_duration_months_initializers, _stay_duration_months_extraInitializers);
            __esDecorate(null, null, _stayed_from_decorators, { kind: "field", name: "stayed_from", static: false, private: false, access: { has: obj => "stayed_from" in obj, get: obj => obj.stayed_from, set: (obj, value) => { obj.stayed_from = value; } }, metadata: _metadata }, _stayed_from_initializers, _stayed_from_extraInitializers);
            __esDecorate(null, null, _stayed_until_decorators, { kind: "field", name: "stayed_until", static: false, private: false, access: { has: obj => "stayed_until" in obj, get: obj => obj.stayed_until, set: (obj, value) => { obj.stayed_until = value; } }, metadata: _metadata }, _stayed_until_initializers, _stayed_until_extraInitializers);
            __esDecorate(null, null, _is_current_resident_decorators, { kind: "field", name: "is_current_resident", static: false, private: false, access: { has: obj => "is_current_resident" in obj, get: obj => obj.is_current_resident, set: (obj, value) => { obj.is_current_resident = value; } }, metadata: _metadata }, _is_current_resident_initializers, _is_current_resident_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.CreateReviewDto = CreateReviewDto;
let UpdateReviewDto = (() => {
    var _a;
    let _rating_decorators;
    let _rating_initializers = [];
    let _rating_extraInitializers = [];
    let _cleanliness_rating_decorators;
    let _cleanliness_rating_initializers = [];
    let _cleanliness_rating_extraInitializers = [];
    let _amenities_rating_decorators;
    let _amenities_rating_initializers = [];
    let _amenities_rating_extraInitializers = [];
    let _location_rating_decorators;
    let _location_rating_initializers = [];
    let _location_rating_extraInitializers = [];
    let _value_for_money_rating_decorators;
    let _value_for_money_rating_initializers = [];
    let _value_for_money_rating_extraInitializers = [];
    let _owner_response_rating_decorators;
    let _owner_response_rating_initializers = [];
    let _owner_response_rating_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _pros_decorators;
    let _pros_initializers = [];
    let _pros_extraInitializers = [];
    let _cons_decorators;
    let _cons_initializers = [];
    let _cons_extraInitializers = [];
    return _a = class UpdateReviewDto {
            constructor() {
                this.rating = __runInitializers(this, _rating_initializers, void 0);
                this.cleanliness_rating = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _cleanliness_rating_initializers, void 0));
                this.amenities_rating = (__runInitializers(this, _cleanliness_rating_extraInitializers), __runInitializers(this, _amenities_rating_initializers, void 0));
                this.location_rating = (__runInitializers(this, _amenities_rating_extraInitializers), __runInitializers(this, _location_rating_initializers, void 0));
                this.value_for_money_rating = (__runInitializers(this, _location_rating_extraInitializers), __runInitializers(this, _value_for_money_rating_initializers, void 0));
                this.owner_response_rating = (__runInitializers(this, _value_for_money_rating_extraInitializers), __runInitializers(this, _owner_response_rating_initializers, void 0));
                this.title = (__runInitializers(this, _owner_response_rating_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.content = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.pros = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _pros_initializers, void 0));
                this.cons = (__runInitializers(this, _pros_extraInitializers), __runInitializers(this, _cons_initializers, void 0));
                __runInitializers(this, _cons_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _cleanliness_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _amenities_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _location_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _value_for_money_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _owner_response_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _title_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(255)];
            _content_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(20), (0, class_validator_1.MaxLength)(2000)];
            _pros_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _cons_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: obj => "rating" in obj, get: obj => obj.rating, set: (obj, value) => { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
            __esDecorate(null, null, _cleanliness_rating_decorators, { kind: "field", name: "cleanliness_rating", static: false, private: false, access: { has: obj => "cleanliness_rating" in obj, get: obj => obj.cleanliness_rating, set: (obj, value) => { obj.cleanliness_rating = value; } }, metadata: _metadata }, _cleanliness_rating_initializers, _cleanliness_rating_extraInitializers);
            __esDecorate(null, null, _amenities_rating_decorators, { kind: "field", name: "amenities_rating", static: false, private: false, access: { has: obj => "amenities_rating" in obj, get: obj => obj.amenities_rating, set: (obj, value) => { obj.amenities_rating = value; } }, metadata: _metadata }, _amenities_rating_initializers, _amenities_rating_extraInitializers);
            __esDecorate(null, null, _location_rating_decorators, { kind: "field", name: "location_rating", static: false, private: false, access: { has: obj => "location_rating" in obj, get: obj => obj.location_rating, set: (obj, value) => { obj.location_rating = value; } }, metadata: _metadata }, _location_rating_initializers, _location_rating_extraInitializers);
            __esDecorate(null, null, _value_for_money_rating_decorators, { kind: "field", name: "value_for_money_rating", static: false, private: false, access: { has: obj => "value_for_money_rating" in obj, get: obj => obj.value_for_money_rating, set: (obj, value) => { obj.value_for_money_rating = value; } }, metadata: _metadata }, _value_for_money_rating_initializers, _value_for_money_rating_extraInitializers);
            __esDecorate(null, null, _owner_response_rating_decorators, { kind: "field", name: "owner_response_rating", static: false, private: false, access: { has: obj => "owner_response_rating" in obj, get: obj => obj.owner_response_rating, set: (obj, value) => { obj.owner_response_rating = value; } }, metadata: _metadata }, _owner_response_rating_initializers, _owner_response_rating_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _pros_decorators, { kind: "field", name: "pros", static: false, private: false, access: { has: obj => "pros" in obj, get: obj => obj.pros, set: (obj, value) => { obj.pros = value; } }, metadata: _metadata }, _pros_initializers, _pros_extraInitializers);
            __esDecorate(null, null, _cons_decorators, { kind: "field", name: "cons", static: false, private: false, access: { has: obj => "cons" in obj, get: obj => obj.cons, set: (obj, value) => { obj.cons = value; } }, metadata: _metadata }, _cons_initializers, _cons_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UpdateReviewDto = UpdateReviewDto;
let OwnerResponseDto = (() => {
    var _a;
    let _response_decorators;
    let _response_initializers = [];
    let _response_extraInitializers = [];
    return _a = class OwnerResponseDto {
            constructor() {
                this.response = __runInitializers(this, _response_initializers, void 0);
                __runInitializers(this, _response_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _response_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(10), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _response_decorators, { kind: "field", name: "response", static: false, private: false, access: { has: obj => "response" in obj, get: obj => obj.response, set: (obj, value) => { obj.response = value; } }, metadata: _metadata }, _response_initializers, _response_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.OwnerResponseDto = OwnerResponseDto;
let ReviewsQueryDto = (() => {
    var _a;
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _min_rating_decorators;
    let _min_rating_initializers = [];
    let _min_rating_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _sort_by_decorators;
    let _sort_by_initializers = [];
    let _sort_by_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return _a = class ReviewsQueryDto {
            constructor() {
                this.listing_id = __runInitializers(this, _listing_id_initializers, void 0);
                this.min_rating = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _min_rating_initializers, void 0));
                this.status = (__runInitializers(this, _min_rating_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.sort_by = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _sort_by_initializers, void 0));
                this.page = (__runInitializers(this, _sort_by_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 10));
                __runInitializers(this, _limit_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listing_id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
            _min_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(5)];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _sort_by_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(50)];
            __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
            __esDecorate(null, null, _min_rating_decorators, { kind: "field", name: "min_rating", static: false, private: false, access: { has: obj => "min_rating" in obj, get: obj => obj.min_rating, set: (obj, value) => { obj.min_rating = value; } }, metadata: _metadata }, _min_rating_initializers, _min_rating_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _sort_by_decorators, { kind: "field", name: "sort_by", static: false, private: false, access: { has: obj => "sort_by" in obj, get: obj => obj.sort_by, set: (obj, value) => { obj.sort_by = value; } }, metadata: _metadata }, _sort_by_initializers, _sort_by_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.ReviewsQueryDto = ReviewsQueryDto;
class ReviewResponseDto {
}
exports.ReviewResponseDto = ReviewResponseDto;
class ReviewsListResponseDto {
}
exports.ReviewsListResponseDto = ReviewsListResponseDto;
class RatingSummaryDto {
}
exports.RatingSummaryDto = RatingSummaryDto;
