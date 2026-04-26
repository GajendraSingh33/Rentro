import { SeekerDashboardService } from './seeker-dashboard.service';
import { SeekerDashboardOverviewDto, DashboardQueryDto, InquiryHistoryListDto } from './dto/seeker-dashboard.dto';
export declare class SeekerDashboardController {
    private readonly dashboardService;
    constructor(dashboardService: SeekerDashboardService);
    /**
     * Get dashboard overview
     * GET /seeker/dashboard/overview
     */
    getDashboardOverview(userId: number): Promise<SeekerDashboardOverviewDto>;
    /**
     * Get inquiry history
     * GET /seeker/dashboard/inquiries
     */
    getInquiryHistory(userId: number, query: DashboardQueryDto): Promise<InquiryHistoryListDto>;
    /**
     * Get inquiry statistics
     * GET /seeker/dashboard/inquiry-stats
     */
    getInquiryStats(userId: number): Promise<{
        total: number;
        pending: number;
        viewed: number;
        responded: number;
        rejected: number;
    }>;
    /**
     * Get activity timeline
     * GET /seeker/dashboard/activity
     */
    getActivityTimeline(userId: number, limit?: string): Promise<{
        activities: Array<{
            type: 'favorite' | 'inquiry' | 'review' | 'inquiry_response';
            title: string;
            description: string;
            listing_id: number | null;
            created_at: Date;
        }>;
    }>;
}
