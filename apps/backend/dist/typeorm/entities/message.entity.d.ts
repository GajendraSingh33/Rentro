import { User } from './user.entity';
import { PGListing } from './pg-listing.entity';
export declare enum MessageType {
    TEXT = "text",
    IMAGE = "image",
    FILE = "file",
    SYSTEM = "system"
}
export declare enum MessageStatus {
    SENT = "sent",
    DELIVERED = "delivered",
    READ = "read"
}
export declare class Message {
    id: number;
    conversation_id: number;
    sender_id: number;
    sender: User;
    receiver_id: number;
    receiver: User;
    listing_id: number;
    listing: PGListing;
    content: string;
    message_type: MessageType;
    status: MessageStatus;
    attachment_url: string;
    read_at: Date;
    is_deleted_by_sender: boolean;
    is_deleted_by_receiver: boolean;
    created_at: Date;
    updated_at: Date;
}
