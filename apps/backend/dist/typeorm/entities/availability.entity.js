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
exports.Availability = exports.AvailabilityStatus = void 0;
const typeorm_1 = require("typeorm");
const pg_listing_entity_1 = require("./pg-listing.entity");
var AvailabilityStatus;
(function (AvailabilityStatus) {
    AvailabilityStatus["AVAILABLE"] = "available";
    AvailabilityStatus["OCCUPIED"] = "occupied";
    AvailabilityStatus["MAINTENANCE"] = "maintenance";
    AvailabilityStatus["RESERVED"] = "reserved";
})(AvailabilityStatus || (exports.AvailabilityStatus = AvailabilityStatus = {}));
let Availability = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('availability'), (0, typeorm_1.Index)(['listing_id']), (0, typeorm_1.Index)(['room_number']), (0, typeorm_1.Index)(['status']), (0, typeorm_1.Index)(['effective_date'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _listing_decorators;
    let _listing_initializers = [];
    let _listing_extraInitializers = [];
    let _room_number_decorators;
    let _room_number_initializers = [];
    let _room_number_extraInitializers = [];
    let _total_beds_in_room_decorators;
    let _total_beds_in_room_initializers = [];
    let _total_beds_in_room_extraInitializers = [];
    let _available_beds_in_room_decorators;
    let _available_beds_in_room_initializers = [];
    let _available_beds_in_room_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _effective_date_decorators;
    let _effective_date_initializers = [];
    let _effective_date_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    var Availability = _classThis = class {
        // Virtual properties
        get occupancy_percentage() {
            if (this.total_beds_in_room === 0)
                return 0;
            return ((this.total_beds_in_room - this.available_beds_in_room) / this.total_beds_in_room) * 100;
        }
        get is_fully_occupied() {
            return this.available_beds_in_room === 0;
        }
        get is_available() {
            return this.status === AvailabilityStatus.AVAILABLE && this.available_beds_in_room > 0;
        }
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.listing_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
            this.listing = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _listing_initializers, void 0));
            this.room_number = (__runInitializers(this, _listing_extraInitializers), __runInitializers(this, _room_number_initializers, void 0)); // e.g., "Room 101", "Room A-1"
            this.total_beds_in_room = (__runInitializers(this, _room_number_extraInitializers), __runInitializers(this, _total_beds_in_room_initializers, void 0));
            this.available_beds_in_room = (__runInitializers(this, _total_beds_in_room_extraInitializers), __runInitializers(this, _available_beds_in_room_initializers, void 0));
            this.status = (__runInitializers(this, _available_beds_in_room_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.effective_date = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _effective_date_initializers, void 0)); // Date from which this availability is valid
            this.notes = (__runInitializers(this, _effective_date_extraInitializers), __runInitializers(this, _notes_initializers, void 0)); // Admin notes about availability
            // Timestamps
            this.created_at = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Availability");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('increment')];
        _listing_id_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _listing_decorators = [(0, typeorm_1.ManyToOne)(() => pg_listing_entity_1.PGListing, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'listing_id' })];
        _room_number_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })];
        _total_beds_in_room_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _available_beds_in_room_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: AvailabilityStatus,
                default: AvailabilityStatus.AVAILABLE,
            })];
        _effective_date_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
        _notes_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
        __esDecorate(null, null, _listing_decorators, { kind: "field", name: "listing", static: false, private: false, access: { has: obj => "listing" in obj, get: obj => obj.listing, set: (obj, value) => { obj.listing = value; } }, metadata: _metadata }, _listing_initializers, _listing_extraInitializers);
        __esDecorate(null, null, _room_number_decorators, { kind: "field", name: "room_number", static: false, private: false, access: { has: obj => "room_number" in obj, get: obj => obj.room_number, set: (obj, value) => { obj.room_number = value; } }, metadata: _metadata }, _room_number_initializers, _room_number_extraInitializers);
        __esDecorate(null, null, _total_beds_in_room_decorators, { kind: "field", name: "total_beds_in_room", static: false, private: false, access: { has: obj => "total_beds_in_room" in obj, get: obj => obj.total_beds_in_room, set: (obj, value) => { obj.total_beds_in_room = value; } }, metadata: _metadata }, _total_beds_in_room_initializers, _total_beds_in_room_extraInitializers);
        __esDecorate(null, null, _available_beds_in_room_decorators, { kind: "field", name: "available_beds_in_room", static: false, private: false, access: { has: obj => "available_beds_in_room" in obj, get: obj => obj.available_beds_in_room, set: (obj, value) => { obj.available_beds_in_room = value; } }, metadata: _metadata }, _available_beds_in_room_initializers, _available_beds_in_room_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _effective_date_decorators, { kind: "field", name: "effective_date", static: false, private: false, access: { has: obj => "effective_date" in obj, get: obj => obj.effective_date, set: (obj, value) => { obj.effective_date = value; } }, metadata: _metadata }, _effective_date_initializers, _effective_date_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Availability = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Availability = _classThis;
})();
exports.Availability = Availability;
