import { Repository } from 'typeorm';
import { Favorite } from '../typeorm/entities/favorite.entity';
import { Inquiry } from '../typeorm/entities/inquiry.entity';
import { Review } from '../typeorm/entities/review.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { SeekerDashboardOverviewDto, DashboardQueryDto, InquiryHistoryListDto } from './dto/seeker-dashboard.dto';
export declare class SeekerDashboardService {
    private favoriteRepository;
    private inquiryRepository;
    private reviewRepository;
    private listingRepository;
    constructor(favoriteRepository: Repository<Favorite>, inquiryRepository: Repository<Inquiry>, reviewRepository: Repository<Review>, listingRepository: Repository<PGListing>);
    /**
     * Get seeker dashboard overview
     */
    getDashboardOverview(userId: number): Promise<SeekerDashboardOverviewDto>;
    /**
     * Get seeker's inquiry history
     */
    getInquiryHistory(userId: number, query: DashboardQueryDto): Promise<InquiryHistoryListDto>;
    /**
     * Get inquiry statistics
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
     */
    getActivityTimeline(userId: number, limit?: number): Promise<Array<{
        type: 'favorite' | 'inquiry' | 'review' | 'inquiry_response';
        title: string;
        description: string;
        listing_id: number | null;
        created_at: Date;
    }>>;
    private getRecentFavorites;
    private getRecentInquiries;
    private getRecommendedListings;
}
