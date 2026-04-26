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
exports.Message = exports.MessageStatus = exports.MessageType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const pg_listing_entity_1 = require("./pg-listing.entity");
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "text";
    MessageType["IMAGE"] = "image";
    MessageType["FILE"] = "file";
    MessageType["SYSTEM"] = "system";
})(MessageType || (exports.MessageType = MessageType = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["SENT"] = "sent";
    MessageStatus["DELIVERED"] = "delivered";
    MessageStatus["READ"] = "read";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
let Message = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('messages'), (0, typeorm_1.Index)(['conversation_id', 'created_at']), (0, typeorm_1.Index)(['sender_id', 'created_at']), (0, typeorm_1.Index)(['receiver_id', 'created_at'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _conversation_id_decorators;
    let _conversation_id_initializers = [];
    let _conversation_id_extraInitializers = [];
    let _sender_id_decorators;
    let _sender_id_initializers = [];
    let _sender_id_extraInitializers = [];
    let _sender_decorators;
    let _sender_initializers = [];
    let _sender_extraInitializers = [];
    let _receiver_id_decorators;
    let _receiver_id_initializers = [];
    let _receiver_id_extraInitializers = [];
    let _receiver_decorators;
    let _receiver_initializers = [];
    let _receiver_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _listing_decorators;
    let _listing_initializers = [];
    let _listing_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _message_type_decorators;
    let _message_type_initializers = [];
    let _message_type_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _attachment_url_decorators;
    let _attachment_url_initializers = [];
    let _attachment_url_extraInitializers = [];
    let _read_at_decorators;
    let _read_at_initializers = [];
    let _read_at_extraInitializers = [];
    let _is_deleted_by_sender_decorators;
    let _is_deleted_by_sender_initializers = [];
    let _is_deleted_by_sender_extraInitializers = [];
    let _is_deleted_by_receiver_decorators;
    let _is_deleted_by_receiver_initializers = [];
    let _is_deleted_by_receiver_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    var Message = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.conversation_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _conversation_id_initializers, void 0));
            this.sender_id = (__runInitializers(this, _conversation_id_extraInitializers), __runInitializers(this, _sender_id_initializers, void 0));
            this.sender = (__runInitializers(this, _sender_id_extraInitializers), __runInitializers(this, _sender_initializers, void 0));
            this.receiver_id = (__runInitializers(this, _sender_extraInitializers), __runInitializers(this, _receiver_id_initializers, void 0));
            this.receiver = (__runInitializers(this, _receiver_id_extraInitializers), __runInitializers(this, _receiver_initializers, void 0));
            this.listing_id = (__runInitializers(this, _receiver_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
            this.listing = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _listing_initializers, void 0));
            this.content = (__runInitializers(this, _listing_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.message_type = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _message_type_initializers, void 0));
            this.status = (__runInitializers(this, _message_type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.attachment_url = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _attachment_url_initializers, void 0));
            this.read_at = (__runInitializers(this, _attachment_url_extraInitializers), __runInitializers(this, _read_at_initializers, void 0));
            this.is_deleted_by_sender = (__runInitializers(this, _read_at_extraInitializers), __runInitializers(this, _is_deleted_by_sender_initializers, void 0));
            this.is_deleted_by_receiver = (__runInitializers(this, _is_deleted_by_sender_extraInitializers), __runInitializers(this, _is_deleted_by_receiver_initializers, void 0));
            this.created_at = (__runInitializers(this, _is_deleted_by_receiver_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Message");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _conversation_id_decorators = [(0, typeorm_1.Column)()];
        _sender_id_decorators = [(0, typeorm_1.Column)()];
        _sender_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User), (0, typeorm_1.JoinColumn)({ name: 'sender_id' })];
        _receiver_id_decorators = [(0, typeorm_1.Column)()];
        _receiver_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User), (0, typeorm_1.JoinColumn)({ name: 'receiver_id' })];
        _listing_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _listing_decorators = [(0, typeorm_1.ManyToOne)(() => pg_listing_entity_1.PGListing, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'listing_id' })];
        _content_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _message_type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: MessageType,
                default: MessageType.TEXT,
            })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: MessageStatus,
                default: MessageStatus.SENT,
            })];
        _attachment_url_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _read_at_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _is_deleted_by_sender_decorators = [(0, typeorm_1.Column)({ default: false })];
        _is_deleted_by_receiver_decorators = [(0, typeorm_1.Column)({ default: false })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _conversation_id_decorators, { kind: "field", name: "conversation_id", static: false, private: false, access: { has: obj => "conversation_id" in obj, get: obj => obj.conversation_id, set: (obj, value) => { obj.conversation_id = value; } }, metadata: _metadata }, _conversation_id_initializers, _conversation_id_extraInitializers);
        __esDecorate(null, null, _sender_id_decorators, { kind: "field", name: "sender_id", static: false, private: false, access: { has: obj => "sender_id" in obj, get: obj => obj.sender_id, set: (obj, value) => { obj.sender_id = value; } }, metadata: _metadata }, _sender_id_initializers, _sender_id_extraInitializers);
        __esDecorate(null, null, _sender_decorators, { kind: "field", name: "sender", static: false, private: false, access: { has: obj => "sender" in obj, get: obj => obj.sender, set: (obj, value) => { obj.sender = value; } }, metadata: _metadata }, _sender_initializers, _sender_extraInitializers);
        __esDecorate(null, null, _receiver_id_decorators, { kind: "field", name: "receiver_id", static: false, private: false, access: { has: obj => "receiver_id" in obj, get: obj => obj.receiver_id, set: (obj, value) => { obj.receiver_id = value; } }, metadata: _metadata }, _receiver_id_initializers, _receiver_id_extraInitializers);
        __esDecorate(null, null, _receiver_decorators, { kind: "field", name: "receiver", static: false, private: false, access: { has: obj => "receiver" in obj, get: obj => obj.receiver, set: (obj, value) => { obj.receiver = value; } }, metadata: _metadata }, _receiver_initializers, _receiver_extraInitializers);
        __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
        __esDecorate(null, null, _listing_decorators, { kind: "field", name: "listing", static: false, private: false, access: { has: obj => "listing" in obj, get: obj => obj.listing, set: (obj, value) => { obj.listing = value; } }, metadata: _metadata }, _listing_initializers, _listing_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _message_type_decorators, { kind: "field", name: "message_type", static: false, private: false, access: { has: obj => "message_type" in obj, get: obj => obj.message_type, set: (obj, value) => { obj.message_type = value; } }, metadata: _metadata }, _message_type_initializers, _message_type_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _attachment_url_decorators, { kind: "field", name: "attachment_url", static: false, private: false, access: { has: obj => "attachment_url" in obj, get: obj => obj.attachment_url, set: (obj, value) => { obj.attachment_url = value; } }, metadata: _metadata }, _attachment_url_initializers, _attachment_url_extraInitializers);
        __esDecorate(null, null, _read_at_decorators, { kind: "field", name: "read_at", static: false, private: false, access: { has: obj => "read_at" in obj, get: obj => obj.read_at, set: (obj, value) => { obj.read_at = value; } }, metadata: _metadata }, _read_at_initializers, _read_at_extraInitializers);
        __esDecorate(null, null, _is_deleted_by_sender_decorators, { kind: "field", name: "is_deleted_by_sender", static: false, private: false, access: { has: obj => "is_deleted_by_sender" in obj, get: obj => obj.is_deleted_by_sender, set: (obj, value) => { obj.is_deleted_by_sender = value; } }, metadata: _metadata }, _is_deleted_by_sender_initializers, _is_deleted_by_sender_extraInitializers);
        __esDecorate(null, null, _is_deleted_by_receiver_decorators, { kind: "field", name: "is_deleted_by_receiver", static: false, private: false, access: { has: obj => "is_deleted_by_receiver" in obj, get: obj => obj.is_deleted_by_receiver, set: (obj, value) => { obj.is_deleted_by_receiver = value; } }, metadata: _metadata }, _is_deleted_by_receiver_initializers, _is_deleted_by_receiver_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Message = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Message = _classThis;
})();
exports.Message = Message;
