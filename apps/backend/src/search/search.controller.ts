import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SearchService } from './search.service';
import {
  SearchListingsDto,
  SearchResponseDto,
  AutocompleteDto,
  AutocompleteResponseDto,
  SearchListingResultDto,
} from './dto/search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  /**
   * Main search endpoint with all filters
   * GET /search?city=bangalore&min_rent=5000&max_rent=15000&room_type=single...
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async search(@Query() searchDto: SearchListingsDto): Promise<SearchResponseDto> {
    return this.searchService.search(searchDto);
  }

  /**
   * Search with facets (filter counts)
   * GET /search/with-facets?city=bangalore...
   */
  @Get('with-facets')
  @HttpCode(HttpStatus.OK)
  async searchWithFacets(
    @Query() searchDto: SearchListingsDto,
  ): Promise<SearchResponseDto> {
    return this.searchService.searchWithFacets(searchDto);
  }

  /**
   * Autocomplete suggestions
   * GET /search/autocomplete?query=ban
   */
  @Get('autocomplete')
  @HttpCode(HttpStatus.OK)
  async autocomplete(
    @Query() autocompleteDto: AutocompleteDto,
  ): Promise<AutocompleteResponseDto> {
    return this.searchService.autocomplete(autocompleteDto);
  }

  /**
   * Get popular searches
   * GET /search/popular
   */
  @Get('popular')
  @HttpCode(HttpStatus.OK)
  async getPopularSearches(): Promise<{ suggestions: string[] }> {
    const suggestions = await this.searchService.getPopularSearches();
    return { suggestions };
  }

  /**
   * Get nearby listings based on coordinates
   * GET /search/nearby?latitude=12.9716&longitude=77.5946&radius_km=10
   */
  @Get('nearby')
  @HttpCode(HttpStatus.OK)
  async getNearbyListings(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('radius_km') radiusKm?: string,
    @Query('limit') limit?: string,
  ): Promise<{ data: SearchListingResultDto[] }> {
    const data = await this.searchService.getNearbyListings(
      parseFloat(latitude),
      parseFloat(longitude),
      radiusKm ? parseFloat(radiusKm) : 10,
      limit ? parseInt(limit) : 10,
    );
    return { data };
  }

  /**
   * Get similar listings
   * GET /search/similar/:listingId
   */
  @Get('similar/:listingId')
  @HttpCode(HttpStatus.OK)
  async getSimilarListings(
    @Param('listingId', ParseIntPipe) listingId: number,
    @Query('limit') limit?: string,
  ): Promise<{ data: SearchListingResultDto[] }> {
    const data = await this.searchService.getSimilarListings(
      listingId,
      limit ? parseInt(limit) : 6,
    );
    return { data };
  }
}
