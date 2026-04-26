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
exports.PremiumListing = exports.PremiumStatus = exports.PremiumPlanType = void 0;
const typeorm_1 = require("typeorm");
const pg_listing_entity_1 = require("./pg-listing.entity");
const user_entity_1 = require("./user.entity");
var PremiumPlanType;
(function (PremiumPlanType) {
    PremiumPlanType["FEATURED"] = "featured";
    PremiumPlanType["PREMIUM_30"] = "premium_30";
    PremiumPlanType["PREMIUM_90"] = "premium_90";
    PremiumPlanType["PREMIUM_365"] = "premium_365";
})(PremiumPlanType || (exports.PremiumPlanType = PremiumPlanType = {}));
var PremiumStatus;
(function (PremiumStatus) {
    PremiumStatus["ACTIVE"] = "active";
    PremiumStatus["EXPIRED"] = "expired";
    PremiumStatus["CANCELLED"] = "cancelled";
})(PremiumStatus || (exports.PremiumStatus = PremiumStatus = {}));
let PremiumListing = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('premium_listings'), (0, typeorm_1.Index)(['listing_id', 'status']), (0, typeorm_1.Index)(['end_date'])];
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
    let _plan_type_decorators;
    let _plan_type_initializers = [];
    let _plan_type_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _start_date_decorators;
    let _start_date_initializers = [];
    let _start_date_extraInitializers = [];
    let _end_date_decorators;
    let _end_date_initializers = [];
    let _end_date_extraInitializers = [];
    let _amount_paid_decorators;
    let _amount_paid_initializers = [];
    let _amount_paid_extraInitializers = [];
    let _payment_id_decorators;
    let _payment_id_initializers = [];
    let _payment_id_extraInitializers = [];
    let _boost_score_decorators;
    let _boost_score_initializers = [];
    let _boost_score_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    var PremiumListing = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.listing_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
            this.listing = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _listing_initializers, void 0));
            this.owner_id = (__runInitializers(this, _listing_extraInitializers), __runInitializers(this, _owner_id_initializers, void 0));
            this.owner = (__runInitializers(this, _owner_id_extraInitializers), __runInitializers(this, _owner_initializers, void 0));
            this.plan_type = (__runInitializers(this, _owner_extraInitializers), __runInitializers(this, _plan_type_initializers, void 0));
            this.status = (__runInitializers(this, _plan_type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.start_date = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _start_date_initializers, void 0));
            this.end_date = (__runInitializers(this, _start_date_extraInitializers), __runInitializers(this, _end_date_initializers, void 0));
            this.amount_paid = (__runInitializers(this, _end_date_extraInitializers), __runInitializers(this, _amount_paid_initializers, void 0));
            this.payment_id = (__runInitializers(this, _amount_paid_extraInitializers), __runInitializers(this, _payment_id_initializers, void 0));
            this.boost_score = (__runInitializers(this, _payment_id_extraInitializers), __runInitializers(this, _boost_score_initializers, void 0)); // Higher score = higher in search results
            this.created_at = (__runInitializers(this, _boost_score_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "PremiumListing");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _listing_id_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _listing_decorators = [(0, typeorm_1.ManyToOne)(() => pg_listing_entity_1.PgListing, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'listing_id' })];
        _owner_id_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _owner_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'owner_id' })];
        _plan_type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: PremiumPlanType,
            })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: PremiumStatus,
                default: PremiumStatus.ACTIVE,
            }), (0, typeorm_1.Index)()];
        _start_date_decorators = [(0, typeorm_1.Column)({ type: 'date' })];
        _end_date_decorators = [(0, typeorm_1.Column)({ type: 'date' }), (0, typeorm_1.Index)()];
        _amount_paid_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
        _payment_id_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
        _boost_score_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
        __esDecorate(null, null, _listing_decorators, { kind: "field", name: "listing", static: false, private: false, access: { has: obj => "listing" in obj, get: obj => obj.listing, set: (obj, value) => { obj.listing = value; } }, metadata: _metadata }, _listing_initializers, _listing_extraInitializers);
        __esDecorate(null, null, _owner_id_decorators, { kind: "field", name: "owner_id", static: false, private: false, access: { has: obj => "owner_id" in obj, get: obj => obj.owner_id, set: (obj, value) => { obj.owner_id = value; } }, metadata: _metadata }, _owner_id_initializers, _owner_id_extraInitializers);
        __esDecorate(null, null, _owner_decorators, { kind: "field", name: "owner", static: false, private: false, access: { has: obj => "owner" in obj, get: obj => obj.owner, set: (obj, value) => { obj.owner = value; } }, metadata: _metadata }, _owner_initializers, _owner_extraInitializers);
        __esDecorate(null, null, _plan_type_decorators, { kind: "field", name: "plan_type", static: false, private: false, access: { has: obj => "plan_type" in obj, get: obj => obj.plan_type, set: (obj, value) => { obj.plan_type = value; } }, metadata: _metadata }, _plan_type_initializers, _plan_type_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _start_date_decorators, { kind: "field", name: "start_date", static: false, private: false, access: { has: obj => "start_date" in obj, get: obj => obj.start_date, set: (obj, value) => { obj.start_date = value; } }, metadata: _metadata }, _start_date_initializers, _start_date_extraInitializers);
        __esDecorate(null, null, _end_date_decorators, { kind: "field", name: "end_date", static: false, private: false, access: { has: obj => "end_date" in obj, get: obj => obj.end_date, set: (obj, value) => { obj.end_date = value; } }, metadata: _metadata }, _end_date_initializers, _end_date_extraInitializers);
        __esDecorate(null, null, _amount_paid_decorators, { kind: "field", name: "amount_paid", static: false, private: false, access: { has: obj => "amount_paid" in obj, get: obj => obj.amount_paid, set: (obj, value) => { obj.amount_paid = value; } }, metadata: _metadata }, _amount_paid_initializers, _amount_paid_extraInitializers);
        __esDecorate(null, null, _payment_id_decorators, { kind: "field", name: "payment_id", static: false, private: false, access: { has: obj => "payment_id" in obj, get: obj => obj.payment_id, set: (obj, value) => { obj.payment_id = value; } }, metadata: _metadata }, _payment_id_initializers, _payment_id_extraInitializers);
        __esDecorate(null, null, _boost_score_decorators, { kind: "field", name: "boost_score", static: false, private: false, access: { has: obj => "boost_score" in obj, get: obj => obj.boost_score, set: (obj, value) => { obj.boost_score = value; } }, metadata: _metadata }, _boost_score_initializers, _boost_score_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PremiumListing = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PremiumListing = _classThis;
})();
exports.PremiumListing = PremiumListing;
