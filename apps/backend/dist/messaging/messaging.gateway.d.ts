import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { MessagingService } from './messaging.service';
interface AuthenticatedSocket extends Socket {
    userId?: number;
}
export declare class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private readonly messagingService;
    server: Server;
    private readonly logger;
    private readonly connectedUsers;
    constructor(jwtService: JwtService, messagingService: MessagingService);
    handleConnection(client: AuthenticatedSocket): Promise<void>;
    handleDisconnect(client: AuthenticatedSocket): void;
    handleSendMessage(client: AuthenticatedSocket, data: {
        receiverId: number;
        content: string;
        listingId?: number;
    }): Promise<void>;
    handleTypingStart(client: AuthenticatedSocket, data: {
        receiverId: number;
    }): void;
    handleTypingStop(client: AuthenticatedSocket, data: {
        receiverId: number;
    }): void;
    handleMarkRead(client: AuthenticatedSocket, data: {
        conversationId: number;
    }): Promise<void>;
    handleJoinConversation(client: AuthenticatedSocket, data: {
        conversationId: number;
    }): void;
    handleLeaveConversation(client: AuthenticatedSocket, data: {
        conversationId: number;
    }): void;
    emitToUser(userId: number, event: string, data: any): void;
    isUserOnline(userId: number): boolean;
    getOnlineUsersCount(): number;
}
export {};
