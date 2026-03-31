import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../typeorm/entities/user.entity';
import { ListingService } from './listing.service';
import {
  CreateListingDto,
  UpdateListingDto,
  ListingFilterDto,
  UpdateListingStatusDto,
} from './dto/listing.dto';

@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  /**
   * Create a new listing
   * POST /listings
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  async createListing(
    @Body() createListingDto: CreateListingDto,
    @Request() req,
  ) {
    return await this.listingService.createListing(
      createListingDto,
      req.user.id,
    );
  }

  /**
   * Get all listings (public, filtered, paginated)
   * GET /listings
   */
  @Get()
  async getListings(@Query() filterDto: ListingFilterDto) {
    return await this.listingService.getListings(filterDto);
  }

  /**
   * Get a single listing by ID
   * GET /listings/:id
   */
  @Get(':id')
  async getListingById(@Param('id', ParseIntPipe) id: number) {
    return await this.listingService.getListingById(id);
  }

  /**
   * Get all listings for the authenticated owner
   * GET /listings/owner/me
   */
  @Get('owner/me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  async getMyListings(@Request() req) {
    return await this.listingService.getOwnerListings(req.user.id);
  }

  /**
   * Update a listing
   * PUT /listings/:id
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  async updateListing(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListingDto: UpdateListingDto,
    @Request() req,
  ) {
    return await this.listingService.updateListing(
      id,
      updateListingDto,
      req.user.id,
    );
  }

  /**
   * Delete a listing
   * DELETE /listings/:id
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteListing(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    await this.listingService.deleteListing(id, req.user.id);
  }

  /**
   * Update listing status
   * PATCH /listings/:id/status
   */
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  async updateListingStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateListingStatusDto,
    @Request() req,
  ) {
    return await this.listingService.toggleListingStatus(
      id,
      statusDto,
      req.user.id,
    );
  }

  /**
   * Submit listing for approval
   * POST /listings/:id/submit
   */
  @Post(':id/submit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  async submitForApproval(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return await this.listingService.submitForApproval(id, req.user.id);
  }

  /**
   * Approve a listing (Admin/Moderator only)
   * POST /listings/:id/approve
   */
  @Post(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async approveListing(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return await this.listingService.approveListing(id, req.user.id);
  }

  /**
   * Reject a listing (Admin/Moderator only)
   * POST /listings/:id/reject
   */
  @Post(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async rejectListing(
    @Param('id', ParseIntPipe) id: number,
    @Body('reason') reason: string,
  ) {
    return await this.listingService.rejectListing(id, reason);
  }
}
