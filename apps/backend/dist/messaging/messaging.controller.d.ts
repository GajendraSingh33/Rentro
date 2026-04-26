import { MessagingService } from './messaging.service';
import { SendMessageDto, GetMessagesDto, GetConversationsDto, BlockConversationDto } from './dto/messaging.dto';
export declare class MessagingController {
    private readonly messagingService;
    constructor(messagingService: MessagingService);
    sendMessage(req: any, dto: SendMessageDto): Promise<{
        success: boolean;
        message: string;
        data: import("../typeorm/entities").Message;
    }>;
    getConversations(req: any, dto: GetConversationsDto): Promise<{
        data: {
            other_user: import("../typeorm/entities").User | null;
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
    getMessages(req: any, conversationId: number, dto: GetMessagesDto): Promise<{
        data: import("../typeorm/entities").Message[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    markAsRead(req: any, messageId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    markAllAsRead(req: any, conversationId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteMessage(req: any, messageId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    blockConversation(req: any, conversationId: number, dto: BlockConversationDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getUnreadCount(req: any): Promise<{
        success: boolean;
        data: {
            unread_count: number;
        };
    }>;
}
