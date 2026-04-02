import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MessagingService } from './messaging.service';
import {
  SendMessageDto,
  GetMessagesDto,
  GetConversationsDto,
  MarkAsReadDto,
  BlockConversationDto,
} from './dto/messaging.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post()
  async sendMessage(@Request() req, @Body() dto: SendMessageDto) {
    const message = await this.messagingService.sendMessage(req.user.id, dto);
    return {
      success: true,
      message: 'Message sent successfully',
      data: message,
    };
  }

  @Get('conversations')
  async getConversations(@Request() req, @Query() dto: GetConversationsDto) {
    return this.messagingService.getConversations(req.user.id, dto);
  }

  @Get('conversations/:conversationId')
  async getMessages(
    @Request() req,
    @Param('conversationId') conversationId: number,
    @Query() dto: GetMessagesDto,
  ) {
    return this.messagingService.getMessages(req.user.id, {
      ...dto,
      conversation_id: conversationId,
    });
  }

  @Put(':id/read')
  async markAsRead(@Request() req, @Param('id') messageId: number) {
    await this.messagingService.markAsRead(req.user.id, messageId);
    return {
      success: true,
      message: 'Message marked as read',
    };
  }

  @Put('conversations/:id/read-all')
  async markAllAsRead(@Request() req, @Param('id') conversationId: number) {
    await this.messagingService.markAllAsRead(req.user.id, conversationId);
    return {
      success: true,
      message: 'All messages marked as read',
    };
  }

  @Delete(':id')
  async deleteMessage(@Request() req, @Param('id') messageId: number) {
    await this.messagingService.deleteMessage(req.user.id, messageId);
    return {
      success: true,
      message: 'Message deleted successfully',
    };
  }

  @Post('conversations/:id/block')
  async blockConversation(
    @Request() req,
    @Param('id') conversationId: number,
    @Body() dto: BlockConversationDto,
  ) {
    await this.messagingService.blockConversation(req.user.id, conversationId, dto.block);
    return {
      success: true,
      message: dto.block ? 'Conversation blocked' : 'Conversation unblocked',
    };
  }

  @Get('unread-count')
  async getUnreadCount(@Request() req) {
    const count = await this.messagingService.getTotalUnreadCount(req.user.id);
    return {
      success: true,
      data: { unread_count: count },
    };
  }
}
