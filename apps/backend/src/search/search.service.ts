import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  PGListing,
  ListingStatus,
  RoomType,
  GenderPreference,
  FoodType,
} from '../typeorm/entities/pg-listing.entity';
import {
  SearchListingsDto,
  SearchResponseDto,
  SearchListingResultDto,
  SearchFacetsDto,
  SortBy,
  AutocompleteDto,
  AutocompleteResponseDto,
  AutocompleteSuggestion,
} from './dto/search.dto';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
  ) {}

  /**
   * Main search method with all filters
   */
  async search(searchDto: SearchListingsDto): Promise<SearchResponseDto> {
    const page = searchDto.page || 1;
    const limit = searchDto.limit || 20;
    const skip = (page - 1) * limit;

    const queryBuilder = this.createBaseQuery();

    // Apply all filters
    this.applyTextSearch(queryBuilder, searchDto);
    this.applyLocationFilters(queryBuilder, searchDto);
    this.applyProximitySearch(queryBuilder, searchDto);
    this.applyPriceFilters(queryBuilder, searchDto);
    this.applyRoomFilters(queryBuilder, searchDto);
    this.applyPreferenceFilters(queryBuilder, searchDto);
    this.applyFoodFilters(queryBuilder, searchDto);
    this.applyAmenityFilters(queryBuilder, searchDto);
    this.applyAvailabilityFilters(queryBuilder, searchDto);
    this.applyRulesFilters(queryBuilder, searchDto);
    this.applyQualityFilters(queryBuilder, searchDto);

    // Apply sorting
    this.applySorting(queryBuilder, searchDto);

    // Get total count before pagination
    const total = await queryBuilder.getCount();

    // Apply pagination
    const listings = await queryBuilder.skip(skip).take(limit).getMany();

    // Transform results
    const data = listings.map((listing) =>
      this.transformToSearchResult(listing, searchDto),
    );

    // Build applied filters object
    const filters_applied = this.buildAppliedFilters(searchDto);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      filters_applied,
    };
  }

  /**
   * Search with facets for filter counts
   */
  async searchWithFacets(
    searchDto: SearchListingsDto,
  ): Promise<SearchResponseDto> {
    const results = await this.search(searchDto);
    const facets = await this.getFacets(searchDto);

    return {
      ...results,
      facets,
    };
  }

  /**
   * Get autocomplete suggestions
   */
  async autocomplete(dto: AutocompleteDto): Promise<AutocompleteResponseDto> {
    const query = dto.query.toLowerCase().trim();
    const limit = dto.limit || 10;
    const suggestions: AutocompleteSuggestion[] = [];

    // Search cities
    const cities = await this.listingRepository
      .createQueryBuilder('listing')
      .select('listing.city', 'city')
      .addSelect('COUNT(*)', 'count')
      .where('LOWER(listing.city) LIKE :query', { query: `%${query}%` })
      .andWhere('listing.status = :status', { status: ListingStatus.ACTIVE })
      .andWhere('listing.deleted_at IS NULL')
      .groupBy('listing.city')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    cities.forEach((city) => {
      suggestions.push({
        type: 'city',
        value: city.city,
        display: `${city.city} (${city.count} PGs)`,
        metadata: { city: city.city, count: parseInt(city.count) },
      });
    });

    // Search listing titles
    const listings = await this.listingRepository
      .createQueryBuilder('listing')
      .select(['listing.id', 'listing.title', 'listing.city'])
      .where('LOWER(listing.title) LIKE :query', { query: `%${query}%` })
      .andWhere('listing.status = :status', { status: ListingStatus.ACTIVE })
      .andWhere('listing.deleted_at IS NULL')
      .orderBy('listing.view_count', 'DESC')
      .limit(5)
      .getMany();

    listings.forEach((listing) => {
      suggestions.push({
        type: 'listing',
        value: listing.title,
        display: `${listing.title} - ${listing.city}`,
        metadata: { listing_id: listing.id, city: listing.city },
      });
    });

    // Search areas/addresses
    const areas = await this.listingRepository
      .createQueryBuilder('listing')
      .select('listing.address', 'address')
      .addSelect('listing.city', 'city')
      .addSelect('COUNT(*)', 'count')
      .where('LOWER(listing.address) LIKE :query', { query: `%${query}%` })
      .andWhere('listing.status = :status', { status: ListingStatus.ACTIVE })
      .andWhere('listing.deleted_at IS NULL')
      .groupBy('listing.address')
      .addGroupBy('listing.city')
      .orderBy('count', 'DESC')
      .limit(3)
      .getRawMany();

    areas.forEach((area) => {
      const parts = area.address.split(',');
      const areaName = parts[0]?.trim() || area.address;
      suggestions.push({
        type: 'area',
        value: areaName,
        display: `${areaName}, ${area.city}`,
        metadata: { city: area.city },
      });
    });

    return {
      suggestions: suggestions.slice(0, limit),
    };
  }

  /**
   * Get popular search suggestions
   */
  async getPopularSearches(): Promise<string[]> {
    const popularCities = await this.listingRepository
      .createQueryBuilder('listing')
      .select('listing.city', 'city')
      .addSelect('COUNT(*)', 'count')
      .where('listing.status = :status', { status: ListingStatus.ACTIVE })
      .andWhere('listing.deleted_at IS NULL')
      .groupBy('listing.city')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    return popularCities.map((c) => c.city);
  }

  /**
   * Get nearby listings based on coordinates
   */
  async getNearbyListings(
    latitude: number,
    longitude: number,
    radiusKm: number = 10,
    limit: number = 10,
  ): Promise<SearchListingResultDto[]> {
    const queryBuilder = this.createBaseQuery();

    // Haversine formula for distance calculation
    queryBuilder
      .addSelect(
        `(6371 * acos(cos(radians(:lat)) * cos(radians(listing.latitude)) * cos(radians(listing.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(listing.latitude))))`,
        'distance',
      )
      .setParameter('lat', latitude)
      .setParameter('lng', longitude)
      .having('distance <= :radius', { radius: radiusKm })
      .orderBy('distance', 'ASC')
      .limit(limit);

    const listings = await queryBuilder.getRawAndEntities();

    return listings.entities.map((listing, index) => ({
      ...this.transformToSearchResult(listing, {}),
      distance_km: parseFloat(listings.raw[index]?.distance) || undefined,
    }));
  }

  /**
   * Get similar listings
   */
  async getSimilarListings(
    listingId: number,
    limit: number = 6,
  ): Promise<SearchListingResultDto[]> {
    // Get the reference listing
    const listing = await this.listingRepository.findOne({
      where: { id: listingId },
    });

    if (!listing) {
      return [];
    }

    // Find similar listings based on multiple criteria
    const queryBuilder = this.createBaseQuery()
      .andWhere('listing.id != :listingId', { listingId })
      // Same city
      .andWhere('listing.city = :city', { city: listing.city })
      // Similar price range (within 30%)
      .andWhere('listing.monthly_rent BETWEEN :minRent AND :maxRent', {
        minRent: listing.monthly_rent * 0.7,
        maxRent: listing.monthly_rent * 1.3,
      });

    // Prefer same room type
    if (listing.room_type) {
      queryBuilder.addOrderBy(
        `CASE WHEN listing.room_type = '${listing.room_type}' THEN 0 ELSE 1 END`,
        'ASC',
      );
    }

    // Prefer same gender preference
    if (listing.gender_preference) {
      queryBuilder.addOrderBy(
        `CASE WHEN listing.gender_preference = '${listing.gender_preference}' THEN 0 ELSE 1 END`,
        'ASC',
      );
    }

    queryBuilder.addOrderBy('listing.average_rating', 'DESC', 'NULLS LAST');
    queryBuilder.limit(limit);

    const listings = await queryBuilder.getMany();
    return listings.map((l) => this.transformToSearchResult(l, {}));
  }

  // ==================== Private Methods ====================

  private createBaseQuery(): SelectQueryBuilder<PGListing> {
    return this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.owner', 'owner')
      .leftJoinAndSelect('listing.media', 'media')
      .where('listing.deleted_at IS NULL')
      .andWhere('listing.status = :status', { status: ListingStatus.ACTIVE });
  }

  private applyTextSearch(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.query) {
      const searchQuery = `%${dto.query.toLowerCase()}%`;
      queryBuilder.andWhere(
        '(LOWER(listing.title) LIKE :search OR LOWER(listing.description) LIKE :search OR LOWER(listing.address) LIKE :search)',
        { search: searchQuery },
      );
    }
  }

  private applyLocationFilters(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.city) {
      queryBuilder.andWhere('LOWER(listing.city) = LOWER(:city)', {
        city: dto.city,
      });
    }

    if (dto.state) {
      queryBuilder.andWhere('LOWER(listing.state) = LOWER(:state)', {
        state: dto.state,
      });
    }

    if (dto.pincode) {
      queryBuilder.andWhere('listing.pincode = :pincode', {
        pincode: dto.pincode,
      });
    }
  }

  private applyProximitySearch(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.latitude && dto.longitude) {
      const radiusKm = dto.radius_km || 10;

      // Haversine formula for distance calculation
      queryBuilder
        .andWhere('listing.latitude IS NOT NULL')
        .andWhere('listing.longitude IS NOT NULL')
        .addSelect(
          `(6371 * acos(cos(radians(:userLat)) * cos(radians(listing.latitude)) * cos(radians(listing.longitude) - radians(:userLng)) + sin(radians(:userLat)) * sin(radians(listing.latitude))))`,
          'distance_km',
        )
        .setParameter('userLat', dto.latitude)
        .setParameter('userLng', dto.longitude)
        .having('distance_km <= :radius', { radius: radiusKm });
    }
  }

  private applyPriceFilters(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.min_rent !== undefined) {
      queryBuilder.andWhere('listing.monthly_rent >= :minRent', {
        minRent: dto.min_rent,
      });
    }

    if (dto.max_rent !== undefined) {
      queryBuilder.andWhere('listing.monthly_rent <= :maxRent', {
        maxRent: dto.max_rent,
      });
    }
  }

  private applyRoomFilters(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.room_type) {
      queryBuilder.andWhere('listing.room_type = :roomType', {
        roomType: dto.room_type,
      });
    }

    if (dto.sharing_capacity) {
      queryBuilder.andWhere('listing.sharing_capacity = :sharingCapacity', {
        sharingCapacity: dto.sharing_capacity,
      });
    }
  }

  private applyPreferenceFilters(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.gender_preference) {
      // Also match 'any' gender preference listings
      queryBuilder.andWhere(
        '(listing.gender_preference = :genderPref OR listing.gender_preference = :any)',
        {
          genderPref: dto.gender_preference,
          any: GenderPreference.ANY,
        },
      );
    }
  }

  private applyFoodFilters(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.food_type) {
      if (dto.food_type === FoodType.BOTH) {
        // 'both' includes veg, non_veg, and both options
        queryBuilder.andWhere('listing.food_type IN (:...foodTypes)', {
          foodTypes: [FoodType.VEG, FoodType.NON_VEG, FoodType.BOTH],
        });
      } else {
        queryBuilder.andWhere(
          '(listing.food_type = :foodType OR listing.food_type = :both)',
          {
            foodType: dto.food_type,
            both: FoodType.BOTH,
          },
        );
      }
    }

    if (dto.breakfast_included) {
      queryBuilder.andWhere('listing.breakfast_included = true');
    }

    if (dto.lunch_included) {
      queryBuilder.andWhere('listing.lunch_included = true');
    }

    if (dto.dinner_included) {
      queryBuilder.andWhere('listing.dinner_included = true');
    }
  }

  private applyAmenityFilters(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.amenities && dto.amenities.length > 0) {
      dto.amenities.forEach((amenity, index) => {
        queryBuilder.andWhere(`listing.amenities LIKE :amenity${index}`, {
          [`amenity${index}`]: `%${amenity}%`,
        });
      });
    }

    if (dto.wifi_included) {
      queryBuilder.andWhere('listing.wifi_included = true');
    }

    if (dto.electricity_included) {
      queryBuilder.andWhere('listing.electricity_included = true');
    }

    if (dto.water_included) {
      queryBuilder.andWhere('listing.water_included = true');
    }
  }

  private applyAvailabilityFilters(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.available_only) {
      queryBuilder.andWhere(
        '(listing.available_beds > 0 OR listing.available_rooms > 0)',
      );
    }

    if (dto.available_from) {
      queryBuilder.andWhere(
        '(listing.available_from IS NULL OR listing.available_from <= :availFrom)',
        { availFrom: dto.available_from },
      );
    }
  }

  private applyRulesFilters(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.visitors_allowed) {
      queryBuilder.andWhere('listing.visitors_allowed = true');
    }

    if (dto.smoking_allowed) {
      queryBuilder.andWhere('listing.smoking_allowed = true');
    }

    if (dto.pets_allowed) {
      queryBuilder.andWhere('listing.pets_allowed = true');
    }
  }

  private applyQualityFilters(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    if (dto.verified_only) {
      queryBuilder.andWhere('listing.is_verified = true');
    }

    if (dto.featured_only) {
      queryBuilder.andWhere('listing.is_featured = true');
    }

    if (dto.min_rating !== undefined) {
      queryBuilder.andWhere(
        '(listing.average_rating >= :minRating OR listing.average_rating IS NULL)',
        { minRating: dto.min_rating },
      );
    }
  }

  private applySorting(
    queryBuilder: SelectQueryBuilder<PGListing>,
    dto: SearchListingsDto,
  ): void {
    const sortBy = dto.sort_by || SortBy.RELEVANCE;

    switch (sortBy) {
      case SortBy.RENT_LOW_TO_HIGH:
        queryBuilder.orderBy('listing.monthly_rent', 'ASC');
        break;
      case SortBy.RENT_HIGH_TO_LOW:
        queryBuilder.orderBy('listing.monthly_rent', 'DESC');
        break;
      case SortBy.RATING:
        queryBuilder.orderBy('listing.average_rating', 'DESC', 'NULLS LAST');
        break;
      case SortBy.NEWEST:
        queryBuilder.orderBy('listing.created_at', 'DESC');
        break;
      case SortBy.POPULARITY:
        queryBuilder.orderBy('listing.view_count', 'DESC');
        break;
      case SortBy.DISTANCE:
        // Distance sorting only works with proximity search
        if (dto.latitude && dto.longitude) {
          queryBuilder.orderBy('distance_km', 'ASC');
        } else {
          queryBuilder.orderBy('listing.created_at', 'DESC');
        }
        break;
      case SortBy.RELEVANCE:
      default:
        // Relevance: featured first, then verified, then by rating and views
        queryBuilder
          .orderBy('listing.is_featured', 'DESC')
          .addOrderBy('listing.is_verified', 'DESC')
          .addOrderBy('listing.average_rating', 'DESC', 'NULLS LAST')
          .addOrderBy('listing.view_count', 'DESC');
        break;
    }
  }

  private async getFacets(dto: SearchListingsDto): Promise<SearchFacetsDto> {
    const baseConditions = 'listing.deleted_at IS NULL AND listing.status = :status';
    const params = { status: ListingStatus.ACTIVE };

    // Get city facets
    const cities = await this.listingRepository
      .createQueryBuilder('listing')
      .select('listing.city', 'value')
      .addSelect('COUNT(*)', 'count')
      .where(baseConditions, params)
      .groupBy('listing.city')
      .orderBy('count', 'DESC')
      .limit(20)
      .getRawMany();

    // Get room type facets
    const roomTypes = await this.listingRepository
      .createQueryBuilder('listing')
      .select('listing.room_type', 'value')
      .addSelect('COUNT(*)', 'count')
      .where(baseConditions, params)
      .groupBy('listing.room_type')
      .orderBy('count', 'DESC')
      .getRawMany();

    // Get gender preference facets
    const genderPreferences = await this.listingRepository
      .createQueryBuilder('listing')
      .select('listing.gender_preference', 'value')
      .addSelect('COUNT(*)', 'count')
      .where(baseConditions, params)
      .groupBy('listing.gender_preference')
      .orderBy('count', 'DESC')
      .getRawMany();

    // Get food type facets
    const foodTypes = await this.listingRepository
      .createQueryBuilder('listing')
      .select('listing.food_type', 'value')
      .addSelect('COUNT(*)', 'count')
      .where(baseConditions, params)
      .groupBy('listing.food_type')
      .orderBy('count', 'DESC')
      .getRawMany();

    // Get rent ranges
    const rentRanges = await this.getRentRangeFacets();

    // Get amenity facets (parse JSON and count)
    const amenities = await this.getAmenityFacets();

    return {
      cities: cities.map((c) => ({ value: c.value, count: parseInt(c.count) })),
      room_types: roomTypes.map((r) => ({
        value: r.value,
        count: parseInt(r.count),
      })),
      gender_preferences: genderPreferences.map((g) => ({
        value: g.value,
        count: parseInt(g.count),
      })),
      food_types: foodTypes.map((f) => ({
        value: f.value,
        count: parseInt(f.count),
      })),
      rent_ranges: rentRanges,
      amenities,
    };
  }

  private async getRentRangeFacets(): Promise<
    { min: number; max: number; count: number }[]
  > {
    const ranges = [
      { min: 0, max: 5000 },
      { min: 5000, max: 10000 },
      { min: 10000, max: 15000 },
      { min: 15000, max: 20000 },
      { min: 20000, max: 30000 },
      { min: 30000, max: 999999 },
    ];

    const results = await Promise.all(
      ranges.map(async (range) => {
        const count = await this.listingRepository
          .createQueryBuilder('listing')
          .where('listing.deleted_at IS NULL')
          .andWhere('listing.status = :status', { status: ListingStatus.ACTIVE })
          .andWhere('listing.monthly_rent >= :min', { min: range.min })
          .andWhere('listing.monthly_rent < :max', { max: range.max })
          .getCount();

        return { ...range, count };
      }),
    );

    return results.filter((r) => r.count > 0);
  }

  private async getAmenityFacets(): Promise<{ value: string; count: number }[]> {
    // Get all amenities from active listings
    const listings = await this.listingRepository
      .createQueryBuilder('listing')
      .select('listing.amenities')
      .where('listing.deleted_at IS NULL')
      .andWhere('listing.status = :status', { status: ListingStatus.ACTIVE })
      .andWhere('listing.amenities IS NOT NULL')
      .getMany();

    // Count amenities
    const amenityCount: Record<string, number> = {};

    listings.forEach((listing) => {
      try {
        const amenities = JSON.parse(listing.amenities || '[]');
        amenities.forEach((amenity: string) => {
          amenityCount[amenity] = (amenityCount[amenity] || 0) + 1;
        });
      } catch (e) {
        // Skip invalid JSON
      }
    });

    // Convert to array and sort by count
    return Object.entries(amenityCount)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }

  private transformToSearchResult(
    listing: PGListing,
    dto: Partial<SearchListingsDto>,
  ): SearchListingResultDto {
    // Get thumbnail (first image)
    const thumbnail =
      listing.media?.find((m) => m.type === 'image' && m.is_thumbnail)?.url ||
      listing.media?.find((m) => m.type === 'image')?.url ||
      null;

    // Parse amenities
    let amenities: string[] = [];
    try {
      amenities = JSON.parse(listing.amenities || '[]');
    } catch (e) {
      amenities = [];
    }

    return {
      id: listing.id,
      title: listing.title,
      description:
        listing.description.length > 200
          ? listing.description.substring(0, 200) + '...'
          : listing.description,
      address: listing.address,
      city: listing.city,
      state: listing.state,
      pincode: listing.pincode,
      latitude: listing.latitude,
      longitude: listing.longitude,
      monthly_rent: Number(listing.monthly_rent),
      security_deposit: Number(listing.security_deposit),
      room_type: listing.room_type,
      sharing_capacity: listing.sharing_capacity,
      gender_preference: listing.gender_preference,
      food_type: listing.food_type,
      amenities,
      total_rooms: listing.total_rooms,
      available_rooms: listing.available_rooms,
      total_beds: listing.total_beds,
      available_beds: listing.available_beds,
      average_rating: listing.average_rating ? Number(listing.average_rating) : null,
      review_count: listing.review_count,
      view_count: listing.view_count,
      is_verified: listing.is_verified,
      is_featured: listing.is_featured,
      thumbnail_url: thumbnail,
      owner_name: listing.owner?.first_name
        ? `${listing.owner.first_name} ${listing.owner.last_name || ''}`
        : 'Unknown',
      created_at: listing.created_at,
    };
  }

  private buildAppliedFilters(dto: SearchListingsDto): Record<string, any> {
    const filters: Record<string, any> = {};

    if (dto.query) filters.query = dto.query;
    if (dto.city) filters.city = dto.city;
    if (dto.state) filters.state = dto.state;
    if (dto.pincode) filters.pincode = dto.pincode;
    if (dto.min_rent !== undefined) filters.min_rent = dto.min_rent;
    if (dto.max_rent !== undefined) filters.max_rent = dto.max_rent;
    if (dto.room_type) filters.room_type = dto.room_type;
    if (dto.sharing_capacity) filters.sharing_capacity = dto.sharing_capacity;
    if (dto.gender_preference) filters.gender_preference = dto.gender_preference;
    if (dto.food_type) filters.food_type = dto.food_type;
    if (dto.amenities?.length) filters.amenities = dto.amenities;
    if (dto.available_only) filters.available_only = true;
    if (dto.verified_only) filters.verified_only = true;
    if (dto.featured_only) filters.featured_only = true;
    if (dto.latitude && dto.longitude) {
      filters.proximity = {
        latitude: dto.latitude,
        longitude: dto.longitude,
        radius_km: dto.radius_km || 10,
      };
    }

    return filters;
  }
}
