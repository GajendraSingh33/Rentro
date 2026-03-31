import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AnalyticsService } from '../analytics/analytics.service';

@Controller('owner/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER')
export class DashboardController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  async getOverview(@Request() req: any) {
    return await this.analyticsService.getOwnerDashboardOverview(req.user.id);
  }

  @Get('top-listings')
  async getTopListings(@Request() req: any) {
    return await this.analyticsService.getTopPerformingListings(req.user.id, 5);
  }

  @Get('views-over-time')
  async getViewsOverTime(@Request() req: any) {
    return await this.analyticsService.getViewsOverTime(req.user.id, 30);
  }

  @Get('inquiries-over-time')
  async getInquiriesOverTime(@Request() req: any) {
    return await this.analyticsService.getInquiriesOverTime(req.user.id, 30);
  }
}
