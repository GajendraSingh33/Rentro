import { MessageType } from '../../typeorm/entities';
export declare class SendMessageDto {
    receiver_id: number;
    listing_id?: number;
    content: string;
    message_type?: MessageType;
    attachment_url?: string;
}
export declare class GetMessagesDto {
    conversation_id?: number;
    page?: number;
    limit?: number;
}
export declare class MarkAsReadDto {
    message_id: number;
}
export declare class GetConversationsDto {
    page?: number;
    limit?: number;
}
export declare class BlockConversationDto {
    conversation_id: number;
    block: boolean;
}
