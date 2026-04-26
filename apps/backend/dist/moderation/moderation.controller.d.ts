import { ModerationService } from './moderation.service';
declare class RejectDto {
    reason: string;
}
declare class FlagDto {
    reason: string;
}
export declare class ModerationController {
    private readonly moderationService;
    constructor(moderationService: ModerationService);
    getPendingListings(page?: number, limit?: number): Promise<{
        data: import("../typeorm/entities").PGListing[];
        meta: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    approveListing(id: number, req: any): Promise<import("../typeorm/entities").PGListing>;
    rejectListing(id: number, rejectDto: RejectDto, req: any): Promise<import("../typeorm/entities").PGListing>;
    flagListing(id: number, flagDto: FlagDto): Promise<import("../typeorm/entities").PGListing>;
    unflagListing(id: number): Promise<import("../typeorm/entities").PGListing>;
    getStats(): Promise<any>;
}
export {};
