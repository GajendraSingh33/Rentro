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
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../typeorm/entities");
let MessagingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MessagingService = _classThis = class {
        constructor(messageRepository, conversationRepository, userRepository) {
            this.messageRepository = messageRepository;
            this.conversationRepository = conversationRepository;
            this.userRepository = userRepository;
        }
        async sendMessage(senderId, dto) {
            // Verify receiver exists
            const receiver = await this.userRepository.findOne({ where: { id: dto.receiver_id } });
            if (!receiver) {
                throw new common_1.NotFoundException('Receiver not found');
            }
            // Prevent sending message to self
            if (senderId === dto.receiver_id) {
                throw new common_1.BadRequestException('Cannot send message to yourself');
            }
            // Find or create conversation
            let conversation = await this.findOrCreateConversation(senderId, dto.receiver_id, dto.listing_id);
            // Check if conversation is blocked
            if (conversation.is_blocked) {
                throw new common_1.ForbiddenException('This conversation is blocked');
            }
            // Create message
            const message = this.messageRepository.create({
                conversation_id: conversation.id,
                sender_id: senderId,
                receiver_id: dto.receiver_id,
                listing_id: dto.listing_id,
                content: dto.content,
                message_type: dto.message_type || entities_1.MessageType.TEXT,
                attachment_url: dto.attachment_url,
                status: entities_1.MessageStatus.SENT,
            });
            const savedMessage = await this.messageRepository.save(message);
            // Update conversation
            await this.updateConversation(conversation.id, senderId, dto.content);
            return savedMessage;
        }
        async findOrCreateConversation(user1Id, user2Id, listingId) {
            // Sort user IDs to ensure consistent lookup
            const [p1, p2] = user1Id < user2Id ? [user1Id, user2Id] : [user2Id, user1Id];
            let conversation = await this.conversationRepository.findOne({
                where: { participant1_id: p1, participant2_id: p2 },
            });
            if (!conversation) {
                conversation = this.conversationRepository.create({
                    participant1_id: p1,
                    participant2_id: p2,
                    listing_id: listingId,
                });
                conversation = await this.conversationRepository.save(conversation);
            }
            return conversation;
        }
        async updateConversation(conversationId, senderId, lastMessage) {
            const conversation = await this.conversationRepository.findOne({ where: { id: conversationId } });
            if (!conversation)
                return;
            // Increment unread count for receiver
            const isParticipant1 = senderId === conversation.participant1_id;
            await this.conversationRepository.update(conversationId, {
                last_message: lastMessage.substring(0, 100), // Truncate for display
                last_message_at: new Date(),
                last_sender_id: senderId,
                unread_count_p1: isParticipant1 ? conversation.unread_count_p1 : conversation.unread_count_p1 + 1,
                unread_count_p2: isParticipant1 ? conversation.unread_count_p2 + 1 : conversation.unread_count_p2,
                updated_at: new Date(),
            });
        }
        async getConversations(userId, dto) {
            const page = dto.page || 1;
            const limit = dto.limit || 20;
            const skip = (page - 1) * limit;
            const queryBuilder = this.conversationRepository
                .createQueryBuilder('conversation')
                .where('conversation.participant1_id = :userId OR conversation.participant2_id = :userId', { userId })
                .orderBy('conversation.updated_at', 'DESC')
                .skip(skip)
                .take(limit);
            const [conversations, total] = await queryBuilder.getManyAndCount();
            // Enrich with participant info
            const enrichedConversations = await Promise.all(conversations.map(async (conv) => {
                const otherUserId = conv.participant1_id === userId ? conv.participant2_id : conv.participant1_id;
                const otherUser = await this.userRepository.findOne({
                    where: { id: otherUserId },
                    select: ['id', 'name', 'email', 'profile_photo'],
                });
                const unreadCount = conv.participant1_id === userId ? conv.unread_count_p1 : conv.unread_count_p2;
                return {
                    ...conv,
                    other_user: otherUser,
                    unread_count: unreadCount,
                };
            }));
            return {
                data: enrichedConversations,
                meta: {
                    total,
                    page,
                    limit,
                    total_pages: Math.ceil(total / limit),
                },
            };
        }
        async getMessages(userId, dto) {
            const page = dto.page || 1;
            const limit = dto.limit || 50;
            const skip = (page - 1) * limit;
            if (!dto.conversation_id) {
                throw new common_1.BadRequestException('conversation_id is required');
            }
            // Verify user is participant
            const conversation = await this.conversationRepository.findOne({
                where: { id: dto.conversation_id },
            });
            if (!conversation) {
                throw new common_1.NotFoundException('Conversation not found');
            }
            if (conversation.participant1_id !== userId && conversation.participant2_id !== userId) {
                throw new common_1.ForbiddenException('You are not a participant in this conversation');
            }
            const queryBuilder = this.messageRepository
                .createQueryBuilder('message')
                .leftJoinAndSelect('message.sender', 'sender')
                .where('message.conversation_id = :conversationId', { conversationId: dto.conversation_id })
                .andWhere('(message.is_deleted_by_sender = false OR message.sender_id != :userId)', { userId })
                .andWhere('(message.is_deleted_by_receiver = false OR message.receiver_id != :userId)', { userId })
                .orderBy('message.created_at', 'DESC')
                .skip(skip)
                .take(limit);
            const [messages, total] = await queryBuilder.getManyAndCount();
            return {
                data: messages.reverse(), // Reverse to show oldest first
                meta: {
                    total,
                    page,
                    limit,
                    total_pages: Math.ceil(total / limit),
                },
            };
        }
        async markAsRead(userId, messageId) {
            const message = await this.messageRepository.findOne({ where: { id: messageId } });
            if (!message) {
                throw new common_1.NotFoundException('Message not found');
            }
            if (message.receiver_id !== userId) {
                throw new common_1.ForbiddenException('You can only mark your own messages as read');
            }
            if (!message.read_at) {
                await this.messageRepository.update(messageId, {
                    status: entities_1.MessageStatus.READ,
                    read_at: new Date(),
                });
                // Decrement unread count in conversation
                const conversation = await this.conversationRepository.findOne({
                    where: { id: message.conversation_id },
                });
                if (conversation) {
                    const isParticipant1 = userId === conversation.participant1_id;
                    await this.conversationRepository.update(conversation.id, {
                        unread_count_p1: isParticipant1 ? Math.max(0, conversation.unread_count_p1 - 1) : conversation.unread_count_p1,
                        unread_count_p2: isParticipant1 ? conversation.unread_count_p2 : Math.max(0, conversation.unread_count_p2 - 1),
                    });
                }
            }
        }
        async markAllAsRead(userId, conversationId) {
            const conversation = await this.conversationRepository.findOne({
                where: { id: conversationId },
            });
            if (!conversation) {
                throw new common_1.NotFoundException('Conversation not found');
            }
            if (conversation.participant1_id !== userId && conversation.participant2_id !== userId) {
                throw new common_1.ForbiddenException('You are not a participant in this conversation');
            }
            // Mark all unread messages as read
            await this.messageRepository
                .createQueryBuilder()
                .update(entities_1.Message)
                .set({ status: entities_1.MessageStatus.READ, read_at: new Date() })
                .where('conversation_id = :conversationId', { conversationId })
                .andWhere('receiver_id = :userId', { userId })
                .andWhere('read_at IS NULL')
                .execute();
            // Reset unread count
            const isParticipant1 = userId === conversation.participant1_id;
            await this.conversationRepository.update(conversationId, {
                unread_count_p1: isParticipant1 ? 0 : conversation.unread_count_p1,
                unread_count_p2: isParticipant1 ? conversation.unread_count_p2 : 0,
            });
        }
        async deleteMessage(userId, messageId) {
            const message = await this.messageRepository.findOne({ where: { id: messageId } });
            if (!message) {
                throw new common_1.NotFoundException('Message not found');
            }
            // Soft delete for sender or receiver
            if (message.sender_id === userId) {
                await this.messageRepository.update(messageId, { is_deleted_by_sender: true });
            }
            else if (message.receiver_id === userId) {
                await this.messageRepository.update(messageId, { is_deleted_by_receiver: true });
            }
            else {
                throw new common_1.ForbiddenException('You can only delete your own messages');
            }
            // If both deleted, hard delete
            const updated = await this.messageRepository.findOne({ where: { id: messageId } });
            if (updated && updated.is_deleted_by_sender && updated.is_deleted_by_receiver) {
                await this.messageRepository.delete(messageId);
            }
        }
        async blockConversation(userId, conversationId, block) {
            const conversation = await this.conversationRepository.findOne({
                where: { id: conversationId },
            });
            if (!conversation) {
                throw new common_1.NotFoundException('Conversation not found');
            }
            if (conversation.participant1_id !== userId && conversation.participant2_id !== userId) {
                throw new common_1.ForbiddenException('You are not a participant in this conversation');
            }
            await this.conversationRepository.update(conversationId, {
                is_blocked: block,
                blocked_by: block ? userId : null,
            });
        }
        async getTotalUnreadCount(userId) {
            const conversations = await this.conversationRepository.find({
                where: [
                    { participant1_id: userId },
                    { participant2_id: userId },
                ],
            });
            return conversations.reduce((total, conv) => {
                const unread = conv.participant1_id === userId ? conv.unread_count_p1 : conv.unread_count_p2;
                return total + unread;
            }, 0);
        }
        async getConversationById(conversationId, userId) {
            const conversation = await this.conversationRepository.findOne({
                where: { id: conversationId },
            });
            if (!conversation) {
                throw new common_1.NotFoundException('Conversation not found');
            }
            if (conversation.participant1_id !== userId && conversation.participant2_id !== userId) {
                throw new common_1.ForbiddenException('You are not a participant in this conversation');
            }
            return conversation;
        }
    };
    __setFunctionName(_classThis, "MessagingService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessagingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessagingService = _classThis;
})();
exports.MessagingService = MessagingService;
