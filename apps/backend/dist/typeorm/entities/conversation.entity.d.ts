export declare class Conversation {
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
}
