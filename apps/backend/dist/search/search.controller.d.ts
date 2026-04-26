import { SearchService } from './search.service';
import { SearchListingsDto, SearchResponseDto, AutocompleteDto, AutocompleteResponseDto, SearchListingResultDto } from './dto/search.dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    /**
     * Main search endpoint with all filters
     * GET /search?city=bangalore&min_rent=5000&max_rent=15000&room_type=single...
     */
    search(searchDto: SearchListingsDto): Promise<SearchResponseDto>;
    /**
     * Search with facets (filter counts)
     * GET /search/with-facets?city=bangalore...
     */
    searchWithFacets(searchDto: SearchListingsDto): Promise<SearchResponseDto>;
    /**
     * Autocomplete suggestions
     * GET /search/autocomplete?query=ban
     */
    autocomplete(autocompleteDto: AutocompleteDto): Promise<AutocompleteResponseDto>;
    /**
     * Get popular searches
     * GET /search/popular
     */
    getPopularSearches(): Promise<{
        suggestions: string[];
    }>;
    /**
     * Get nearby listings based on coordinates
     * GET /search/nearby?latitude=12.9716&longitude=77.5946&radius_km=10
     */
    getNearbyListings(latitude: string, longitude: string, radiusKm?: string, limit?: string): Promise<{
        data: SearchListingResultDto[];
    }>;
    /**
     * Get similar listings
     * GET /search/similar/:listingId
     */
    getSimilarListings(listingId: number, limit?: string): Promise<{
        data: SearchListingResultDto[];
    }>;
}
