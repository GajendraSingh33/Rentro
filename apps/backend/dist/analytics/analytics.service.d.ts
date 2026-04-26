import { Repository } from 'typeorm';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { Inquiry } from '../typeorm/entities/inquiry.entity';
export declare class AnalyticsService {
    private listingRepository;
    private inquiryRepository;
    constructor(listingRepository: Repository<PGListing>, inquiryRepository: Repository<Inquiry>);
    getOwnerDashboardOverview(ownerId: number): Promise<any>;
    getListingAnalytics(listingId: number): Promise<any>;
    getTopPerformingListings(ownerId: number, limit?: number): Promise<any[]>;
    getViewsOverTime(ownerId: number, days?: number): Promise<any[]>;
    getInquiriesOverTime(ownerId: number, days?: number): Promise<any[]>;
}
