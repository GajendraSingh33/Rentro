import { Repository } from 'typeorm';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { CreateListingDto, UpdateListingDto, ListingFilterDto, UpdateListingStatusDto } from './dto/listing.dto';
export declare class ListingService {
    private listingRepository;
    constructor(listingRepository: Repository<PGListing>);
    /**
     * Create a new PG listing
     */
    createListing(createListingDto: CreateListingDto, userId: number): Promise<PGListing>;
    /**
     * Update an existing listing
     */
    updateListing(listingId: number, updateListingDto: UpdateListingDto, userId: number): Promise<PGListing>;
    /**
     * Soft delete a listing
     */
    deleteListing(listingId: number, userId: number): Promise<void>;
    /**
     * Get paginated and filtered listings
     */
    getListings(filterDto: ListingFilterDto): Promise<{
        data: PGListing[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    /**
     * Get a single listing by ID
     */
    getListingById(listingId: number): Promise<PGListing>;
    /**
     * Get all listings for a specific owner
     */
    getOwnerListings(userId: number): Promise<PGListing[]>;
    /**
     * Toggle listing status (active/inactive/draft)
     */
    toggleListingStatus(listingId: number, statusDto: UpdateListingStatusDto, userId: number): Promise<PGListing>;
    /**
     * Approve a listing (admin/moderator only)
     */
    approveListing(listingId: number, approverId: number): Promise<PGListing>;
    /**
     * Reject a listing (admin/moderator only)
     */
    rejectListing(listingId: number, reason: string): Promise<PGListing>;
    /**
     * Submit listing for approval
     */
    submitForApproval(listingId: number, userId: number): Promise<PGListing>;
    private findListingById;
}
