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
exports.AutocompleteSuggestion = exports.AutocompleteResponseDto = exports.AutocompleteDto = exports.RentRangeFacet = exports.FacetItem = exports.SearchFacetsDto = exports.SearchListingResultDto = exports.SearchResponseDto = exports.SearchListingsDto = exports.SortBy = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const pg_listing_entity_1 = require("../../typeorm/entities/pg-listing.entity");
var SortBy;
(function (SortBy) {
    SortBy["RELEVANCE"] = "relevance";
    SortBy["RENT_LOW_TO_HIGH"] = "rent_asc";
    SortBy["RENT_HIGH_TO_LOW"] = "rent_desc";
    SortBy["RATING"] = "rating";
    SortBy["NEWEST"] = "newest";
    SortBy["POPULARITY"] = "popularity";
    SortBy["DISTANCE"] = "distance";
})(SortBy || (exports.SortBy = SortBy = {}));
let SearchListingsDto = (() => {
    var _a;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    let _city_decorators;
    let _city_initializers = [];
    let _city_extraInitializers = [];
    let _state_decorators;
    let _state_initializers = [];
    let _state_extraInitializers = [];
    let _pincode_decorators;
    let _pincode_initializers = [];
    let _pincode_extraInitializers = [];
    let _latitude_decorators;
    let _latitude_initializers = [];
    let _latitude_extraInitializers = [];
    let _longitude_decorators;
    let _longitude_initializers = [];
    let _longitude_extraInitializers = [];
    let _radius_km_decorators;
    let _radius_km_initializers = [];
    let _radius_km_extraInitializers = [];
    let _min_rent_decorators;
    let _min_rent_initializers = [];
    let _min_rent_extraInitializers = [];
    let _max_rent_decorators;
    let _max_rent_initializers = [];
    let _max_rent_extraInitializers = [];
    let _room_type_decorators;
    let _room_type_initializers = [];
    let _room_type_extraInitializers = [];
    let _sharing_capacity_decorators;
    let _sharing_capacity_initializers = [];
    let _sharing_capacity_extraInitializers = [];
    let _gender_preference_decorators;
    let _gender_preference_initializers = [];
    let _gender_preference_extraInitializers = [];
    let _food_type_decorators;
    let _food_type_initializers = [];
    let _food_type_extraInitializers = [];
    let _breakfast_included_decorators;
    let _breakfast_included_initializers = [];
    let _breakfast_included_extraInitializers = [];
    let _lunch_included_decorators;
    let _lunch_included_initializers = [];
    let _lunch_included_extraInitializers = [];
    let _dinner_included_decorators;
    let _dinner_included_initializers = [];
    let _dinner_included_extraInitializers = [];
    let _amenities_decorators;
    let _amenities_initializers = [];
    let _amenities_extraInitializers = [];
    let _wifi_included_decorators;
    let _wifi_included_initializers = [];
    let _wifi_included_extraInitializers = [];
    let _electricity_included_decorators;
    let _electricity_included_initializers = [];
    let _electricity_included_extraInitializers = [];
    let _water_included_decorators;
    let _water_included_initializers = [];
    let _water_included_extraInitializers = [];
    let _available_only_decorators;
    let _available_only_initializers = [];
    let _available_only_extraInitializers = [];
    let _available_from_decorators;
    let _available_from_initializers = [];
    let _available_from_extraInitializers = [];
    let _visitors_allowed_decorators;
    let _visitors_allowed_initializers = [];
    let _visitors_allowed_extraInitializers = [];
    let _smoking_allowed_decorators;
    let _smoking_allowed_initializers = [];
    let _smoking_allowed_extraInitializers = [];
    let _pets_allowed_decorators;
    let _pets_allowed_initializers = [];
    let _pets_allowed_extraInitializers = [];
    let _verified_only_decorators;
    let _verified_only_initializers = [];
    let _verified_only_extraInitializers = [];
    let _featured_only_decorators;
    let _featured_only_initializers = [];
    let _featured_only_extraInitializers = [];
    let _min_rating_decorators;
    let _min_rating_initializers = [];
    let _min_rating_extraInitializers = [];
    let _sort_by_decorators;
    let _sort_by_initializers = [];
    let _sort_by_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return _a = class SearchListingsDto {
            constructor() {
                // Location search
                this.query = __runInitializers(this, _query_initializers, void 0); // General search query (title, description, address)
                this.city = (__runInitializers(this, _query_extraInitializers), __runInitializers(this, _city_initializers, void 0));
                this.state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
                this.pincode = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _pincode_initializers, void 0));
                // Proximity search (requires latitude/longitude)
                this.latitude = (__runInitializers(this, _pincode_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
                this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
                this.radius_km = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _radius_km_initializers, void 0)); // Search radius in kilometers (default: 10km)
                // Price filters
                this.min_rent = (__runInitializers(this, _radius_km_extraInitializers), __runInitializers(this, _min_rent_initializers, void 0));
                this.max_rent = (__runInitializers(this, _min_rent_extraInitializers), __runInitializers(this, _max_rent_initializers, void 0));
                // Room type filter
                this.room_type = (__runInitializers(this, _max_rent_extraInitializers), __runInitializers(this, _room_type_initializers, void 0));
                this.sharing_capacity = (__runInitializers(this, _room_type_extraInitializers), __runInitializers(this, _sharing_capacity_initializers, void 0));
                // Gender preference
                this.gender_preference = (__runInitializers(this, _sharing_capacity_extraInitializers), __runInitializers(this, _gender_preference_initializers, void 0));
                // Food options
                this.food_type = (__runInitializers(this, _gender_preference_extraInitializers), __runInitializers(this, _food_type_initializers, void 0));
                this.breakfast_included = (__runInitializers(this, _food_type_extraInitializers), __runInitializers(this, _breakfast_included_initializers, void 0));
                this.lunch_included = (__runInitializers(this, _breakfast_included_extraInitializers), __runInitializers(this, _lunch_included_initializers, void 0));
                this.dinner_included = (__runInitializers(this, _lunch_included_extraInitializers), __runInitializers(this, _dinner_included_initializers, void 0));
                // Amenities filter (comma-separated or array)
                this.amenities = (__runInitializers(this, _dinner_included_extraInitializers), __runInitializers(this, _amenities_initializers, void 0));
                // Inclusion filters
                this.wifi_included = (__runInitializers(this, _amenities_extraInitializers), __runInitializers(this, _wifi_included_initializers, void 0));
                this.electricity_included = (__runInitializers(this, _wifi_included_extraInitializers), __runInitializers(this, _electricity_included_initializers, void 0));
                this.water_included = (__runInitializers(this, _electricity_included_extraInitializers), __runInitializers(this, _water_included_initializers, void 0));
                // Availability filters
                this.available_only = (__runInitializers(this, _water_included_extraInitializers), __runInitializers(this, _available_only_initializers, void 0)); // Only show listings with available rooms/beds
                this.available_from = (__runInitializers(this, _available_only_extraInitializers), __runInitializers(this, _available_from_initializers, void 0)); // Date string (YYYY-MM-DD)
                // Rules/preferences filters
                this.visitors_allowed = (__runInitializers(this, _available_from_extraInitializers), __runInitializers(this, _visitors_allowed_initializers, void 0));
                this.smoking_allowed = (__runInitializers(this, _visitors_allowed_extraInitializers), __runInitializers(this, _smoking_allowed_initializers, void 0));
                this.pets_allowed = (__runInitializers(this, _smoking_allowed_extraInitializers), __runInitializers(this, _pets_allowed_initializers, void 0));
                // Verified/featured filters
                this.verified_only = (__runInitializers(this, _pets_allowed_extraInitializers), __runInitializers(this, _verified_only_initializers, void 0));
                this.featured_only = (__runInitializers(this, _verified_only_extraInitializers), __runInitializers(this, _featured_only_initializers, void 0));
                // Rating filter
                this.min_rating = (__runInitializers(this, _featured_only_extraInitializers), __runInitializers(this, _min_rating_initializers, void 0));
                // Sorting
                this.sort_by = (__runInitializers(this, _min_rating_extraInitializers), __runInitializers(this, _sort_by_initializers, void 0));
                // Pagination
                this.page = (__runInitializers(this, _sort_by_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 20));
                __runInitializers(this, _limit_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _query_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _city_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _state_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _pincode_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _latitude_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
            _longitude_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
            _radius_km_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            _min_rent_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _max_rent_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
            _room_type_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(pg_listing_entity_1.RoomType)];
            _sharing_capacity_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(10)];
            _gender_preference_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(pg_listing_entity_1.GenderPreference)];
            _food_type_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(pg_listing_entity_1.FoodType)];
            _breakfast_included_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _lunch_included_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _dinner_included_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _amenities_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.split(',').map(s => s.trim()) : value), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _wifi_included_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _electricity_included_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _water_included_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _available_only_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _available_from_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _visitors_allowed_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _smoking_allowed_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _pets_allowed_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _verified_only_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _featured_only_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true), (0, class_validator_1.IsBoolean)()];
            _min_rating_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(5)];
            _sort_by_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(SortBy)];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: obj => "city" in obj, get: obj => obj.city, set: (obj, value) => { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
            __esDecorate(null, null, _pincode_decorators, { kind: "field", name: "pincode", static: false, private: false, access: { has: obj => "pincode" in obj, get: obj => obj.pincode, set: (obj, value) => { obj.pincode = value; } }, metadata: _metadata }, _pincode_initializers, _pincode_extraInitializers);
            __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: obj => "latitude" in obj, get: obj => obj.latitude, set: (obj, value) => { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
            __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: obj => "longitude" in obj, get: obj => obj.longitude, set: (obj, value) => { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
            __esDecorate(null, null, _radius_km_decorators, { kind: "field", name: "radius_km", static: false, private: false, access: { has: obj => "radius_km" in obj, get: obj => obj.radius_km, set: (obj, value) => { obj.radius_km = value; } }, metadata: _metadata }, _radius_km_initializers, _radius_km_extraInitializers);
            __esDecorate(null, null, _min_rent_decorators, { kind: "field", name: "min_rent", static: false, private: false, access: { has: obj => "min_rent" in obj, get: obj => obj.min_rent, set: (obj, value) => { obj.min_rent = value; } }, metadata: _metadata }, _min_rent_initializers, _min_rent_extraInitializers);
            __esDecorate(null, null, _max_rent_decorators, { kind: "field", name: "max_rent", static: false, private: false, access: { has: obj => "max_rent" in obj, get: obj => obj.max_rent, set: (obj, value) => { obj.max_rent = value; } }, metadata: _metadata }, _max_rent_initializers, _max_rent_extraInitializers);
            __esDecorate(null, null, _room_type_decorators, { kind: "field", name: "room_type", static: false, private: false, access: { has: obj => "room_type" in obj, get: obj => obj.room_type, set: (obj, value) => { obj.room_type = value; } }, metadata: _metadata }, _room_type_initializers, _room_type_extraInitializers);
            __esDecorate(null, null, _sharing_capacity_decorators, { kind: "field", name: "sharing_capacity", static: false, private: false, access: { has: obj => "sharing_capacity" in obj, get: obj => obj.sharing_capacity, set: (obj, value) => { obj.sharing_capacity = value; } }, metadata: _metadata }, _sharing_capacity_initializers, _sharing_capacity_extraInitializers);
            __esDecorate(null, null, _gender_preference_decorators, { kind: "field", name: "gender_preference", static: false, private: false, access: { has: obj => "gender_preference" in obj, get: obj => obj.gender_preference, set: (obj, value) => { obj.gender_preference = value; } }, metadata: _metadata }, _gender_preference_initializers, _gender_preference_extraInitializers);
            __esDecorate(null, null, _food_type_decorators, { kind: "field", name: "food_type", static: false, private: false, access: { has: obj => "food_type" in obj, get: obj => obj.food_type, set: (obj, value) => { obj.food_type = value; } }, metadata: _metadata }, _food_type_initializers, _food_type_extraInitializers);
            __esDecorate(null, null, _breakfast_included_decorators, { kind: "field", name: "breakfast_included", static: false, private: false, access: { has: obj => "breakfast_included" in obj, get: obj => obj.breakfast_included, set: (obj, value) => { obj.breakfast_included = value; } }, metadata: _metadata }, _breakfast_included_initializers, _breakfast_included_extraInitializers);
            __esDecorate(null, null, _lunch_included_decorators, { kind: "field", name: "lunch_included", static: false, private: false, access: { has: obj => "lunch_included" in obj, get: obj => obj.lunch_included, set: (obj, value) => { obj.lunch_included = value; } }, metadata: _metadata }, _lunch_included_initializers, _lunch_included_extraInitializers);
            __esDecorate(null, null, _dinner_included_decorators, { kind: "field", name: "dinner_included", static: false, private: false, access: { has: obj => "dinner_included" in obj, get: obj => obj.dinner_included, set: (obj, value) => { obj.dinner_included = value; } }, metadata: _metadata }, _dinner_included_initializers, _dinner_included_extraInitializers);
            __esDecorate(null, null, _amenities_decorators, { kind: "field", name: "amenities", static: false, private: false, access: { has: obj => "amenities" in obj, get: obj => obj.amenities, set: (obj, value) => { obj.amenities = value; } }, metadata: _metadata }, _amenities_initializers, _amenities_extraInitializers);
            __esDecorate(null, null, _wifi_included_decorators, { kind: "field", name: "wifi_included", static: false, private: false, access: { has: obj => "wifi_included" in obj, get: obj => obj.wifi_included, set: (obj, value) => { obj.wifi_included = value; } }, metadata: _metadata }, _wifi_included_initializers, _wifi_included_extraInitializers);
            __esDecorate(null, null, _electricity_included_decorators, { kind: "field", name: "electricity_included", static: false, private: false, access: { has: obj => "electricity_included" in obj, get: obj => obj.electricity_included, set: (obj, value) => { obj.electricity_included = value; } }, metadata: _metadata }, _electricity_included_initializers, _electricity_included_extraInitializers);
            __esDecorate(null, null, _water_included_decorators, { kind: "field", name: "water_included", static: false, private: false, access: { has: obj => "water_included" in obj, get: obj => obj.water_included, set: (obj, value) => { obj.water_included = value; } }, metadata: _metadata }, _water_included_initializers, _water_included_extraInitializers);
            __esDecorate(null, null, _available_only_decorators, { kind: "field", name: "available_only", static: false, private: false, access: { has: obj => "available_only" in obj, get: obj => obj.available_only, set: (obj, value) => { obj.available_only = value; } }, metadata: _metadata }, _available_only_initializers, _available_only_extraInitializers);
            __esDecorate(null, null, _available_from_decorators, { kind: "field", name: "available_from", static: false, private: false, access: { has: obj => "available_from" in obj, get: obj => obj.available_from, set: (obj, value) => { obj.available_from = value; } }, metadata: _metadata }, _available_from_initializers, _available_from_extraInitializers);
            __esDecorate(null, null, _visitors_allowed_decorators, { kind: "field", name: "visitors_allowed", static: false, private: false, access: { has: obj => "visitors_allowed" in obj, get: obj => obj.visitors_allowed, set: (obj, value) => { obj.visitors_allowed = value; } }, metadata: _metadata }, _visitors_allowed_initializers, _visitors_allowed_extraInitializers);
            __esDecorate(null, null, _smoking_allowed_decorators, { kind: "field", name: "smoking_allowed", static: false, private: false, access: { has: obj => "smoking_allowed" in obj, get: obj => obj.smoking_allowed, set: (obj, value) => { obj.smoking_allowed = value; } }, metadata: _metadata }, _smoking_allowed_initializers, _smoking_allowed_extraInitializers);
            __esDecorate(null, null, _pets_allowed_decorators, { kind: "field", name: "pets_allowed", static: false, private: false, access: { has: obj => "pets_allowed" in obj, get: obj => obj.pets_allowed, set: (obj, value) => { obj.pets_allowed = value; } }, metadata: _metadata }, _pets_allowed_initializers, _pets_allowed_extraInitializers);
            __esDecorate(null, null, _verified_only_decorators, { kind: "field", name: "verified_only", static: false, private: false, access: { has: obj => "verified_only" in obj, get: obj => obj.verified_only, set: (obj, value) => { obj.verified_only = value; } }, metadata: _metadata }, _verified_only_initializers, _verified_only_extraInitializers);
            __esDecorate(null, null, _featured_only_decorators, { kind: "field", name: "featured_only", static: false, private: false, access: { has: obj => "featured_only" in obj, get: obj => obj.featured_only, set: (obj, value) => { obj.featured_only = value; } }, metadata: _metadata }, _featured_only_initializers, _featured_only_extraInitializers);
            __esDecorate(null, null, _min_rating_decorators, { kind: "field", name: "min_rating", static: false, private: false, access: { has: obj => "min_rating" in obj, get: obj => obj.min_rating, set: (obj, value) => { obj.min_rating = value; } }, metadata: _metadata }, _min_rating_initializers, _min_rating_extraInitializers);
            __esDecorate(null, null, _sort_by_decorators, { kind: "field", name: "sort_by", static: false, private: false, access: { has: obj => "sort_by" in obj, get: obj => obj.sort_by, set: (obj, value) => { obj.sort_by = value; } }, metadata: _metadata }, _sort_by_initializers, _sort_by_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.SearchListingsDto = SearchListingsDto;
class SearchResponseDto {
}
exports.SearchResponseDto = SearchResponseDto;
class SearchListingResultDto {
}
exports.SearchListingResultDto = SearchListingResultDto;
class SearchFacetsDto {
}
exports.SearchFacetsDto = SearchFacetsDto;
class FacetItem {
}
exports.FacetItem = FacetItem;
class RentRangeFacet {
}
exports.RentRangeFacet = RentRangeFacet;
let AutocompleteDto = (() => {
    var _a;
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return _a = class AutocompleteDto {
            constructor() {
                this.query = __runInitializers(this, _query_initializers, void 0);
                this.limit = (__runInitializers(this, _query_extraInitializers), __runInitializers(this, _limit_initializers, 10));
                __runInitializers(this, _limit_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _query_decorators = [(0, class_validator_1.IsString)()];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(20)];
            __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.AutocompleteDto = AutocompleteDto;
class AutocompleteResponseDto {
}
exports.AutocompleteResponseDto = AutocompleteResponseDto;
class AutocompleteSuggestion {
}
exports.AutocompleteSuggestion = AutocompleteSuggestion;
