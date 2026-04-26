import { Repository } from 'typeorm';
import { Message, Conversation, User } from '../typeorm/entities';
import { SendMessageDto, GetMessagesDto, GetConversationsDto } from './dto/messaging.dto';
export declare class MessagingService {
    private messageRepository;
    private conversationRepository;
    private userRepository;
    constructor(messageRepository: Repository<Message>, conversationRepository: Repository<Conversation>, userRepository: Repository<User>);
    sendMessage(senderId: number, dto: SendMessageDto): Promise<Message>;
    private findOrCreateConversation;
    private updateConversation;
    getConversations(userId: number, dto: GetConversationsDto): Promise<{
        data: {
            other_user: User | null;
            unread_count: number;
            id: number;
            participant1_id: number;
            participant2_id: number;
            listing_id: number;
            last_message: string;
            last_message_at: Date;
            last_sender_id: number;
            unread_count_p1: number;
            unread_count_p2: number;
            is_blocked: boolean;
            blocked_by: number;
            created_at: Date;
            updated_at: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    getMessages(userId: number, dto: GetMessagesDto): Promise<{
        data: Message[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    markAsRead(userId: number, messageId: number): Promise<void>;
    markAllAsRead(userId: number, conversationId: number): Promise<void>;
    deleteMessage(userId: number, messageId: number): Promise<void>;
    blockConversation(userId: number, conversationId: number, block: boolean): Promise<void>;
    getTotalUnreadCount(userId: number): Promise<number>;
    getConversationById(conversationId: number, userId: number): Promise<Conversation>;
}
