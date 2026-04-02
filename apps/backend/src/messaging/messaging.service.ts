import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message, Conversation, MessageStatus, MessageType, User } from '../typeorm/entities';
import { SendMessageDto, GetMessagesDto, GetConversationsDto } from './dto/messaging.dto';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async sendMessage(senderId: number, dto: SendMessageDto): Promise<Message> {
    // Verify receiver exists
    const receiver = await this.userRepository.findOne({ where: { id: dto.receiver_id } });
    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }

    // Prevent sending message to self
    if (senderId === dto.receiver_id) {
      throw new BadRequestException('Cannot send message to yourself');
    }

    // Find or create conversation
    let conversation = await this.findOrCreateConversation(senderId, dto.receiver_id, dto.listing_id);

    // Check if conversation is blocked
    if (conversation.is_blocked) {
      throw new ForbiddenException('This conversation is blocked');
    }

    // Create message
    const message = this.messageRepository.create({
      conversation_id: conversation.id,
      sender_id: senderId,
      receiver_id: dto.receiver_id,
      listing_id: dto.listing_id,
      content: dto.content,
      message_type: dto.message_type || MessageType.TEXT,
      attachment_url: dto.attachment_url,
      status: MessageStatus.SENT,
    });

    const savedMessage = await this.messageRepository.save(message);

    // Update conversation
    await this.updateConversation(conversation.id, senderId, dto.content);

    return savedMessage;
  }

  private async findOrCreateConversation(
    user1Id: number,
    user2Id: number,
    listingId?: number,
  ): Promise<Conversation> {
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

  private async updateConversation(conversationId: number, senderId: number, lastMessage: string): Promise<void> {
    const conversation = await this.conversationRepository.findOne({ where: { id: conversationId } });
    
    if (!conversation) return;

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

  async getConversations(userId: number, dto: GetConversationsDto) {
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
    const enrichedConversations = await Promise.all(
      conversations.map(async (conv) => {
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
      }),
    );

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

  async getMessages(userId: number, dto: GetMessagesDto) {
    const page = dto.page || 1;
    const limit = dto.limit || 50;
    const skip = (page - 1) * limit;

    if (!dto.conversation_id) {
      throw new BadRequestException('conversation_id is required');
    }

    // Verify user is participant
    const conversation = await this.conversationRepository.findOne({
      where: { id: dto.conversation_id },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (conversation.participant1_id !== userId && conversation.participant2_id !== userId) {
      throw new ForbiddenException('You are not a participant in this conversation');
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

  async markAsRead(userId: number, messageId: number): Promise<void> {
    const message = await this.messageRepository.findOne({ where: { id: messageId } });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.receiver_id !== userId) {
      throw new ForbiddenException('You can only mark your own messages as read');
    }

    if (!message.read_at) {
      await this.messageRepository.update(messageId, {
        status: MessageStatus.READ,
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

  async markAllAsRead(userId: number, conversationId: number): Promise<void> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (conversation.participant1_id !== userId && conversation.participant2_id !== userId) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }

    // Mark all unread messages as read
    await this.messageRepository
      .createQueryBuilder()
      .update(Message)
      .set({ status: MessageStatus.READ, read_at: new Date() })
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

  async deleteMessage(userId: number, messageId: number): Promise<void> {
    const message = await this.messageRepository.findOne({ where: { id: messageId } });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    // Soft delete for sender or receiver
    if (message.sender_id === userId) {
      await this.messageRepository.update(messageId, { is_deleted_by_sender: true });
    } else if (message.receiver_id === userId) {
      await this.messageRepository.update(messageId, { is_deleted_by_receiver: true });
    } else {
      throw new ForbiddenException('You can only delete your own messages');
    }

    // If both deleted, hard delete
    const updated = await this.messageRepository.findOne({ where: { id: messageId } });
    if (updated && updated.is_deleted_by_sender && updated.is_deleted_by_receiver) {
      await this.messageRepository.delete(messageId);
    }
  }

  async blockConversation(userId: number, conversationId: number, block: boolean): Promise<void> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (conversation.participant1_id !== userId && conversation.participant2_id !== userId) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }

    await this.conversationRepository.update(conversationId, {
      is_blocked: block,
      blocked_by: block ? userId : null,
    });
  }

  async getTotalUnreadCount(userId: number): Promise<number> {
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
}
