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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PGListing = exports.FoodType = exports.GenderPreference = exports.RoomType = exports.ListingStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var ListingStatus;
(function (ListingStatus) {
    ListingStatus["DRAFT"] = "draft";
    ListingStatus["ACTIVE"] = "active";
    ListingStatus["INACTIVE"] = "inactive";
    ListingStatus["PENDING_APPROVAL"] = "pending_approval";
    ListingStatus["REJECTED"] = "rejected";
})(ListingStatus || (exports.ListingStatus = ListingStatus = {}));
var RoomType;
(function (RoomType) {
    RoomType["SINGLE"] = "single";
    RoomType["DOUBLE"] = "double";
    RoomType["TRIPLE"] = "triple";
    RoomType["DORMITORY"] = "dormitory";
})(RoomType || (exports.RoomType = RoomType = {}));
var GenderPreference;
(function (GenderPreference) {
    GenderPreference["MALE"] = "male";
    GenderPreference["FEMALE"] = "female";
    GenderPreference["ANY"] = "any";
})(GenderPreference || (exports.GenderPreference = GenderPreference = {}));
var FoodType;
(function (FoodType) {
    FoodType["VEG"] = "veg";
    FoodType["NON_VEG"] = "non_veg";
    FoodType["BOTH"] = "both";
    FoodType["NONE"] = "none";
})(FoodType || (exports.FoodType = FoodType = {}));
let PGListing = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('pg_listings'), (0, typeorm_1.Index)(['owner_id']), (0, typeorm_1.Index)(['status']), (0, typeorm_1.Index)(['city']), (0, typeorm_1.Index)(['monthly_rent']), (0, typeorm_1.Index)(['created_at']), (0, typeorm_1.Index)(['room_type']), (0, typeorm_1.Index)(['gender_preference'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _owner_id_decorators;
    let _owner_id_initializers = [];
    let _owner_id_extraInitializers = [];
    let _owner_decorators;
    let _owner_initializers = [];
    let _owner_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _address_decorators;
    let _address_initializers = [];
    let _address_extraInitializers = [];
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
    let _nearby_landmarks_decorators;
    let _nearby_landmarks_initializers = [];
    let _nearby_landmarks_extraInitializers = [];
    let _room_type_decorators;
    let _room_type_initializers = [];
    let _room_type_extraInitializers = [];
    let _sharing_capacity_decorators;
    let _sharing_capacity_initializers = [];
    let _sharing_capacity_extraInitializers = [];
    let _monthly_rent_decorators;
    let _monthly_rent_initializers = [];
    let _monthly_rent_extraInitializers = [];
    let _security_deposit_decorators;
    let _security_deposit_initializers = [];
    let _security_deposit_extraInitializers = [];
    let _electricity_included_decorators;
    let _electricity_included_initializers = [];
    let _electricity_included_extraInitializers = [];
    let _water_included_decorators;
    let _water_included_initializers = [];
    let _water_included_extraInitializers = [];
    let _wifi_included_decorators;
    let _wifi_included_initializers = [];
    let _wifi_included_extraInitializers = [];
    let _total_rooms_decorators;
    let _total_rooms_initializers = [];
    let _total_rooms_extraInitializers = [];
    let _available_rooms_decorators;
    let _available_rooms_initializers = [];
    let _available_rooms_extraInitializers = [];
    let _total_beds_decorators;
    let _total_beds_initializers = [];
    let _total_beds_extraInitializers = [];
    let _available_beds_decorators;
    let _available_beds_initializers = [];
    let _available_beds_extraInitializers = [];
    let _available_from_decorators;
    let _available_from_initializers = [];
    let _available_from_extraInitializers = [];
    let _gender_preference_decorators;
    let _gender_preference_initializers = [];
    let _gender_preference_extraInitializers = [];
    let _min_age_decorators;
    let _min_age_initializers = [];
    let _min_age_extraInitializers = [];
    let _max_age_decorators;
    let _max_age_initializers = [];
    let _max_age_extraInitializers = [];
    let _preferred_occupation_decorators;
    let _preferred_occupation_initializers = [];
    let _preferred_occupation_extraInitializers = [];
    let _amenities_decorators;
    let _amenities_initializers = [];
    let _amenities_extraInitializers = [];
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
    let _food_cost_per_month_decorators;
    let _food_cost_per_month_initializers = [];
    let _food_cost_per_month_extraInitializers = [];
    let _house_rules_decorators;
    let _house_rules_initializers = [];
    let _house_rules_extraInitializers = [];
    let _gate_closing_time_decorators;
    let _gate_closing_time_initializers = [];
    let _gate_closing_time_extraInitializers = [];
    let _visitors_allowed_decorators;
    let _visitors_allowed_initializers = [];
    let _visitors_allowed_extraInitializers = [];
    let _smoking_allowed_decorators;
    let _smoking_allowed_initializers = [];
    let _smoking_allowed_extraInitializers = [];
    let _drinking_allowed_decorators;
    let _drinking_allowed_initializers = [];
    let _drinking_allowed_extraInitializers = [];
    let _pets_allowed_decorators;
    let _pets_allowed_initializers = [];
    let _pets_allowed_extraInitializers = [];
    let _contact_phone_decorators;
    let _contact_phone_initializers = [];
    let _contact_phone_extraInitializers = [];
    let _contact_email_decorators;
    let _contact_email_initializers = [];
    let _contact_email_extraInitializers = [];
    let _preferred_contact_method_decorators;
    let _preferred_contact_method_initializers = [];
    let _preferred_contact_method_extraInitializers = [];
    let _contact_verified_decorators;
    let _contact_verified_initializers = [];
    let _contact_verified_extraInitializers = [];
    let _view_count_decorators;
    let _view_count_initializers = [];
    let _view_count_extraInitializers = [];
    let _inquiry_count_decorators;
    let _inquiry_count_initializers = [];
    let _inquiry_count_extraInitializers = [];
    let _booking_count_decorators;
    let _booking_count_initializers = [];
    let _booking_count_extraInitializers = [];
    let _average_rating_decorators;
    let _average_rating_initializers = [];
    let _average_rating_extraInitializers = [];
    let _review_count_decorators;
    let _review_count_initializers = [];
    let _review_count_extraInitializers = [];
    let _approved_by_decorators;
    let _approved_by_initializers = [];
    let _approved_by_extraInitializers = [];
    let _approved_at_decorators;
    let _approved_at_initializers = [];
    let _approved_at_extraInitializers = [];
    let _rejection_reason_decorators;
    let _rejection_reason_initializers = [];
    let _rejection_reason_extraInitializers = [];
    let _is_featured_decorators;
    let _is_featured_initializers = [];
    let _is_featured_extraInitializers = [];
    let _is_verified_decorators;
    let _is_verified_initializers = [];
    let _is_verified_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    let _deleted_at_decorators;
    let _deleted_at_initializers = [];
    let _deleted_at_extraInitializers = [];
    var PGListing = _classThis = class {
        // Virtual properties
        get is_available() {
            return this.available_beds > 0 || this.available_rooms > 0;
        }
        get occupancy_rate() {
            if (this.total_beds === 0)
                return 0;
            return ((this.total_beds - this.available_beds) / this.total_beds) * 100;
        }
        // Safely parse JSON fields
        get amenitiesList() {
            try {
                return this.amenities ? JSON.parse(this.amenities) : [];
            }
            catch {
                return [];
            }
        }
        set amenitiesList(value) {
            this.amenities = JSON.stringify(value);
        }
        get landmarksList() {
            try {
                return this.nearby_landmarks ? JSON.parse(this.nearby_landmarks) : [];
            }
            catch {
                return [];
            }
        }
        set landmarksList(value) {
            this.nearby_landmarks = JSON.stringify(value);
        }
        // Remove sensitive data from serialization
        toJSON() {
            const { contact_phone, contact_email, ...rest } = this;
            return {
                ...rest,
                // Only return masked contact info
                contact_phone: contact_phone ? `${contact_phone.slice(0, 2)}****${contact_phone.slice(-2)}` : null,
                contact_email: contact_email ? `${contact_email.split('@')[0].slice(0, 2)}****@${contact_email.split('@')[1]}` : null,
            };
        }
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.owner_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _owner_id_initializers, void 0));
            this.owner = (__runInitializers(this, _owner_id_extraInitializers), __runInitializers(this, _owner_initializers, void 0));
            // Basic Information
            this.title = (__runInitializers(this, _owner_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            // Location Details
            this.address = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.city = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            this.state = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _state_initializers, void 0));
            this.pincode = (__runInitializers(this, _state_extraInitializers), __runInitializers(this, _pincode_initializers, void 0));
            this.latitude = (__runInitializers(this, _pincode_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
            this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
            this.nearby_landmarks = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _nearby_landmarks_initializers, void 0)); // JSON string array
            // Room & Pricing Details
            this.room_type = (__runInitializers(this, _nearby_landmarks_extraInitializers), __runInitializers(this, _room_type_initializers, void 0));
            this.sharing_capacity = (__runInitializers(this, _room_type_extraInitializers), __runInitializers(this, _sharing_capacity_initializers, void 0)); // Number of people per room
            this.monthly_rent = (__runInitializers(this, _sharing_capacity_extraInitializers), __runInitializers(this, _monthly_rent_initializers, void 0));
            this.security_deposit = (__runInitializers(this, _monthly_rent_extraInitializers), __runInitializers(this, _security_deposit_initializers, void 0));
            this.electricity_included = (__runInitializers(this, _security_deposit_extraInitializers), __runInitializers(this, _electricity_included_initializers, void 0));
            this.water_included = (__runInitializers(this, _electricity_included_extraInitializers), __runInitializers(this, _water_included_initializers, void 0));
            this.wifi_included = (__runInitializers(this, _water_included_extraInitializers), __runInitializers(this, _wifi_included_initializers, void 0));
            // Availability
            this.total_rooms = (__runInitializers(this, _wifi_included_extraInitializers), __runInitializers(this, _total_rooms_initializers, void 0));
            this.available_rooms = (__runInitializers(this, _total_rooms_extraInitializers), __runInitializers(this, _available_rooms_initializers, void 0));
            this.total_beds = (__runInitializers(this, _available_rooms_extraInitializers), __runInitializers(this, _total_beds_initializers, void 0));
            this.available_beds = (__runInitializers(this, _total_beds_extraInitializers), __runInitializers(this, _available_beds_initializers, void 0));
            this.available_from = (__runInitializers(this, _available_beds_extraInitializers), __runInitializers(this, _available_from_initializers, void 0));
            // Preferences
            this.gender_preference = (__runInitializers(this, _available_from_extraInitializers), __runInitializers(this, _gender_preference_initializers, void 0));
            this.min_age = (__runInitializers(this, _gender_preference_extraInitializers), __runInitializers(this, _min_age_initializers, void 0));
            this.max_age = (__runInitializers(this, _min_age_extraInitializers), __runInitializers(this, _max_age_initializers, void 0));
            this.preferred_occupation = (__runInitializers(this, _max_age_extraInitializers), __runInitializers(this, _preferred_occupation_initializers, void 0)); // student, working professional, any
            // Amenities (stored as JSON array of strings)
            this.amenities = (__runInitializers(this, _preferred_occupation_extraInitializers), __runInitializers(this, _amenities_initializers, void 0)); // JSON: ["wifi", "parking", "laundry", "gym", etc.]
            // Food Details
            this.food_type = (__runInitializers(this, _amenities_extraInitializers), __runInitializers(this, _food_type_initializers, void 0));
            this.breakfast_included = (__runInitializers(this, _food_type_extraInitializers), __runInitializers(this, _breakfast_included_initializers, void 0));
            this.lunch_included = (__runInitializers(this, _breakfast_included_extraInitializers), __runInitializers(this, _lunch_included_initializers, void 0));
            this.dinner_included = (__runInitializers(this, _lunch_included_extraInitializers), __runInitializers(this, _dinner_included_initializers, void 0));
            this.food_cost_per_month = (__runInitializers(this, _dinner_included_extraInitializers), __runInitializers(this, _food_cost_per_month_initializers, void 0));
            // Rules & Regulations
            this.house_rules = (__runInitializers(this, _food_cost_per_month_extraInitializers), __runInitializers(this, _house_rules_initializers, void 0));
            this.gate_closing_time = (__runInitializers(this, _house_rules_extraInitializers), __runInitializers(this, _gate_closing_time_initializers, void 0));
            this.visitors_allowed = (__runInitializers(this, _gate_closing_time_extraInitializers), __runInitializers(this, _visitors_allowed_initializers, void 0));
            this.smoking_allowed = (__runInitializers(this, _visitors_allowed_extraInitializers), __runInitializers(this, _smoking_allowed_initializers, void 0));
            this.drinking_allowed = (__runInitializers(this, _smoking_allowed_extraInitializers), __runInitializers(this, _drinking_allowed_initializers, void 0));
            this.pets_allowed = (__runInitializers(this, _drinking_allowed_extraInitializers), __runInitializers(this, _pets_allowed_initializers, void 0));
            // Contact Information (masked until inquiry)
            this.contact_phone = (__runInitializers(this, _pets_allowed_extraInitializers), __runInitializers(this, _contact_phone_initializers, void 0));
            this.contact_email = (__runInitializers(this, _contact_phone_extraInitializers), __runInitializers(this, _contact_email_initializers, void 0));
            this.preferred_contact_method = (__runInitializers(this, _contact_email_extraInitializers), __runInitializers(this, _preferred_contact_method_initializers, void 0)); // phone, email, whatsapp
            this.contact_verified = (__runInitializers(this, _preferred_contact_method_extraInitializers), __runInitializers(this, _contact_verified_initializers, void 0));
            // Analytics & Metrics
            this.view_count = (__runInitializers(this, _contact_verified_extraInitializers), __runInitializers(this, _view_count_initializers, void 0));
            this.inquiry_count = (__runInitializers(this, _view_count_extraInitializers), __runInitializers(this, _inquiry_count_initializers, void 0));
            this.booking_count = (__runInitializers(this, _inquiry_count_extraInitializers), __runInitializers(this, _booking_count_initializers, void 0));
            this.average_rating = (__runInitializers(this, _booking_count_extraInitializers), __runInitializers(this, _average_rating_initializers, void 0));
            this.review_count = (__runInitializers(this, _average_rating_extraInitializers), __runInitializers(this, _review_count_initializers, void 0));
            // Moderation
            this.approved_by = (__runInitializers(this, _review_count_extraInitializers), __runInitializers(this, _approved_by_initializers, void 0)); // Admin/Moderator user ID
            this.approved_at = (__runInitializers(this, _approved_by_extraInitializers), __runInitializers(this, _approved_at_initializers, void 0));
            this.rejection_reason = (__runInitializers(this, _approved_at_extraInitializers), __runInitializers(this, _rejection_reason_initializers, void 0));
            this.is_featured = (__runInitializers(this, _rejection_reason_extraInitializers), __runInitializers(this, _is_featured_initializers, void 0));
            this.is_verified = (__runInitializers(this, _is_featured_extraInitializers), __runInitializers(this, _is_verified_initializers, void 0));
            // Timestamps
            this.created_at = (__runInitializers(this, _is_verified_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            this.deleted_at = (__runInitializers(this, _updated_at_extraInitializers), __runInitializers(this, _deleted_at_initializers, void 0));
            __runInitializers(this, _deleted_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "PGListing");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('increment')];
        _owner_id_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _owner_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'owner_id' })];
        _title_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: false })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: ListingStatus,
                default: ListingStatus.DRAFT,
            })];
        _address_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: false })];
        _city_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false })];
        _state_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false })];
        _pincode_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false })];
        _latitude_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _longitude_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true })];
        _nearby_landmarks_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _room_type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: RoomType,
                nullable: false,
            })];
        _sharing_capacity_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _monthly_rent_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false })];
        _security_deposit_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
        _electricity_included_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _water_included_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _wifi_included_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _total_rooms_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _available_rooms_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _total_beds_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _available_beds_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _available_from_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _gender_preference_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: GenderPreference,
                default: GenderPreference.ANY,
            })];
        _min_age_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _max_age_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _preferred_occupation_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true })];
        _amenities_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _food_type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: FoodType,
                nullable: false,
                default: FoodType.NONE,
            })];
        _breakfast_included_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _lunch_included_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _dinner_included_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _food_cost_per_month_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
        _house_rules_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _gate_closing_time_decorators = [(0, typeorm_1.Column)({ type: 'time', nullable: true })];
        _visitors_allowed_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _smoking_allowed_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _drinking_allowed_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _pets_allowed_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _contact_phone_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true })];
        _contact_email_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
        _preferred_contact_method_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })];
        _contact_verified_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _view_count_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _inquiry_count_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _booking_count_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _average_rating_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, nullable: true })];
        _review_count_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _approved_by_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _approved_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _rejection_reason_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _is_featured_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _is_verified_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deleted_at_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _owner_id_decorators, { kind: "field", name: "owner_id", static: false, private: false, access: { has: obj => "owner_id" in obj, get: obj => obj.owner_id, set: (obj, value) => { obj.owner_id = value; } }, metadata: _metadata }, _owner_id_initializers, _owner_id_extraInitializers);
        __esDecorate(null, null, _owner_decorators, { kind: "field", name: "owner", static: false, private: false, access: { has: obj => "owner" in obj, get: obj => obj.owner, set: (obj, value) => { obj.owner = value; } }, metadata: _metadata }, _owner_initializers, _owner_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: obj => "city" in obj, get: obj => obj.city, set: (obj, value) => { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: obj => "state" in obj, get: obj => obj.state, set: (obj, value) => { obj.state = value; } }, metadata: _metadata }, _state_initializers, _state_extraInitializers);
        __esDecorate(null, null, _pincode_decorators, { kind: "field", name: "pincode", static: false, private: false, access: { has: obj => "pincode" in obj, get: obj => obj.pincode, set: (obj, value) => { obj.pincode = value; } }, metadata: _metadata }, _pincode_initializers, _pincode_extraInitializers);
        __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: obj => "latitude" in obj, get: obj => obj.latitude, set: (obj, value) => { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
        __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: obj => "longitude" in obj, get: obj => obj.longitude, set: (obj, value) => { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
        __esDecorate(null, null, _nearby_landmarks_decorators, { kind: "field", name: "nearby_landmarks", static: false, private: false, access: { has: obj => "nearby_landmarks" in obj, get: obj => obj.nearby_landmarks, set: (obj, value) => { obj.nearby_landmarks = value; } }, metadata: _metadata }, _nearby_landmarks_initializers, _nearby_landmarks_extraInitializers);
        __esDecorate(null, null, _room_type_decorators, { kind: "field", name: "room_type", static: false, private: false, access: { has: obj => "room_type" in obj, get: obj => obj.room_type, set: (obj, value) => { obj.room_type = value; } }, metadata: _metadata }, _room_type_initializers, _room_type_extraInitializers);
        __esDecorate(null, null, _sharing_capacity_decorators, { kind: "field", name: "sharing_capacity", static: false, private: false, access: { has: obj => "sharing_capacity" in obj, get: obj => obj.sharing_capacity, set: (obj, value) => { obj.sharing_capacity = value; } }, metadata: _metadata }, _sharing_capacity_initializers, _sharing_capacity_extraInitializers);
        __esDecorate(null, null, _monthly_rent_decorators, { kind: "field", name: "monthly_rent", static: false, private: false, access: { has: obj => "monthly_rent" in obj, get: obj => obj.monthly_rent, set: (obj, value) => { obj.monthly_rent = value; } }, metadata: _metadata }, _monthly_rent_initializers, _monthly_rent_extraInitializers);
        __esDecorate(null, null, _security_deposit_decorators, { kind: "field", name: "security_deposit", static: false, private: false, access: { has: obj => "security_deposit" in obj, get: obj => obj.security_deposit, set: (obj, value) => { obj.security_deposit = value; } }, metadata: _metadata }, _security_deposit_initializers, _security_deposit_extraInitializers);
        __esDecorate(null, null, _electricity_included_decorators, { kind: "field", name: "electricity_included", static: false, private: false, access: { has: obj => "electricity_included" in obj, get: obj => obj.electricity_included, set: (obj, value) => { obj.electricity_included = value; } }, metadata: _metadata }, _electricity_included_initializers, _electricity_included_extraInitializers);
        __esDecorate(null, null, _water_included_decorators, { kind: "field", name: "water_included", static: false, private: false, access: { has: obj => "water_included" in obj, get: obj => obj.water_included, set: (obj, value) => { obj.water_included = value; } }, metadata: _metadata }, _water_included_initializers, _water_included_extraInitializers);
        __esDecorate(null, null, _wifi_included_decorators, { kind: "field", name: "wifi_included", static: false, private: false, access: { has: obj => "wifi_included" in obj, get: obj => obj.wifi_included, set: (obj, value) => { obj.wifi_included = value; } }, metadata: _metadata }, _wifi_included_initializers, _wifi_included_extraInitializers);
        __esDecorate(null, null, _total_rooms_decorators, { kind: "field", name: "total_rooms", static: false, private: false, access: { has: obj => "total_rooms" in obj, get: obj => obj.total_rooms, set: (obj, value) => { obj.total_rooms = value; } }, metadata: _metadata }, _total_rooms_initializers, _total_rooms_extraInitializers);
        __esDecorate(null, null, _available_rooms_decorators, { kind: "field", name: "available_rooms", static: false, private: false, access: { has: obj => "available_rooms" in obj, get: obj => obj.available_rooms, set: (obj, value) => { obj.available_rooms = value; } }, metadata: _metadata }, _available_rooms_initializers, _available_rooms_extraInitializers);
        __esDecorate(null, null, _total_beds_decorators, { kind: "field", name: "total_beds", static: false, private: false, access: { has: obj => "total_beds" in obj, get: obj => obj.total_beds, set: (obj, value) => { obj.total_beds = value; } }, metadata: _metadata }, _total_beds_initializers, _total_beds_extraInitializers);
        __esDecorate(null, null, _available_beds_decorators, { kind: "field", name: "available_beds", static: false, private: false, access: { has: obj => "available_beds" in obj, get: obj => obj.available_beds, set: (obj, value) => { obj.available_beds = value; } }, metadata: _metadata }, _available_beds_initializers, _available_beds_extraInitializers);
        __esDecorate(null, null, _available_from_decorators, { kind: "field", name: "available_from", static: false, private: false, access: { has: obj => "available_from" in obj, get: obj => obj.available_from, set: (obj, value) => { obj.available_from = value; } }, metadata: _metadata }, _available_from_initializers, _available_from_extraInitializers);
        __esDecorate(null, null, _gender_preference_decorators, { kind: "field", name: "gender_preference", static: false, private: false, access: { has: obj => "gender_preference" in obj, get: obj => obj.gender_preference, set: (obj, value) => { obj.gender_preference = value; } }, metadata: _metadata }, _gender_preference_initializers, _gender_preference_extraInitializers);
        __esDecorate(null, null, _min_age_decorators, { kind: "field", name: "min_age", static: false, private: false, access: { has: obj => "min_age" in obj, get: obj => obj.min_age, set: (obj, value) => { obj.min_age = value; } }, metadata: _metadata }, _min_age_initializers, _min_age_extraInitializers);
        __esDecorate(null, null, _max_age_decorators, { kind: "field", name: "max_age", static: false, private: false, access: { has: obj => "max_age" in obj, get: obj => obj.max_age, set: (obj, value) => { obj.max_age = value; } }, metadata: _metadata }, _max_age_initializers, _max_age_extraInitializers);
        __esDecorate(null, null, _preferred_occupation_decorators, { kind: "field", name: "preferred_occupation", static: false, private: false, access: { has: obj => "preferred_occupation" in obj, get: obj => obj.preferred_occupation, set: (obj, value) => { obj.preferred_occupation = value; } }, metadata: _metadata }, _preferred_occupation_initializers, _preferred_occupation_extraInitializers);
        __esDecorate(null, null, _amenities_decorators, { kind: "field", name: "amenities", static: false, private: false, access: { has: obj => "amenities" in obj, get: obj => obj.amenities, set: (obj, value) => { obj.amenities = value; } }, metadata: _metadata }, _amenities_initializers, _amenities_extraInitializers);
        __esDecorate(null, null, _food_type_decorators, { kind: "field", name: "food_type", static: false, private: false, access: { has: obj => "food_type" in obj, get: obj => obj.food_type, set: (obj, value) => { obj.food_type = value; } }, metadata: _metadata }, _food_type_initializers, _food_type_extraInitializers);
        __esDecorate(null, null, _breakfast_included_decorators, { kind: "field", name: "breakfast_included", static: false, private: false, access: { has: obj => "breakfast_included" in obj, get: obj => obj.breakfast_included, set: (obj, value) => { obj.breakfast_included = value; } }, metadata: _metadata }, _breakfast_included_initializers, _breakfast_included_extraInitializers);
        __esDecorate(null, null, _lunch_included_decorators, { kind: "field", name: "lunch_included", static: false, private: false, access: { has: obj => "lunch_included" in obj, get: obj => obj.lunch_included, set: (obj, value) => { obj.lunch_included = value; } }, metadata: _metadata }, _lunch_included_initializers, _lunch_included_extraInitializers);
        __esDecorate(null, null, _dinner_included_decorators, { kind: "field", name: "dinner_included", static: false, private: false, access: { has: obj => "dinner_included" in obj, get: obj => obj.dinner_included, set: (obj, value) => { obj.dinner_included = value; } }, metadata: _metadata }, _dinner_included_initializers, _dinner_included_extraInitializers);
        __esDecorate(null, null, _food_cost_per_month_decorators, { kind: "field", name: "food_cost_per_month", static: false, private: false, access: { has: obj => "food_cost_per_month" in obj, get: obj => obj.food_cost_per_month, set: (obj, value) => { obj.food_cost_per_month = value; } }, metadata: _metadata }, _food_cost_per_month_initializers, _food_cost_per_month_extraInitializers);
        __esDecorate(null, null, _house_rules_decorators, { kind: "field", name: "house_rules", static: false, private: false, access: { has: obj => "house_rules" in obj, get: obj => obj.house_rules, set: (obj, value) => { obj.house_rules = value; } }, metadata: _metadata }, _house_rules_initializers, _house_rules_extraInitializers);
        __esDecorate(null, null, _gate_closing_time_decorators, { kind: "field", name: "gate_closing_time", static: false, private: false, access: { has: obj => "gate_closing_time" in obj, get: obj => obj.gate_closing_time, set: (obj, value) => { obj.gate_closing_time = value; } }, metadata: _metadata }, _gate_closing_time_initializers, _gate_closing_time_extraInitializers);
        __esDecorate(null, null, _visitors_allowed_decorators, { kind: "field", name: "visitors_allowed", static: false, private: false, access: { has: obj => "visitors_allowed" in obj, get: obj => obj.visitors_allowed, set: (obj, value) => { obj.visitors_allowed = value; } }, metadata: _metadata }, _visitors_allowed_initializers, _visitors_allowed_extraInitializers);
        __esDecorate(null, null, _smoking_allowed_decorators, { kind: "field", name: "smoking_allowed", static: false, private: false, access: { has: obj => "smoking_allowed" in obj, get: obj => obj.smoking_allowed, set: (obj, value) => { obj.smoking_allowed = value; } }, metadata: _metadata }, _smoking_allowed_initializers, _smoking_allowed_extraInitializers);
        __esDecorate(null, null, _drinking_allowed_decorators, { kind: "field", name: "drinking_allowed", static: false, private: false, access: { has: obj => "drinking_allowed" in obj, get: obj => obj.drinking_allowed, set: (obj, value) => { obj.drinking_allowed = value; } }, metadata: _metadata }, _drinking_allowed_initializers, _drinking_allowed_extraInitializers);
        __esDecorate(null, null, _pets_allowed_decorators, { kind: "field", name: "pets_allowed", static: false, private: false, access: { has: obj => "pets_allowed" in obj, get: obj => obj.pets_allowed, set: (obj, value) => { obj.pets_allowed = value; } }, metadata: _metadata }, _pets_allowed_initializers, _pets_allowed_extraInitializers);
        __esDecorate(null, null, _contact_phone_decorators, { kind: "field", name: "contact_phone", static: false, private: false, access: { has: obj => "contact_phone" in obj, get: obj => obj.contact_phone, set: (obj, value) => { obj.contact_phone = value; } }, metadata: _metadata }, _contact_phone_initializers, _contact_phone_extraInitializers);
        __esDecorate(null, null, _contact_email_decorators, { kind: "field", name: "contact_email", static: false, private: false, access: { has: obj => "contact_email" in obj, get: obj => obj.contact_email, set: (obj, value) => { obj.contact_email = value; } }, metadata: _metadata }, _contact_email_initializers, _contact_email_extraInitializers);
        __esDecorate(null, null, _preferred_contact_method_decorators, { kind: "field", name: "preferred_contact_method", static: false, private: false, access: { has: obj => "preferred_contact_method" in obj, get: obj => obj.preferred_contact_method, set: (obj, value) => { obj.preferred_contact_method = value; } }, metadata: _metadata }, _preferred_contact_method_initializers, _preferred_contact_method_extraInitializers);
        __esDecorate(null, null, _contact_verified_decorators, { kind: "field", name: "contact_verified", static: false, private: false, access: { has: obj => "contact_verified" in obj, get: obj => obj.contact_verified, set: (obj, value) => { obj.contact_verified = value; } }, metadata: _metadata }, _contact_verified_initializers, _contact_verified_extraInitializers);
        __esDecorate(null, null, _view_count_decorators, { kind: "field", name: "view_count", static: false, private: false, access: { has: obj => "view_count" in obj, get: obj => obj.view_count, set: (obj, value) => { obj.view_count = value; } }, metadata: _metadata }, _view_count_initializers, _view_count_extraInitializers);
        __esDecorate(null, null, _inquiry_count_decorators, { kind: "field", name: "inquiry_count", static: false, private: false, access: { has: obj => "inquiry_count" in obj, get: obj => obj.inquiry_count, set: (obj, value) => { obj.inquiry_count = value; } }, metadata: _metadata }, _inquiry_count_initializers, _inquiry_count_extraInitializers);
        __esDecorate(null, null, _booking_count_decorators, { kind: "field", name: "booking_count", static: false, private: false, access: { has: obj => "booking_count" in obj, get: obj => obj.booking_count, set: (obj, value) => { obj.booking_count = value; } }, metadata: _metadata }, _booking_count_initializers, _booking_count_extraInitializers);
        __esDecorate(null, null, _average_rating_decorators, { kind: "field", name: "average_rating", static: false, private: false, access: { has: obj => "average_rating" in obj, get: obj => obj.average_rating, set: (obj, value) => { obj.average_rating = value; } }, metadata: _metadata }, _average_rating_initializers, _average_rating_extraInitializers);
        __esDecorate(null, null, _review_count_decorators, { kind: "field", name: "review_count", static: false, private: false, access: { has: obj => "review_count" in obj, get: obj => obj.review_count, set: (obj, value) => { obj.review_count = value; } }, metadata: _metadata }, _review_count_initializers, _review_count_extraInitializers);
        __esDecorate(null, null, _approved_by_decorators, { kind: "field", name: "approved_by", static: false, private: false, access: { has: obj => "approved_by" in obj, get: obj => obj.approved_by, set: (obj, value) => { obj.approved_by = value; } }, metadata: _metadata }, _approved_by_initializers, _approved_by_extraInitializers);
        __esDecorate(null, null, _approved_at_decorators, { kind: "field", name: "approved_at", static: false, private: false, access: { has: obj => "approved_at" in obj, get: obj => obj.approved_at, set: (obj, value) => { obj.approved_at = value; } }, metadata: _metadata }, _approved_at_initializers, _approved_at_extraInitializers);
        __esDecorate(null, null, _rejection_reason_decorators, { kind: "field", name: "rejection_reason", static: false, private: false, access: { has: obj => "rejection_reason" in obj, get: obj => obj.rejection_reason, set: (obj, value) => { obj.rejection_reason = value; } }, metadata: _metadata }, _rejection_reason_initializers, _rejection_reason_extraInitializers);
        __esDecorate(null, null, _is_featured_decorators, { kind: "field", name: "is_featured", static: false, private: false, access: { has: obj => "is_featured" in obj, get: obj => obj.is_featured, set: (obj, value) => { obj.is_featured = value; } }, metadata: _metadata }, _is_featured_initializers, _is_featured_extraInitializers);
        __esDecorate(null, null, _is_verified_decorators, { kind: "field", name: "is_verified", static: false, private: false, access: { has: obj => "is_verified" in obj, get: obj => obj.is_verified, set: (obj, value) => { obj.is_verified = value; } }, metadata: _metadata }, _is_verified_initializers, _is_verified_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, null, _deleted_at_decorators, { kind: "field", name: "deleted_at", static: false, private: false, access: { has: obj => "deleted_at" in obj, get: obj => obj.deleted_at, set: (obj, value) => { obj.deleted_at = value; } }, metadata: _metadata }, _deleted_at_initializers, _deleted_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PGListing = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PGListing = _classThis;
})();
exports.PGListing = PGListing;
