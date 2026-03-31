import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ContactService } from './contact.service';

class UpdateContactDto {
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  whatsapp_number?: string;
}

@Controller('contact')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('listing/:id')
  async getListingContact(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    // Only owners can see full contact info
    const revealed = req.user.role === 'OWNER';
    return await this.contactService.getListingContact(id, revealed);
  }

  @Get('listing/:id/reveal')
  async revealListingContact(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    // Track contact reveal for analytics
    return await this.contactService.getListingContact(id, true);
  }

  @Put('listing/:id')
  @Roles('OWNER')
  async updateListingContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateContactDto,
  ) {
    return await this.contactService.updateListingContact(id, updateDto);
  }
}
