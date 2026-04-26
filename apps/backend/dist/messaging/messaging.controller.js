"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MessagingController = (() => {
    let _classDecorators = [(0, common_1.Controller)('messages'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _sendMessage_decorators;
    let _getConversations_decorators;
    let _getMessages_decorators;
    let _markAsRead_decorators;
    let _markAllAsRead_decorators;
    let _deleteMessage_decorators;
    let _blockConversation_decorators;
    let _getUnreadCount_decorators;
    var MessagingController = _classThis = class {
        constructor(messagingService) {
            this.messagingService = (__runInitializers(this, _instanceExtraInitializers), messagingService);
        }
        async sendMessage(req, dto) {
            const message = await this.messagingService.sendMessage(req.user.id, dto);
            return {
                success: true,
                message: 'Message sent successfully',
                data: message,
            };
        }
        async getConversations(req, dto) {
            return this.messagingService.getConversations(req.user.id, dto);
        }
        async getMessages(req, conversationId, dto) {
            return this.messagingService.getMessages(req.user.id, {
                ...dto,
                conversation_id: conversationId,
            });
        }
        async markAsRead(req, messageId) {
            await this.messagingService.markAsRead(req.user.id, messageId);
            return {
                success: true,
                message: 'Message marked as read',
            };
        }
        async markAllAsRead(req, conversationId) {
            await this.messagingService.markAllAsRead(req.user.id, conversationId);
            return {
                success: true,
                message: 'All messages marked as read',
            };
        }
        async deleteMessage(req, messageId) {
            await this.messagingService.deleteMessage(req.user.id, messageId);
            return {
                success: true,
                message: 'Message deleted successfully',
            };
        }
        async blockConversation(req, conversationId, dto) {
            await this.messagingService.blockConversation(req.user.id, conversationId, dto.block);
            return {
                success: true,
                message: dto.block ? 'Conversation blocked' : 'Conversation unblocked',
            };
        }
        async getUnreadCount(req) {
            const count = await this.messagingService.getTotalUnreadCount(req.user.id);
            return {
                success: true,
                data: { unread_count: count },
            };
        }
    };
    __setFunctionName(_classThis, "MessagingController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _sendMessage_decorators = [(0, common_1.Post)()];
        _getConversations_decorators = [(0, common_1.Get)('conversations')];
        _getMessages_decorators = [(0, common_1.Get)('conversations/:conversationId')];
        _markAsRead_decorators = [(0, common_1.Put)(':id/read')];
        _markAllAsRead_decorators = [(0, common_1.Put)('conversations/:id/read-all')];
        _deleteMessage_decorators = [(0, common_1.Delete)(':id')];
        _blockConversation_decorators = [(0, common_1.Post)('conversations/:id/block')];
        _getUnreadCount_decorators = [(0, common_1.Get)('unread-count')];
        __esDecorate(_classThis, null, _sendMessage_decorators, { kind: "method", name: "sendMessage", static: false, private: false, access: { has: obj => "sendMessage" in obj, get: obj => obj.sendMessage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getConversations_decorators, { kind: "method", name: "getConversations", static: false, private: false, access: { has: obj => "getConversations" in obj, get: obj => obj.getConversations }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMessages_decorators, { kind: "method", name: "getMessages", static: false, private: false, access: { has: obj => "getMessages" in obj, get: obj => obj.getMessages }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAsRead_decorators, { kind: "method", name: "markAsRead", static: false, private: false, access: { has: obj => "markAsRead" in obj, get: obj => obj.markAsRead }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAllAsRead_decorators, { kind: "method", name: "markAllAsRead", static: false, private: false, access: { has: obj => "markAllAsRead" in obj, get: obj => obj.markAllAsRead }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteMessage_decorators, { kind: "method", name: "deleteMessage", static: false, private: false, access: { has: obj => "deleteMessage" in obj, get: obj => obj.deleteMessage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _blockConversation_decorators, { kind: "method", name: "blockConversation", static: false, private: false, access: { has: obj => "blockConversation" in obj, get: obj => obj.blockConversation }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUnreadCount_decorators, { kind: "method", name: "getUnreadCount", static: false, private: false, access: { has: obj => "getUnreadCount" in obj, get: obj => obj.getUnreadCount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessagingController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessagingController = _classThis;
})();
exports.MessagingController = MessagingController;
