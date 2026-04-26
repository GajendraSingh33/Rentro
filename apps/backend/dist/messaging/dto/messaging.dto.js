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
exports.BlockConversationDto = exports.GetConversationsDto = exports.MarkAsReadDto = exports.GetMessagesDto = exports.SendMessageDto = void 0;
const class_validator_1 = require("class-validator");
const entities_1 = require("../../typeorm/entities");
let SendMessageDto = (() => {
    var _a;
    let _receiver_id_decorators;
    let _receiver_id_initializers = [];
    let _receiver_id_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _message_type_decorators;
    let _message_type_initializers = [];
    let _message_type_extraInitializers = [];
    let _attachment_url_decorators;
    let _attachment_url_initializers = [];
    let _attachment_url_extraInitializers = [];
    return _a = class SendMessageDto {
            constructor() {
                this.receiver_id = __runInitializers(this, _receiver_id_initializers, void 0);
                this.listing_id = (__runInitializers(this, _receiver_id_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
                this.content = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.message_type = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _message_type_initializers, void 0));
                this.attachment_url = (__runInitializers(this, _message_type_extraInitializers), __runInitializers(this, _attachment_url_initializers, void 0));
                __runInitializers(this, _attachment_url_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _receiver_id_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsNumber)()];
            _listing_id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _content_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
            _message_type_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(entities_1.MessageType)];
            _attachment_url_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _receiver_id_decorators, { kind: "field", name: "receiver_id", static: false, private: false, access: { has: obj => "receiver_id" in obj, get: obj => obj.receiver_id, set: (obj, value) => { obj.receiver_id = value; } }, metadata: _metadata }, _receiver_id_initializers, _receiver_id_extraInitializers);
            __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _message_type_decorators, { kind: "field", name: "message_type", static: false, private: false, access: { has: obj => "message_type" in obj, get: obj => obj.message_type, set: (obj, value) => { obj.message_type = value; } }, metadata: _metadata }, _message_type_initializers, _message_type_extraInitializers);
            __esDecorate(null, null, _attachment_url_decorators, { kind: "field", name: "attachment_url", static: false, private: false, access: { has: obj => "attachment_url" in obj, get: obj => obj.attachment_url, set: (obj, value) => { obj.attachment_url = value; } }, metadata: _metadata }, _attachment_url_initializers, _attachment_url_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.SendMessageDto = SendMessageDto;
let GetMessagesDto = (() => {
    var _a;
    let _conversation_id_decorators;
    let _conversation_id_initializers = [];
    let _conversation_id_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return _a = class GetMessagesDto {
            constructor() {
                this.conversation_id = __runInitializers(this, _conversation_id_initializers, void 0);
                this.page = (__runInitializers(this, _conversation_id_extraInitializers), __runInitializers(this, _page_initializers, void 0));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
                __runInitializers(this, _limit_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _conversation_id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _conversation_id_decorators, { kind: "field", name: "conversation_id", static: false, private: false, access: { has: obj => "conversation_id" in obj, get: obj => obj.conversation_id, set: (obj, value) => { obj.conversation_id = value; } }, metadata: _metadata }, _conversation_id_initializers, _conversation_id_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.GetMessagesDto = GetMessagesDto;
let MarkAsReadDto = (() => {
    var _a;
    let _message_id_decorators;
    let _message_id_initializers = [];
    let _message_id_extraInitializers = [];
    return _a = class MarkAsReadDto {
            constructor() {
                this.message_id = __runInitializers(this, _message_id_initializers, void 0);
                __runInitializers(this, _message_id_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _message_id_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _message_id_decorators, { kind: "field", name: "message_id", static: false, private: false, access: { has: obj => "message_id" in obj, get: obj => obj.message_id, set: (obj, value) => { obj.message_id = value; } }, metadata: _metadata }, _message_id_initializers, _message_id_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.MarkAsReadDto = MarkAsReadDto;
let GetConversationsDto = (() => {
    var _a;
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return _a = class GetConversationsDto {
            constructor() {
                this.page = __runInitializers(this, _page_initializers, void 0);
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
                __runInitializers(this, _limit_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.GetConversationsDto = GetConversationsDto;
let BlockConversationDto = (() => {
    var _a;
    let _conversation_id_decorators;
    let _conversation_id_initializers = [];
    let _conversation_id_extraInitializers = [];
    let _block_decorators;
    let _block_initializers = [];
    let _block_extraInitializers = [];
    return _a = class BlockConversationDto {
            constructor() {
                this.conversation_id = __runInitializers(this, _conversation_id_initializers, void 0);
                this.block = (__runInitializers(this, _conversation_id_extraInitializers), __runInitializers(this, _block_initializers, void 0));
                __runInitializers(this, _block_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _conversation_id_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsNumber)()];
            _block_decorators = [(0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _conversation_id_decorators, { kind: "field", name: "conversation_id", static: false, private: false, access: { has: obj => "conversation_id" in obj, get: obj => obj.conversation_id, set: (obj, value) => { obj.conversation_id = value; } }, metadata: _metadata }, _conversation_id_initializers, _conversation_id_extraInitializers);
            __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.BlockConversationDto = BlockConversationDto;
