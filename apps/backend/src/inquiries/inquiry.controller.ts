import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto, UpdateInquiryStatusDto, RespondInquiryDto, InquiryFilterDto } from './dto/inquiry.dto';

@Controller('inquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post()
  @Roles('SEEKER')
  async createInquiry(@Body() createDto: CreateInquiryDto, @Request() req: any) {
    return await this.inquiryService.createInquiry(req.user.id, createDto);
  }

  @Get()
  async getInquiries(@Query() filterDto: InquiryFilterDto, @Request() req: any) {
    const userId = req.user.id;
    const role = req.user.role;
    
    if (role === 'OWNER') {
      return await this.inquiryService.getOwnerInquiries(userId, filterDto);
    } else {
      return await this.inquiryService.getSeekerInquiries(userId, filterDto);
    }
  }

  @Get(':id')
  async getInquiry(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const inquiry = await this.inquiryService.getInquiryById(id);
    
    // Check access
    if (req.user.id !== inquiry.seeker_id && req.user.id !== inquiry.owner_id) {
      throw new ForbiddenException('Not authorized to view this inquiry');
    }
    
    // Mark as viewed if owner viewing
    if (req.user.id === inquiry.owner_id && inquiry.status === 'new') {
      await this.inquiryService.updateStatus(id, { status: 'viewed' });
    }
    
    return inquiry;
  }

  @Patch(':id/status')
  @Roles('OWNER')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateInquiryStatusDto,
    @Request() req: any,
  ) {
    const inquiry = await this.inquiryService.getInquiryById(id);
    if (inquiry.owner_id !== req.user.id) {
      throw new ForbiddenException('Not authorized');
    }
    return await this.inquiryService.updateStatus(id, updateDto);
  }

  @Post(':id/respond')
  @Roles('OWNER')
  async respondToInquiry(
    @Param('id', ParseIntPipe) id: number,
    @Body() respondDto: RespondInquiryDto,
    @Request() req: any,
  ) {
    const inquiry = await this.inquiryService.getInquiryById(id);
    if (inquiry.owner_id !== req.user.id) {
      throw new ForbiddenException('Not authorized');
    }
    return await this.inquiryService.respondToInquiry(id, respondDto.response_message);
  }

  @Get('stats/owner')
  @Roles('OWNER')
  async getOwnerStats(@Request() req: any) {
    return await this.inquiryService.getOwnerInquiryStats(req.user.id);
  }

  @Post(':id/reveal-contact')
  @Roles('OWNER')
  async revealContact(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const inquiry = await this.inquiryService.getInquiryById(id);
    if (inquiry.owner_id !== req.user.id) {
      throw new ForbiddenException('Not authorized');
    }
    return await this.inquiryService.revealContact(id);
  }
}
