import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { MessageType } from '../../typeorm/entities';

export class SendMessageDto {
  @IsNotEmpty()
  @IsNumber()
  receiver_id: number;

  @IsOptional()
  @IsNumber()
  listing_id?: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(MessageType)
  message_type?: MessageType;

  @IsOptional()
  @IsString()
  attachment_url?: string;
}

export class GetMessagesDto {
  @IsOptional()
  @IsNumber()
  conversation_id?: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}

export class MarkAsReadDto {
  @IsNotEmpty()
  @IsNumber()
  message_id: number;
}

export class GetConversationsDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}

export class BlockConversationDto {
  @IsNotEmpty()
  @IsNumber()
  conversation_id: number;

  @IsNotEmpty()
  block: boolean;
}
