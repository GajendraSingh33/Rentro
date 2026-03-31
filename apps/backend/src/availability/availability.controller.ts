import {
  Controller,
  Get,
  Put,
  Patch,
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
import { AvailabilityService } from './availability.service';
import { AvailabilityStatus } from '../typeorm/entities/availability.entity';

class UpdateAvailabilityDto {
  available_beds_in_room?: number;
  status?: AvailabilityStatus;
  price_per_bed?: number;
  notes?: string;
}

class BulkUpdateDto {
  updates: Array<{
    room_number: string;
    available_beds_in_room: number;
    status: AvailabilityStatus;
  }>;
}

class CreateRoomDto {
  room_number: string;
  total_beds: number;
}

@Controller('listings/:listingId/availability')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get()
  async getAvailability(@Param('listingId', ParseIntPipe) listingId: number) {
    return await this.availabilityService.getAvailability(listingId);
  }

  @Put(':roomNumber')
  @Roles('OWNER')
  async updateAvailability(
    @Param('listingId', ParseIntPipe) listingId: number,
    @Param('roomNumber') roomNumber: string,
    @Body() updateDto: UpdateAvailabilityDto,
  ) {
    return await this.availabilityService.updateAvailability(listingId, roomNumber, updateDto);
  }

  @Patch('bulk')
  @Roles('OWNER')
  async bulkUpdateAvailability(
    @Param('listingId', ParseIntPipe) listingId: number,
    @Body() bulkDto: BulkUpdateDto,
  ) {
    return await this.availabilityService.bulkUpdateAvailability(listingId, bulkDto.updates);
  }

  @Put('rooms')
  @Roles('OWNER')
  async createRoom(
    @Param('listingId', ParseIntPipe) listingId: number,
    @Body() createDto: CreateRoomDto,
  ) {
    return await this.availabilityService.createRoomAvailability(
      listingId,
      createDto.room_number,
      createDto.total_beds,
    );
  }
}
