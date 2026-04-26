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
exports.UserActivity = exports.ActivityType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const pg_listing_entity_1 = require("./pg-listing.entity");
var ActivityType;
(function (ActivityType) {
    ActivityType["VIEW"] = "view";
    ActivityType["SEARCH"] = "search";
    ActivityType["FAVORITE"] = "favorite";
    ActivityType["INQUIRY"] = "inquiry";
    ActivityType["BOOKING"] = "booking";
    ActivityType["SHARE"] = "share";
})(ActivityType || (exports.ActivityType = ActivityType = {}));
let UserActivity = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('user_activities'), (0, typeorm_1.Index)(['user_id', 'created_at']), (0, typeorm_1.Index)(['listing_id', 'activity_type']), (0, typeorm_1.Index)(['activity_type', 'created_at'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _user_id_decorators;
    let _user_id_initializers = [];
    let _user_id_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _listing_decorators;
    let _listing_initializers = [];
    let _listing_extraInitializers = [];
    let _activity_type_decorators;
    let _activity_type_initializers = [];
    let _activity_type_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _ip_address_decorators;
    let _ip_address_initializers = [];
    let _ip_address_extraInitializers = [];
    let _user_agent_decorators;
    let _user_agent_initializers = [];
    let _user_agent_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    var UserActivity = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.user_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_id_initializers, void 0));
            this.user = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.listing_id = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
            this.listing = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _listing_initializers, void 0));
            this.activity_type = (__runInitializers(this, _listing_extraInitializers), __runInitializers(this, _activity_type_initializers, void 0));
            this.metadata = (__runInitializers(this, _activity_type_extraInitializers), __runInitializers(this, _metadata_initializers, void 0)); // Additional context (search query, filters, etc.)
            this.ip_address = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _ip_address_initializers, void 0));
            this.user_agent = (__runInitializers(this, _ip_address_extraInitializers), __runInitializers(this, _user_agent_initializers, void 0));
            this.created_at = (__runInitializers(this, _user_agent_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            __runInitializers(this, _created_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "UserActivity");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _user_id_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'user_id' })];
        _listing_id_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
        _listing_decorators = [(0, typeorm_1.ManyToOne)(() => pg_listing_entity_1.PgListing, { onDelete: 'CASCADE', nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'listing_id' })];
        _activity_type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: ActivityType,
            }), (0, typeorm_1.Index)()];
        _metadata_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
        _ip_address_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
        _user_agent_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)(), (0, typeorm_1.Index)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: obj => "user_id" in obj, get: obj => obj.user_id, set: (obj, value) => { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
        __esDecorate(null, null, _listing_decorators, { kind: "field", name: "listing", static: false, private: false, access: { has: obj => "listing" in obj, get: obj => obj.listing, set: (obj, value) => { obj.listing = value; } }, metadata: _metadata }, _listing_initializers, _listing_extraInitializers);
        __esDecorate(null, null, _activity_type_decorators, { kind: "field", name: "activity_type", static: false, private: false, access: { has: obj => "activity_type" in obj, get: obj => obj.activity_type, set: (obj, value) => { obj.activity_type = value; } }, metadata: _metadata }, _activity_type_initializers, _activity_type_extraInitializers);
        __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
        __esDecorate(null, null, _ip_address_decorators, { kind: "field", name: "ip_address", static: false, private: false, access: { has: obj => "ip_address" in obj, get: obj => obj.ip_address, set: (obj, value) => { obj.ip_address = value; } }, metadata: _metadata }, _ip_address_initializers, _ip_address_extraInitializers);
        __esDecorate(null, null, _user_agent_decorators, { kind: "field", name: "user_agent", static: false, private: false, access: { has: obj => "user_agent" in obj, get: obj => obj.user_agent, set: (obj, value) => { obj.user_agent = value; } }, metadata: _metadata }, _user_agent_initializers, _user_agent_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserActivity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserActivity = _classThis;
})();
exports.UserActivity = UserActivity;
