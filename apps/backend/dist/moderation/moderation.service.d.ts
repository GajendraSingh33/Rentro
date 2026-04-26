import { Repository } from 'typeorm';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
export declare class ModerationService {
    private listingRepository;
    constructor(listingRepository: Repository<PGListing>);
    getPendingListings(page?: number, limit?: number): Promise<{
        data: PGListing[];
        meta: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    approveListing(listingId: number, moderatorId: number): Promise<PGListing>;
    rejectListing(listingId: number, moderatorId: number, reason: string): Promise<PGListing>;
    flagListing(listingId: number, reason: string): Promise<PGListing>;
    unflagListing(listingId: number): Promise<PGListing>;
    getModerationStats(): Promise<any>;
}
