import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { AdminService } from './admin.service';
import {
  ListUsersDto,
  UpdateUserStatusDto,
  UpdateUserRoleDto,
  AdminUpdateUserDto,
  ListListingsDto,
  ModerationActionDto,
  VerifyListingDto,
  FeatureListingDto,
  AnalyticsQueryDto,
} from './dto/admin.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ============ User Management ============

  @Get('users')
  async listUsers(@Query() dto: ListUsersDto) {
    return this.adminService.listUsers(dto);
  }

  @Get('users/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getUserById(id);
  }

  @Patch('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AdminUpdateUserDto,
  ) {
    return this.adminService.updateUser(id, dto);
  }

  @Patch('users/:id/status')
  async updateUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserStatusDto,
    @GetUser('id') adminId: number,
  ) {
    return this.adminService.updateUserStatus(id, dto, adminId);
  }

  @Patch('users/:id/role')
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserRoleDto,
    @GetUser('id') adminId: number,
  ) {
    return this.adminService.updateUserRole(id, dto, adminId);
  }

  @Delete('users/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') adminId: number,
  ) {
    return this.adminService.deleteUser(id, adminId);
  }

  // ============ Listing Moderation ============

  @Get('listings')
  async listListings(@Query() dto: ListListingsDto) {
    return this.adminService.listListings(dto);
  }

  @Get('listings/:id')
  async getListingById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getListingById(id);
  }

  @Post('listings/:id/moderate')
  async moderateListing(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ModerationActionDto,
    @GetUser('id') adminId: number,
  ) {
    return this.adminService.moderateListing(id, dto, adminId);
  }

  @Post('listings/:id/verify')
  async verifyListing(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: VerifyListingDto,
  ) {
    return this.adminService.verifyListing(id, dto);
  }

  @Post('listings/:id/feature')
  async featureListing(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: FeatureListingDto,
  ) {
    return this.adminService.featureListing(id, dto);
  }

  @Delete('listings/:id')
  async deleteListing(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteListing(id);
  }

  // ============ Analytics ============

  @Get('analytics/overview')
  async getPlatformOverview() {
    return this.adminService.getPlatformOverview();
  }

  @Get('analytics/users')
  async getUserGrowthStats(@Query() dto: AnalyticsQueryDto) {
    return this.adminService.getUserGrowthStats(dto);
  }

  @Get('analytics/listings')
  async getListingStats(@Query() dto: AnalyticsQueryDto) {
    return this.adminService.getListingStats(dto);
  }

  @Get('analytics/cities')
  async getCityStats() {
    return this.adminService.getCityStats();
  }

  @Get('analytics/activity')
  async getRecentActivity(@Query('limit') limit?: number) {
    return this.adminService.getRecentActivity(limit || 20);
  }
}
