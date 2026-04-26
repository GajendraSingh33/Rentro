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
exports.MessagingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
let MessagingGateway = (() => {
    let _classDecorators = [(0, common_1.Injectable)(), (0, websockets_1.WebSocketGateway)({
            cors: {
                origin: process.env.FRONTEND_URL || 'http://localhost:3000',
                credentials: true,
            },
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _server_decorators;
    let _server_initializers = [];
    let _server_extraInitializers = [];
    let _handleSendMessage_decorators;
    let _handleTypingStart_decorators;
    let _handleTypingStop_decorators;
    let _handleMarkRead_decorators;
    let _handleJoinConversation_decorators;
    let _handleLeaveConversation_decorators;
    var MessagingGateway = _classThis = class {
        constructor(jwtService, messagingService) {
            this.jwtService = (__runInitializers(this, _instanceExtraInitializers), jwtService);
            this.messagingService = messagingService;
            this.server = __runInitializers(this, _server_initializers, void 0);
            this.logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger(MessagingGateway.name));
            this.connectedUsers = new Map(); // userId -> socketId
        }
        async handleConnection(client) {
            try {
                // Extract token from handshake
                const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.replace('Bearer ', '');
                if (!token) {
                    this.logger.warn(`Client ${client.id} connected without token`);
                    client.disconnect();
                    return;
                }
                // Verify JWT token
                const payload = await this.jwtService.verifyAsync(token);
                client.userId = payload.sub;
                // Store connection
                this.connectedUsers.set(client.userId, client.id);
                this.logger.log(`User ${client.userId} connected with socket ${client.id}`);
                // Emit connection success
                client.emit('connected', { userId: client.userId });
                // Join user to their personal room
                client.join(`user:${client.userId}`);
            }
            catch (error) {
                this.logger.error(`Connection error: ${error.message}`);
                client.emit('error', { message: 'Authentication failed' });
                client.disconnect();
            }
        }
        handleDisconnect(client) {
            if (client.userId) {
                this.connectedUsers.delete(client.userId);
                this.logger.log(`User ${client.userId} disconnected`);
            }
        }
        async handleSendMessage(client, data) {
            try {
                if (!client.userId) {
                    client.emit('error', { message: 'Not authenticated' });
                    return;
                }
                // Create message via service
                const message = await this.messagingService.sendMessage(client.userId, data.receiverId, data.content, data.listingId);
                // Emit to sender (confirmation)
                client.emit('message_sent', message);
                // Emit to receiver if online
                const receiverSocketId = this.connectedUsers.get(data.receiverId);
                if (receiverSocketId) {
                    this.server.to(receiverSocketId).emit('new_message', message);
                }
                // Emit to receiver's room (handles multiple devices)
                this.server.to(`user:${data.receiverId}`).emit('new_message', message);
                this.logger.log(`Message sent from ${client.userId} to ${data.receiverId}`);
            }
            catch (error) {
                this.logger.error(`Send message error: ${error.message}`);
                client.emit('error', { message: 'Failed to send message' });
            }
        }
        handleTypingStart(client, data) {
            if (!client.userId)
                return;
            const receiverSocketId = this.connectedUsers.get(data.receiverId);
            if (receiverSocketId) {
                this.server.to(receiverSocketId).emit('user_typing', {
                    userId: client.userId,
                    isTyping: true,
                });
            }
        }
        handleTypingStop(client, data) {
            if (!client.userId)
                return;
            const receiverSocketId = this.connectedUsers.get(data.receiverId);
            if (receiverSocketId) {
                this.server.to(receiverSocketId).emit('user_typing', {
                    userId: client.userId,
                    isTyping: false,
                });
            }
        }
        async handleMarkRead(client, data) {
            try {
                if (!client.userId)
                    return;
                await this.messagingService.markAsRead(data.conversationId, client.userId);
                // Notify sender that messages were read
                const conversation = await this.messagingService.getConversationById(data.conversationId, client.userId);
                const otherUserId = conversation.participant1_id === client.userId
                    ? conversation.participant2_id
                    : conversation.participant1_id;
                const senderSocketId = this.connectedUsers.get(otherUserId);
                if (senderSocketId) {
                    this.server.to(senderSocketId).emit('messages_read', {
                        conversationId: data.conversationId,
                        readBy: client.userId,
                    });
                }
            }
            catch (error) {
                this.logger.error(`Mark read error: ${error.message}`);
            }
        }
        handleJoinConversation(client, data) {
            if (!client.userId)
                return;
            client.join(`conversation:${data.conversationId}`);
            this.logger.log(`User ${client.userId} joined conversation ${data.conversationId}`);
        }
        handleLeaveConversation(client, data) {
            if (!client.userId)
                return;
            client.leave(`conversation:${data.conversationId}`);
            this.logger.log(`User ${client.userId} left conversation ${data.conversationId}`);
        }
        // Helper method to emit events to specific users
        emitToUser(userId, event, data) {
            this.server.to(`user:${userId}`).emit(event, data);
        }
        // Helper method to check if user is online
        isUserOnline(userId) {
            return this.connectedUsers.has(userId);
        }
        // Get online users count
        getOnlineUsersCount() {
            return this.connectedUsers.size;
        }
    };
    __setFunctionName(_classThis, "MessagingGateway");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleSendMessage_decorators = [(0, websockets_1.SubscribeMessage)('send_message')];
        _handleTypingStart_decorators = [(0, websockets_1.SubscribeMessage)('typing_start')];
        _handleTypingStop_decorators = [(0, websockets_1.SubscribeMessage)('typing_stop')];
        _handleMarkRead_decorators = [(0, websockets_1.SubscribeMessage)('mark_read')];
        _handleJoinConversation_decorators = [(0, websockets_1.SubscribeMessage)('join_conversation')];
        _handleLeaveConversation_decorators = [(0, websockets_1.SubscribeMessage)('leave_conversation')];
        __esDecorate(_classThis, null, _handleSendMessage_decorators, { kind: "method", name: "handleSendMessage", static: false, private: false, access: { has: obj => "handleSendMessage" in obj, get: obj => obj.handleSendMessage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleTypingStart_decorators, { kind: "method", name: "handleTypingStart", static: false, private: false, access: { has: obj => "handleTypingStart" in obj, get: obj => obj.handleTypingStart }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleTypingStop_decorators, { kind: "method", name: "handleTypingStop", static: false, private: false, access: { has: obj => "handleTypingStop" in obj, get: obj => obj.handleTypingStop }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMarkRead_decorators, { kind: "method", name: "handleMarkRead", static: false, private: false, access: { has: obj => "handleMarkRead" in obj, get: obj => obj.handleMarkRead }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleJoinConversation_decorators, { kind: "method", name: "handleJoinConversation", static: false, private: false, access: { has: obj => "handleJoinConversation" in obj, get: obj => obj.handleJoinConversation }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLeaveConversation_decorators, { kind: "method", name: "handleLeaveConversation", static: false, private: false, access: { has: obj => "handleLeaveConversation" in obj, get: obj => obj.handleLeaveConversation }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: obj => "server" in obj, get: obj => obj.server, set: (obj, value) => { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessagingGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessagingGateway = _classThis;
})();
exports.MessagingGateway = MessagingGateway;
