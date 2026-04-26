import { Repository } from 'typeorm';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { SearchListingsDto, SearchResponseDto, SearchListingResultDto, AutocompleteDto, AutocompleteResponseDto } from './dto/search.dto';
export declare class SearchService {
    private listingRepository;
    private readonly logger;
    constructor(listingRepository: Repository<PGListing>);
    /**
     * Main search method with all filters
     */
    search(searchDto: SearchListingsDto): Promise<SearchResponseDto>;
    /**
     * Search with facets for filter counts
     */
    searchWithFacets(searchDto: SearchListingsDto): Promise<SearchResponseDto>;
    /**
     * Get autocomplete suggestions
     */
    autocomplete(dto: AutocompleteDto): Promise<AutocompleteResponseDto>;
    /**
     * Get popular search suggestions
     */
    getPopularSearches(): Promise<string[]>;
    /**
     * Get nearby listings based on coordinates
     */
    getNearbyListings(latitude: number, longitude: number, radiusKm?: number, limit?: number): Promise<SearchListingResultDto[]>;
    /**
     * Get similar listings
     */
    getSimilarListings(listingId: number, limit?: number): Promise<SearchListingResultDto[]>;
    private createBaseQuery;
    private applyTextSearch;
    private applyLocationFilters;
    private applyProximitySearch;
    private applyPriceFilters;
    private applyRoomFilters;
    private applyPreferenceFilters;
    private applyFoodFilters;
    private applyAmenityFilters;
    private applyAvailabilityFilters;
    private applyRulesFilters;
    private applyQualityFilters;
    private applySorting;
    private getFacets;
    private getRentRangeFacets;
    private getAmenityFacets;
    private transformToSearchResult;
    private buildAppliedFilters;
}
