import {
  Controller,
  Get,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SeekerDashboardService } from './seeker-dashboard.service';
import {
  SeekerDashboardOverviewDto,
  DashboardQueryDto,
  InquiryHistoryListDto,
} from './dto/seeker-dashboard.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('seeker/dashboard')
@UseGuards(JwtAuthGuard)
export class SeekerDashboardController {
  constructor(private readonly dashboardService: SeekerDashboardService) {}

  /**
   * Get dashboard overview
   * GET /seeker/dashboard/overview
   */
  @Get('overview')
  @HttpCode(HttpStatus.OK)
  async getDashboardOverview(
    @GetUser('id') userId: number,
  ): Promise<SeekerDashboardOverviewDto> {
    return this.dashboardService.getDashboardOverview(userId);
  }

  /**
   * Get inquiry history
   * GET /seeker/dashboard/inquiries
   */
  @Get('inquiries')
  @HttpCode(HttpStatus.OK)
  async getInquiryHistory(
    @GetUser('id') userId: number,
    @Query() query: DashboardQueryDto,
  ): Promise<InquiryHistoryListDto> {
    return this.dashboardService.getInquiryHistory(userId, query);
  }

  /**
   * Get inquiry statistics
   * GET /seeker/dashboard/inquiry-stats
   */
  @Get('inquiry-stats')
  @HttpCode(HttpStatus.OK)
  async getInquiryStats(@GetUser('id') userId: number): Promise<{
    total: number;
    pending: number;
    viewed: number;
    responded: number;
    rejected: number;
  }> {
    return this.dashboardService.getInquiryStats(userId);
  }

  /**
   * Get activity timeline
   * GET /seeker/dashboard/activity
   */
  @Get('activity')
  @HttpCode(HttpStatus.OK)
  async getActivityTimeline(
    @GetUser('id') userId: number,
    @Query('limit') limit?: string,
  ): Promise<{
    activities: Array<{
      type: 'favorite' | 'inquiry' | 'review' | 'inquiry_response';
      title: string;
      description: string;
      listing_id: number | null;
      created_at: Date;
    }>;
  }> {
    const activities = await this.dashboardService.getActivityTimeline(
      userId,
      limit ? parseInt(limit) : 20,
    );
    return { activities };
  }
}
