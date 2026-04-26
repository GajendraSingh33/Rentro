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
exports.Inquiry = exports.InquiryStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const pg_listing_entity_1 = require("./pg-listing.entity");
var InquiryStatus;
(function (InquiryStatus) {
    InquiryStatus["NEW"] = "new";
    InquiryStatus["VIEWED"] = "viewed";
    InquiryStatus["RESPONDED"] = "responded";
    InquiryStatus["REJECTED"] = "rejected";
    InquiryStatus["CLOSED"] = "closed";
})(InquiryStatus || (exports.InquiryStatus = InquiryStatus = {}));
let Inquiry = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('inquiries'), (0, typeorm_1.Index)(['seeker_id']), (0, typeorm_1.Index)(['listing_id']), (0, typeorm_1.Index)(['owner_id']), (0, typeorm_1.Index)(['status']), (0, typeorm_1.Index)(['created_at'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _seeker_id_decorators;
    let _seeker_id_initializers = [];
    let _seeker_id_extraInitializers = [];
    let _seeker_decorators;
    let _seeker_initializers = [];
    let _seeker_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _listing_decorators;
    let _listing_initializers = [];
    let _listing_extraInitializers = [];
    let _owner_id_decorators;
    let _owner_id_initializers = [];
    let _owner_id_extraInitializers = [];
    let _owner_decorators;
    let _owner_initializers = [];
    let _owner_extraInitializers = [];
    let _message_decorators;
    let _message_initializers = [];
    let _message_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _owner_response_decorators;
    let _owner_response_initializers = [];
    let _owner_response_extraInitializers = [];
    let _viewed_at_decorators;
    let _viewed_at_initializers = [];
    let _viewed_at_extraInitializers = [];
    let _responded_at_decorators;
    let _responded_at_initializers = [];
    let _responded_at_extraInitializers = [];
    let _rejection_reason_decorators;
    let _rejection_reason_initializers = [];
    let _rejection_reason_extraInitializers = [];
    let _seeker_name_decorators;
    let _seeker_name_initializers = [];
    let _seeker_name_extraInitializers = [];
    let _seeker_email_decorators;
    let _seeker_email_initializers = [];
    let _seeker_email_extraInitializers = [];
    let _seeker_phone_decorators;
    let _seeker_phone_initializers = [];
    let _seeker_phone_extraInitializers = [];
    let _preferred_move_in_date_decorators;
    let _preferred_move_in_date_initializers = [];
    let _preferred_move_in_date_extraInitializers = [];
    let _number_of_people_decorators;
    let _number_of_people_initializers = [];
    let _number_of_people_extraInitializers = [];
    let _duration_months_decorators;
    let _duration_months_initializers = [];
    let _duration_months_extraInitializers = [];
    let _additional_requirements_decorators;
    let _additional_requirements_initializers = [];
    let _additional_requirements_extraInitializers = [];
    let _contact_revealed_decorators;
    let _contact_revealed_initializers = [];
    let _contact_revealed_extraInitializers = [];
    let _contact_revealed_at_decorators;
    let _contact_revealed_at_initializers = [];
    let _contact_revealed_at_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    let _deleted_at_decorators;
    let _deleted_at_initializers = [];
    let _deleted_at_extraInitializers = [];
    var Inquiry = _classThis = class {
        // Virtual properties
        get is_new() {
            return this.status === InquiryStatus.NEW;
        }
        get response_time_hours() {
            if (!this.responded_at)
                return null;
            return Math.floor((this.responded_at.getTime() - this.created_at.getTime()) / (1000 * 60 * 60));
        }
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.seeker_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _seeker_id_initializers, void 0));
            this.seeker = (__runInitializers(this, _seeker_id_extraInitializers), __runInitializers(this, _seeker_initializers, void 0));
            this.listing_id = (__runInitializers(this, _seeker_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
            this.listing = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _listing_initializers, void 0));
            this.owner_id = (__runInitializers(this, _listing_extraInitializers), __runInitializers(this, _owner_id_initializers, void 0));
            this.owner = (__runInitializers(this, _owner_id_extraInitializers), __runInitializers(this, _owner_initializers, void 0));
            this.message = (__runInitializers(this, _owner_extraInitializers), __runInitializers(this, _message_initializers, void 0));
            this.status = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.owner_response = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _owner_response_initializers, void 0));
            this.viewed_at = (__runInitializers(this, _owner_response_extraInitializers), __runInitializers(this, _viewed_at_initializers, void 0));
            this.responded_at = (__runInitializers(this, _viewed_at_extraInitializers), __runInitializers(this, _responded_at_initializers, void 0));
            this.rejection_reason = (__runInitializers(this, _responded_at_extraInitializers), __runInitializers(this, _rejection_reason_initializers, void 0));
            // Seeker details snapshot (in case user deletes account later)
            this.seeker_name = (__runInitializers(this, _rejection_reason_extraInitializers), __runInitializers(this, _seeker_name_initializers, void 0));
            this.seeker_email = (__runInitializers(this, _seeker_name_extraInitializers), __runInitializers(this, _seeker_email_initializers, void 0));
            this.seeker_phone = (__runInitializers(this, _seeker_email_extraInitializers), __runInitializers(this, _seeker_phone_initializers, void 0));
            // Additional inquiry details
            this.preferred_move_in_date = (__runInitializers(this, _seeker_phone_extraInitializers), __runInitializers(this, _preferred_move_in_date_initializers, void 0));
            this.number_of_people = (__runInitializers(this, _preferred_move_in_date_extraInitializers), __runInitializers(this, _number_of_people_initializers, void 0));
            this.duration_months = (__runInitializers(this, _number_of_people_extraInitializers), __runInitializers(this, _duration_months_initializers, void 0));
            this.additional_requirements = (__runInitializers(this, _duration_months_extraInitializers), __runInitializers(this, _additional_requirements_initializers, void 0));
            // Contact revealed tracking
            this.contact_revealed = (__runInitializers(this, _additional_requirements_extraInitializers), __runInitializers(this, _contact_revealed_initializers, void 0));
            this.contact_revealed_at = (__runInitializers(this, _contact_revealed_extraInitializers), __runInitializers(this, _contact_revealed_at_initializers, void 0));
            // Timestamps
            this.created_at = (__runInitializers(this, _contact_revealed_at_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            this.deleted_at = (__runInitializers(this, _updated_at_extraInitializers), __runInitializers(this, _deleted_at_initializers, void 0));
            __runInitializers(this, _deleted_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Inquiry");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('increment')];
        _seeker_id_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _seeker_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'seeker_id' })];
        _listing_id_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _listing_decorators = [(0, typeorm_1.ManyToOne)(() => pg_listing_entity_1.PGListing, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'listing_id' })];
        _owner_id_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _owner_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'owner_id' })];
        _message_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: false })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: InquiryStatus,
                default: InquiryStatus.NEW,
            })];
        _owner_response_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _viewed_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _responded_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _rejection_reason_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _seeker_name_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
        _seeker_email_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
        _seeker_phone_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true })];
        _preferred_move_in_date_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _number_of_people_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _duration_months_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _additional_requirements_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _contact_revealed_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _contact_revealed_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deleted_at_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _seeker_id_decorators, { kind: "field", name: "seeker_id", static: false, private: false, access: { has: obj => "seeker_id" in obj, get: obj => obj.seeker_id, set: (obj, value) => { obj.seeker_id = value; } }, metadata: _metadata }, _seeker_id_initializers, _seeker_id_extraInitializers);
        __esDecorate(null, null, _seeker_decorators, { kind: "field", name: "seeker", static: false, private: false, access: { has: obj => "seeker" in obj, get: obj => obj.seeker, set: (obj, value) => { obj.seeker = value; } }, metadata: _metadata }, _seeker_initializers, _seeker_extraInitializers);
        __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
        __esDecorate(null, null, _listing_decorators, { kind: "field", name: "listing", static: false, private: false, access: { has: obj => "listing" in obj, get: obj => obj.listing, set: (obj, value) => { obj.listing = value; } }, metadata: _metadata }, _listing_initializers, _listing_extraInitializers);
        __esDecorate(null, null, _owner_id_decorators, { kind: "field", name: "owner_id", static: false, private: false, access: { has: obj => "owner_id" in obj, get: obj => obj.owner_id, set: (obj, value) => { obj.owner_id = value; } }, metadata: _metadata }, _owner_id_initializers, _owner_id_extraInitializers);
        __esDecorate(null, null, _owner_decorators, { kind: "field", name: "owner", static: false, private: false, access: { has: obj => "owner" in obj, get: obj => obj.owner, set: (obj, value) => { obj.owner = value; } }, metadata: _metadata }, _owner_initializers, _owner_extraInitializers);
        __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message, set: (obj, value) => { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _owner_response_decorators, { kind: "field", name: "owner_response", static: false, private: false, access: { has: obj => "owner_response" in obj, get: obj => obj.owner_response, set: (obj, value) => { obj.owner_response = value; } }, metadata: _metadata }, _owner_response_initializers, _owner_response_extraInitializers);
        __esDecorate(null, null, _viewed_at_decorators, { kind: "field", name: "viewed_at", static: false, private: false, access: { has: obj => "viewed_at" in obj, get: obj => obj.viewed_at, set: (obj, value) => { obj.viewed_at = value; } }, metadata: _metadata }, _viewed_at_initializers, _viewed_at_extraInitializers);
        __esDecorate(null, null, _responded_at_decorators, { kind: "field", name: "responded_at", static: false, private: false, access: { has: obj => "responded_at" in obj, get: obj => obj.responded_at, set: (obj, value) => { obj.responded_at = value; } }, metadata: _metadata }, _responded_at_initializers, _responded_at_extraInitializers);
        __esDecorate(null, null, _rejection_reason_decorators, { kind: "field", name: "rejection_reason", static: false, private: false, access: { has: obj => "rejection_reason" in obj, get: obj => obj.rejection_reason, set: (obj, value) => { obj.rejection_reason = value; } }, metadata: _metadata }, _rejection_reason_initializers, _rejection_reason_extraInitializers);
        __esDecorate(null, null, _seeker_name_decorators, { kind: "field", name: "seeker_name", static: false, private: false, access: { has: obj => "seeker_name" in obj, get: obj => obj.seeker_name, set: (obj, value) => { obj.seeker_name = value; } }, metadata: _metadata }, _seeker_name_initializers, _seeker_name_extraInitializers);
        __esDecorate(null, null, _seeker_email_decorators, { kind: "field", name: "seeker_email", static: false, private: false, access: { has: obj => "seeker_email" in obj, get: obj => obj.seeker_email, set: (obj, value) => { obj.seeker_email = value; } }, metadata: _metadata }, _seeker_email_initializers, _seeker_email_extraInitializers);
        __esDecorate(null, null, _seeker_phone_decorators, { kind: "field", name: "seeker_phone", static: false, private: false, access: { has: obj => "seeker_phone" in obj, get: obj => obj.seeker_phone, set: (obj, value) => { obj.seeker_phone = value; } }, metadata: _metadata }, _seeker_phone_initializers, _seeker_phone_extraInitializers);
        __esDecorate(null, null, _preferred_move_in_date_decorators, { kind: "field", name: "preferred_move_in_date", static: false, private: false, access: { has: obj => "preferred_move_in_date" in obj, get: obj => obj.preferred_move_in_date, set: (obj, value) => { obj.preferred_move_in_date = value; } }, metadata: _metadata }, _preferred_move_in_date_initializers, _preferred_move_in_date_extraInitializers);
        __esDecorate(null, null, _number_of_people_decorators, { kind: "field", name: "number_of_people", static: false, private: false, access: { has: obj => "number_of_people" in obj, get: obj => obj.number_of_people, set: (obj, value) => { obj.number_of_people = value; } }, metadata: _metadata }, _number_of_people_initializers, _number_of_people_extraInitializers);
        __esDecorate(null, null, _duration_months_decorators, { kind: "field", name: "duration_months", static: false, private: false, access: { has: obj => "duration_months" in obj, get: obj => obj.duration_months, set: (obj, value) => { obj.duration_months = value; } }, metadata: _metadata }, _duration_months_initializers, _duration_months_extraInitializers);
        __esDecorate(null, null, _additional_requirements_decorators, { kind: "field", name: "additional_requirements", static: false, private: false, access: { has: obj => "additional_requirements" in obj, get: obj => obj.additional_requirements, set: (obj, value) => { obj.additional_requirements = value; } }, metadata: _metadata }, _additional_requirements_initializers, _additional_requirements_extraInitializers);
        __esDecorate(null, null, _contact_revealed_decorators, { kind: "field", name: "contact_revealed", static: false, private: false, access: { has: obj => "contact_revealed" in obj, get: obj => obj.contact_revealed, set: (obj, value) => { obj.contact_revealed = value; } }, metadata: _metadata }, _contact_revealed_initializers, _contact_revealed_extraInitializers);
        __esDecorate(null, null, _contact_revealed_at_decorators, { kind: "field", name: "contact_revealed_at", static: false, private: false, access: { has: obj => "contact_revealed_at" in obj, get: obj => obj.contact_revealed_at, set: (obj, value) => { obj.contact_revealed_at = value; } }, metadata: _metadata }, _contact_revealed_at_initializers, _contact_revealed_at_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, null, _deleted_at_decorators, { kind: "field", name: "deleted_at", static: false, private: false, access: { has: obj => "deleted_at" in obj, get: obj => obj.deleted_at, set: (obj, value) => { obj.deleted_at = value; } }, metadata: _metadata }, _deleted_at_initializers, _deleted_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Inquiry = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Inquiry = _classThis;
})();
exports.Inquiry = Inquiry;
