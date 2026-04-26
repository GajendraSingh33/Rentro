import { AnalyticsService } from '../analytics/analytics.service';
export declare class DashboardController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getOverview(req: any): Promise<any>;
    getTopListings(req: any): Promise<any[]>;
    getViewsOverTime(req: any): Promise<any[]>;
    getInquiriesOverTime(req: any): Promise<any[]>;
}
