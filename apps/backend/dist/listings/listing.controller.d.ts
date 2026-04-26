import { ListingService } from './listing.service';
import { CreateListingDto, UpdateListingDto, ListingFilterDto, UpdateListingStatusDto } from './dto/listing.dto';
export declare class ListingController {
    private readonly listingService;
    constructor(listingService: ListingService);
    /**
     * Create a new listing
     * POST /listings
     */
    createListing(createListingDto: CreateListingDto, req: any): Promise<import("../typeorm/entities").PGListing>;
    /**
     * Get all listings (public, filtered, paginated)
     * GET /listings
     */
    getListings(filterDto: ListingFilterDto): Promise<{
        data: import("../typeorm/entities").PGListing[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    /**
     * Get a single listing by ID
     * GET /listings/:id
     */
    getListingById(id: number): Promise<import("../typeorm/entities").PGListing>;
    /**
     * Get all listings for the authenticated owner
     * GET /listings/owner/me
     */
    getMyListings(req: any): Promise<import("../typeorm/entities").PGListing[]>;
    /**
     * Update a listing
     * PUT /listings/:id
     */
    updateListing(id: number, updateListingDto: UpdateListingDto, req: any): Promise<import("../typeorm/entities").PGListing>;
    /**
     * Delete a listing
     * DELETE /listings/:id
     */
    deleteListing(id: number, req: any): Promise<void>;
    /**
     * Update listing status
     * PATCH /listings/:id/status
     */
    updateListingStatus(id: number, statusDto: UpdateListingStatusDto, req: any): Promise<import("../typeorm/entities").PGListing>;
    /**
     * Submit listing for approval
     * POST /listings/:id/submit
     */
    submitForApproval(id: number, req: any): Promise<import("../typeorm/entities").PGListing>;
    /**
     * Approve a listing (Admin/Moderator only)
     * POST /listings/:id/approve
     */
    approveListing(id: number, req: any): Promise<import("../typeorm/entities").PGListing>;
    /**
     * Reject a listing (Admin/Moderator only)
     * POST /listings/:id/reject
     */
    rejectListing(id: number, reason: string): Promise<import("../typeorm/entities").PGListing>;
}
