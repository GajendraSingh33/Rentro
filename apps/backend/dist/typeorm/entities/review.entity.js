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
exports.Review = exports.ReviewStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const pg_listing_entity_1 = require("./pg-listing.entity");
var ReviewStatus;
(function (ReviewStatus) {
    ReviewStatus["PENDING"] = "pending";
    ReviewStatus["APPROVED"] = "approved";
    ReviewStatus["REJECTED"] = "rejected";
    ReviewStatus["FLAGGED"] = "flagged";
})(ReviewStatus || (exports.ReviewStatus = ReviewStatus = {}));
let Review = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('reviews'), (0, typeorm_1.Unique)(['user_id', 'listing_id']), (0, typeorm_1.Index)(['listing_id']), (0, typeorm_1.Index)(['user_id']), (0, typeorm_1.Index)(['rating']), (0, typeorm_1.Index)(['status']), (0, typeorm_1.Index)(['created_at'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _user_id_decorators;
    let _user_id_initializers = [];
    let _user_id_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _listing_decorators;
    let _listing_initializers = [];
    let _listing_extraInitializers = [];
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
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _is_verified_decorators;
    let _is_verified_initializers = [];
    let _is_verified_extraInitializers = [];
    let _moderated_by_decorators;
    let _moderated_by_initializers = [];
    let _moderated_by_extraInitializers = [];
    let _moderated_at_decorators;
    let _moderated_at_initializers = [];
    let _moderated_at_extraInitializers = [];
    let _moderation_notes_decorators;
    let _moderation_notes_initializers = [];
    let _moderation_notes_extraInitializers = [];
    let _helpful_count_decorators;
    let _helpful_count_initializers = [];
    let _helpful_count_extraInitializers = [];
    let _report_count_decorators;
    let _report_count_initializers = [];
    let _report_count_extraInitializers = [];
    let _owner_response_decorators;
    let _owner_response_initializers = [];
    let _owner_response_extraInitializers = [];
    let _owner_responded_at_decorators;
    let _owner_responded_at_initializers = [];
    let _owner_responded_at_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    let _deleted_at_decorators;
    let _deleted_at_initializers = [];
    let _deleted_at_extraInitializers = [];
    var Review = _classThis = class {
        // Virtual getters for JSON fields
        get prosList() {
            try {
                return this.pros ? JSON.parse(this.pros) : [];
            }
            catch {
                return [];
            }
        }
        set prosList(value) {
            this.pros = JSON.stringify(value);
        }
        get consList() {
            try {
                return this.cons ? JSON.parse(this.cons) : [];
            }
            catch {
                return [];
            }
        }
        set consList(value) {
            this.cons = JSON.stringify(value);
        }
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.user_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_id_initializers, void 0));
            this.listing_id = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
            this.user = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.listing = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _listing_initializers, void 0));
            // Overall rating (1-5)
            this.rating = (__runInitializers(this, _listing_extraInitializers), __runInitializers(this, _rating_initializers, void 0));
            // Individual ratings (optional breakdown)
            this.cleanliness_rating = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _cleanliness_rating_initializers, void 0));
            this.amenities_rating = (__runInitializers(this, _cleanliness_rating_extraInitializers), __runInitializers(this, _amenities_rating_initializers, void 0));
            this.location_rating = (__runInitializers(this, _amenities_rating_extraInitializers), __runInitializers(this, _location_rating_initializers, void 0));
            this.value_for_money_rating = (__runInitializers(this, _location_rating_extraInitializers), __runInitializers(this, _value_for_money_rating_initializers, void 0));
            this.owner_response_rating = (__runInitializers(this, _value_for_money_rating_extraInitializers), __runInitializers(this, _owner_response_rating_initializers, void 0));
            // Review content
            this.title = (__runInitializers(this, _owner_response_rating_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.content = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            // Pros and cons (stored as JSON arrays)
            this.pros = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _pros_initializers, void 0)); // JSON array of strings
            this.cons = (__runInitializers(this, _pros_extraInitializers), __runInitializers(this, _cons_initializers, void 0)); // JSON array of strings
            // Stay information
            this.stay_duration_months = (__runInitializers(this, _cons_extraInitializers), __runInitializers(this, _stay_duration_months_initializers, void 0));
            this.stayed_from = (__runInitializers(this, _stay_duration_months_extraInitializers), __runInitializers(this, _stayed_from_initializers, void 0));
            this.stayed_until = (__runInitializers(this, _stayed_from_extraInitializers), __runInitializers(this, _stayed_until_initializers, void 0));
            this.is_current_resident = (__runInitializers(this, _stayed_until_extraInitializers), __runInitializers(this, _is_current_resident_initializers, void 0));
            // Verification & status
            this.status = (__runInitializers(this, _is_current_resident_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.is_verified = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _is_verified_initializers, void 0)); // Verified stay through booking
            // Moderation
            this.moderated_by = (__runInitializers(this, _is_verified_extraInitializers), __runInitializers(this, _moderated_by_initializers, void 0));
            this.moderated_at = (__runInitializers(this, _moderated_by_extraInitializers), __runInitializers(this, _moderated_at_initializers, void 0));
            this.moderation_notes = (__runInitializers(this, _moderated_at_extraInitializers), __runInitializers(this, _moderation_notes_initializers, void 0));
            // Engagement
            this.helpful_count = (__runInitializers(this, _moderation_notes_extraInitializers), __runInitializers(this, _helpful_count_initializers, void 0));
            this.report_count = (__runInitializers(this, _helpful_count_extraInitializers), __runInitializers(this, _report_count_initializers, void 0));
            // Owner response
            this.owner_response = (__runInitializers(this, _report_count_extraInitializers), __runInitializers(this, _owner_response_initializers, void 0));
            this.owner_responded_at = (__runInitializers(this, _owner_response_extraInitializers), __runInitializers(this, _owner_responded_at_initializers, void 0));
            this.created_at = (__runInitializers(this, _owner_responded_at_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            this.deleted_at = (__runInitializers(this, _updated_at_extraInitializers), __runInitializers(this, _deleted_at_initializers, void 0));
            __runInitializers(this, _deleted_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Review");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('increment')];
        _user_id_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _listing_id_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'user_id' })];
        _listing_decorators = [(0, typeorm_1.ManyToOne)(() => pg_listing_entity_1.PGListing, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'listing_id' })];
        _rating_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 2, scale: 1, nullable: false })];
        _cleanliness_rating_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 2, scale: 1, nullable: true })];
        _amenities_rating_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 2, scale: 1, nullable: true })];
        _location_rating_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 2, scale: 1, nullable: true })];
        _value_for_money_rating_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 2, scale: 1, nullable: true })];
        _owner_response_rating_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 2, scale: 1, nullable: true })];
        _title_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
        _content_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: false })];
        _pros_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _cons_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _stay_duration_months_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _stayed_from_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _stayed_until_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _is_current_resident_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: ReviewStatus,
                default: ReviewStatus.PENDING,
            })];
        _is_verified_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _moderated_by_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _moderated_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _moderation_notes_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _helpful_count_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _report_count_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _owner_response_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _owner_responded_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deleted_at_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: obj => "user_id" in obj, get: obj => obj.user_id, set: (obj, value) => { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
        __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _listing_decorators, { kind: "field", name: "listing", static: false, private: false, access: { has: obj => "listing" in obj, get: obj => obj.listing, set: (obj, value) => { obj.listing = value; } }, metadata: _metadata }, _listing_initializers, _listing_extraInitializers);
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
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _is_verified_decorators, { kind: "field", name: "is_verified", static: false, private: false, access: { has: obj => "is_verified" in obj, get: obj => obj.is_verified, set: (obj, value) => { obj.is_verified = value; } }, metadata: _metadata }, _is_verified_initializers, _is_verified_extraInitializers);
        __esDecorate(null, null, _moderated_by_decorators, { kind: "field", name: "moderated_by", static: false, private: false, access: { has: obj => "moderated_by" in obj, get: obj => obj.moderated_by, set: (obj, value) => { obj.moderated_by = value; } }, metadata: _metadata }, _moderated_by_initializers, _moderated_by_extraInitializers);
        __esDecorate(null, null, _moderated_at_decorators, { kind: "field", name: "moderated_at", static: false, private: false, access: { has: obj => "moderated_at" in obj, get: obj => obj.moderated_at, set: (obj, value) => { obj.moderated_at = value; } }, metadata: _metadata }, _moderated_at_initializers, _moderated_at_extraInitializers);
        __esDecorate(null, null, _moderation_notes_decorators, { kind: "field", name: "moderation_notes", static: false, private: false, access: { has: obj => "moderation_notes" in obj, get: obj => obj.moderation_notes, set: (obj, value) => { obj.moderation_notes = value; } }, metadata: _metadata }, _moderation_notes_initializers, _moderation_notes_extraInitializers);
        __esDecorate(null, null, _helpful_count_decorators, { kind: "field", name: "helpful_count", static: false, private: false, access: { has: obj => "helpful_count" in obj, get: obj => obj.helpful_count, set: (obj, value) => { obj.helpful_count = value; } }, metadata: _metadata }, _helpful_count_initializers, _helpful_count_extraInitializers);
        __esDecorate(null, null, _report_count_decorators, { kind: "field", name: "report_count", static: false, private: false, access: { has: obj => "report_count" in obj, get: obj => obj.report_count, set: (obj, value) => { obj.report_count = value; } }, metadata: _metadata }, _report_count_initializers, _report_count_extraInitializers);
        __esDecorate(null, null, _owner_response_decorators, { kind: "field", name: "owner_response", static: false, private: false, access: { has: obj => "owner_response" in obj, get: obj => obj.owner_response, set: (obj, value) => { obj.owner_response = value; } }, metadata: _metadata }, _owner_response_initializers, _owner_response_extraInitializers);
        __esDecorate(null, null, _owner_responded_at_decorators, { kind: "field", name: "owner_responded_at", static: false, private: false, access: { has: obj => "owner_responded_at" in obj, get: obj => obj.owner_responded_at, set: (obj, value) => { obj.owner_responded_at = value; } }, metadata: _metadata }, _owner_responded_at_initializers, _owner_responded_at_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, null, _deleted_at_decorators, { kind: "field", name: "deleted_at", static: false, private: false, access: { has: obj => "deleted_at" in obj, get: obj => obj.deleted_at, set: (obj, value) => { obj.deleted_at = value; } }, metadata: _metadata }, _deleted_at_initializers, _deleted_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Review = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Review = _classThis;
})();
exports.Review = Review;
