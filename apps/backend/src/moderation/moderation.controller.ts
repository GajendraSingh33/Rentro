import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ModerationService } from './moderation.service';

class RejectDto {
  reason: string;
}

class FlagDto {
  reason: string;
}

@Controller('admin/moderation')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Get('pending')
  async getPendingListings(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return await this.moderationService.getPendingListings(page, limit);
  }

  @Post('listings/:id/approve')
  async approveListing(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    return await this.moderationService.approveListing(id, req.user.id);
  }

  @Post('listings/:id/reject')
  async rejectListing(
    @Param('id', ParseIntPipe) id: number,
    @Body() rejectDto: RejectDto,
    @Request() req: any,
  ) {
    return await this.moderationService.rejectListing(id, req.user.id, rejectDto.reason);
  }

  @Post('listings/:id/flag')
  async flagListing(
    @Param('id', ParseIntPipe) id: number,
    @Body() flagDto: FlagDto,
  ) {
    return await this.moderationService.flagListing(id, flagDto.reason);
  }

  @Post('listings/:id/unflag')
  async unflagListing(@Param('id', ParseIntPipe) id: number) {
    return await this.moderationService.unflagListing(id);
  }

  @Get('stats')
  async getStats() {
    return await this.moderationService.getModerationStats();
  }
}
