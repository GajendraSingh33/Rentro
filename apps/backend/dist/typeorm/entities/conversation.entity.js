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
exports.Conversation = void 0;
const typeorm_1 = require("typeorm");
let Conversation = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('conversations'), (0, typeorm_1.Index)(['participant1_id', 'participant2_id'], { unique: true }), (0, typeorm_1.Index)(['updated_at'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _participant1_id_decorators;
    let _participant1_id_initializers = [];
    let _participant1_id_extraInitializers = [];
    let _participant2_id_decorators;
    let _participant2_id_initializers = [];
    let _participant2_id_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _last_message_decorators;
    let _last_message_initializers = [];
    let _last_message_extraInitializers = [];
    let _last_message_at_decorators;
    let _last_message_at_initializers = [];
    let _last_message_at_extraInitializers = [];
    let _last_sender_id_decorators;
    let _last_sender_id_initializers = [];
    let _last_sender_id_extraInitializers = [];
    let _unread_count_p1_decorators;
    let _unread_count_p1_initializers = [];
    let _unread_count_p1_extraInitializers = [];
    let _unread_count_p2_decorators;
    let _unread_count_p2_initializers = [];
    let _unread_count_p2_extraInitializers = [];
    let _is_blocked_decorators;
    let _is_blocked_initializers = [];
    let _is_blocked_extraInitializers = [];
    let _blocked_by_decorators;
    let _blocked_by_initializers = [];
    let _blocked_by_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    var Conversation = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.participant1_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _participant1_id_initializers, void 0));
            this.participant2_id = (__runInitializers(this, _participant1_id_extraInitializers), __runInitializers(this, _participant2_id_initializers, void 0));
            this.listing_id = (__runInitializers(this, _participant2_id_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
            this.last_message = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _last_message_initializers, void 0));
            this.last_message_at = (__runInitializers(this, _last_message_extraInitializers), __runInitializers(this, _last_message_at_initializers, void 0));
            this.last_sender_id = (__runInitializers(this, _last_message_at_extraInitializers), __runInitializers(this, _last_sender_id_initializers, void 0));
            this.unread_count_p1 = (__runInitializers(this, _last_sender_id_extraInitializers), __runInitializers(this, _unread_count_p1_initializers, void 0)); // Unread count for participant 1
            this.unread_count_p2 = (__runInitializers(this, _unread_count_p1_extraInitializers), __runInitializers(this, _unread_count_p2_initializers, void 0)); // Unread count for participant 2
            this.is_blocked = (__runInitializers(this, _unread_count_p2_extraInitializers), __runInitializers(this, _is_blocked_initializers, void 0));
            this.blocked_by = (__runInitializers(this, _is_blocked_extraInitializers), __runInitializers(this, _blocked_by_initializers, void 0));
            this.created_at = (__runInitializers(this, _blocked_by_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Conversation");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _participant1_id_decorators = [(0, typeorm_1.Column)()];
        _participant2_id_decorators = [(0, typeorm_1.Column)()];
        _listing_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _last_message_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _last_message_at_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _last_sender_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _unread_count_p1_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _unread_count_p2_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _is_blocked_decorators = [(0, typeorm_1.Column)({ default: false })];
        _blocked_by_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _participant1_id_decorators, { kind: "field", name: "participant1_id", static: false, private: false, access: { has: obj => "participant1_id" in obj, get: obj => obj.participant1_id, set: (obj, value) => { obj.participant1_id = value; } }, metadata: _metadata }, _participant1_id_initializers, _participant1_id_extraInitializers);
        __esDecorate(null, null, _participant2_id_decorators, { kind: "field", name: "participant2_id", static: false, private: false, access: { has: obj => "participant2_id" in obj, get: obj => obj.participant2_id, set: (obj, value) => { obj.participant2_id = value; } }, metadata: _metadata }, _participant2_id_initializers, _participant2_id_extraInitializers);
        __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
        __esDecorate(null, null, _last_message_decorators, { kind: "field", name: "last_message", static: false, private: false, access: { has: obj => "last_message" in obj, get: obj => obj.last_message, set: (obj, value) => { obj.last_message = value; } }, metadata: _metadata }, _last_message_initializers, _last_message_extraInitializers);
        __esDecorate(null, null, _last_message_at_decorators, { kind: "field", name: "last_message_at", static: false, private: false, access: { has: obj => "last_message_at" in obj, get: obj => obj.last_message_at, set: (obj, value) => { obj.last_message_at = value; } }, metadata: _metadata }, _last_message_at_initializers, _last_message_at_extraInitializers);
        __esDecorate(null, null, _last_sender_id_decorators, { kind: "field", name: "last_sender_id", static: false, private: false, access: { has: obj => "last_sender_id" in obj, get: obj => obj.last_sender_id, set: (obj, value) => { obj.last_sender_id = value; } }, metadata: _metadata }, _last_sender_id_initializers, _last_sender_id_extraInitializers);
        __esDecorate(null, null, _unread_count_p1_decorators, { kind: "field", name: "unread_count_p1", static: false, private: false, access: { has: obj => "unread_count_p1" in obj, get: obj => obj.unread_count_p1, set: (obj, value) => { obj.unread_count_p1 = value; } }, metadata: _metadata }, _unread_count_p1_initializers, _unread_count_p1_extraInitializers);
        __esDecorate(null, null, _unread_count_p2_decorators, { kind: "field", name: "unread_count_p2", static: false, private: false, access: { has: obj => "unread_count_p2" in obj, get: obj => obj.unread_count_p2, set: (obj, value) => { obj.unread_count_p2 = value; } }, metadata: _metadata }, _unread_count_p2_initializers, _unread_count_p2_extraInitializers);
        __esDecorate(null, null, _is_blocked_decorators, { kind: "field", name: "is_blocked", static: false, private: false, access: { has: obj => "is_blocked" in obj, get: obj => obj.is_blocked, set: (obj, value) => { obj.is_blocked = value; } }, metadata: _metadata }, _is_blocked_initializers, _is_blocked_extraInitializers);
        __esDecorate(null, null, _blocked_by_decorators, { kind: "field", name: "blocked_by", static: false, private: false, access: { has: obj => "blocked_by" in obj, get: obj => obj.blocked_by, set: (obj, value) => { obj.blocked_by = value; } }, metadata: _metadata }, _blocked_by_initializers, _blocked_by_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Conversation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Conversation = _classThis;
})();
exports.Conversation = Conversation;
