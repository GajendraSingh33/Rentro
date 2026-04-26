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
exports.Offer = exports.OfferStatus = void 0;
const typeorm_1 = require("typeorm");
const pg_listing_entity_1 = require("./pg-listing.entity");
const user_entity_1 = require("./user.entity");
var OfferStatus;
(function (OfferStatus) {
    OfferStatus["ACTIVE"] = "active";
    OfferStatus["EXPIRED"] = "expired";
    OfferStatus["PAUSED"] = "paused";
})(OfferStatus || (exports.OfferStatus = OfferStatus = {}));
let Offer = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('offers'), (0, typeorm_1.Index)(['listing_id', 'status']), (0, typeorm_1.Index)(['start_date', 'end_date'])];
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
    let _discount_percent_decorators;
    let _discount_percent_initializers = [];
    let _discount_percent_extraInitializers = [];
    let _start_date_decorators;
    let _start_date_initializers = [];
    let _start_date_extraInitializers = [];
    let _end_date_decorators;
    let _end_date_initializers = [];
    let _end_date_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _redemptions_count_decorators;
    let _redemptions_count_initializers = [];
    let _redemptions_count_extraInitializers = [];
    let _max_redemptions_decorators;
    let _max_redemptions_initializers = [];
    let _max_redemptions_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    var Offer = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.listing_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
            this.listing = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _listing_initializers, void 0));
            this.owner_id = (__runInitializers(this, _listing_extraInitializers), __runInitializers(this, _owner_id_initializers, void 0));
            this.owner = (__runInitializers(this, _owner_id_extraInitializers), __runInitializers(this, _owner_initializers, void 0));
            this.title = (__runInitializers(this, _owner_extraInitializers), __runInitializers(this, _title_initializers, void 0)); // e.g., "Early Bird Discount", "Festive Offer"
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.discount_percent = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _discount_percent_initializers, void 0)); // 1-100
            this.start_date = (__runInitializers(this, _discount_percent_extraInitializers), __runInitializers(this, _start_date_initializers, void 0));
            this.end_date = (__runInitializers(this, _start_date_extraInitializers), __runInitializers(this, _end_date_initializers, void 0));
            this.status = (__runInitializers(this, _end_date_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.redemptions_count = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _redemptions_count_initializers, void 0)); // How many times used
            this.max_redemptions = (__runInitializers(this, _redemptions_count_extraInitializers), __runInitializers(this, _max_redemptions_initializers, void 0)); // Null = unlimited
            this.created_at = (__runInitializers(this, _max_redemptions_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Offer");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _listing_id_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _listing_decorators = [(0, typeorm_1.ManyToOne)(() => pg_listing_entity_1.PgListing, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'listing_id' })];
        _owner_id_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _owner_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'owner_id' })];
        _title_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255 })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _discount_percent_decorators = [(0, typeorm_1.Column)({ type: 'int' })];
        _start_date_decorators = [(0, typeorm_1.Column)({ type: 'date' })];
        _end_date_decorators = [(0, typeorm_1.Column)({ type: 'date' }), (0, typeorm_1.Index)()];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: OfferStatus,
                default: OfferStatus.ACTIVE,
            }), (0, typeorm_1.Index)()];
        _redemptions_count_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _max_redemptions_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
        __esDecorate(null, null, _listing_decorators, { kind: "field", name: "listing", static: false, private: false, access: { has: obj => "listing" in obj, get: obj => obj.listing, set: (obj, value) => { obj.listing = value; } }, metadata: _metadata }, _listing_initializers, _listing_extraInitializers);
        __esDecorate(null, null, _owner_id_decorators, { kind: "field", name: "owner_id", static: false, private: false, access: { has: obj => "owner_id" in obj, get: obj => obj.owner_id, set: (obj, value) => { obj.owner_id = value; } }, metadata: _metadata }, _owner_id_initializers, _owner_id_extraInitializers);
        __esDecorate(null, null, _owner_decorators, { kind: "field", name: "owner", static: false, private: false, access: { has: obj => "owner" in obj, get: obj => obj.owner, set: (obj, value) => { obj.owner = value; } }, metadata: _metadata }, _owner_initializers, _owner_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _discount_percent_decorators, { kind: "field", name: "discount_percent", static: false, private: false, access: { has: obj => "discount_percent" in obj, get: obj => obj.discount_percent, set: (obj, value) => { obj.discount_percent = value; } }, metadata: _metadata }, _discount_percent_initializers, _discount_percent_extraInitializers);
        __esDecorate(null, null, _start_date_decorators, { kind: "field", name: "start_date", static: false, private: false, access: { has: obj => "start_date" in obj, get: obj => obj.start_date, set: (obj, value) => { obj.start_date = value; } }, metadata: _metadata }, _start_date_initializers, _start_date_extraInitializers);
        __esDecorate(null, null, _end_date_decorators, { kind: "field", name: "end_date", static: false, private: false, access: { has: obj => "end_date" in obj, get: obj => obj.end_date, set: (obj, value) => { obj.end_date = value; } }, metadata: _metadata }, _end_date_initializers, _end_date_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _redemptions_count_decorators, { kind: "field", name: "redemptions_count", static: false, private: false, access: { has: obj => "redemptions_count" in obj, get: obj => obj.redemptions_count, set: (obj, value) => { obj.redemptions_count = value; } }, metadata: _metadata }, _redemptions_count_initializers, _redemptions_count_extraInitializers);
        __esDecorate(null, null, _max_redemptions_decorators, { kind: "field", name: "max_redemptions", static: false, private: false, access: { has: obj => "max_redemptions" in obj, get: obj => obj.max_redemptions, set: (obj, value) => { obj.max_redemptions = value; } }, metadata: _metadata }, _max_redemptions_initializers, _max_redemptions_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Offer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Offer = _classThis;
})();
exports.Offer = Offer;
