import { RoomType, GenderPreference, FoodType } from '../../typeorm/entities/pg-listing.entity';
export declare enum SortBy {
    RELEVANCE = "relevance",
    RENT_LOW_TO_HIGH = "rent_asc",
    RENT_HIGH_TO_LOW = "rent_desc",
    RATING = "rating",
    NEWEST = "newest",
    POPULARITY = "popularity",
    DISTANCE = "distance"
}
export declare class SearchListingsDto {
    query?: string;
    city?: string;
    state?: string;
    pincode?: string;
    latitude?: number;
    longitude?: number;
    radius_km?: number;
    min_rent?: number;
    max_rent?: number;
    room_type?: RoomType;
    sharing_capacity?: number;
    gender_preference?: GenderPreference;
    food_type?: FoodType;
    breakfast_included?: boolean;
    lunch_included?: boolean;
    dinner_included?: boolean;
    amenities?: string[];
    wifi_included?: boolean;
    electricity_included?: boolean;
    water_included?: boolean;
    available_only?: boolean;
    available_from?: string;
    visitors_allowed?: boolean;
    smoking_allowed?: boolean;
    pets_allowed?: boolean;
    verified_only?: boolean;
    featured_only?: boolean;
    min_rating?: number;
    sort_by?: SortBy;
    page?: number;
    limit?: number;
}
export declare class SearchResponseDto {
    data: SearchListingResultDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    filters_applied: Record<string, any>;
    facets?: SearchFacetsDto;
}
export declare class SearchListingResultDto {
    id: number;
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude: number;
    longitude: number;
    monthly_rent: number;
    security_deposit: number;
    room_type: RoomType;
    sharing_capacity: number;
    gender_preference: GenderPreference;
    food_type: FoodType;
    amenities: string[];
    total_rooms: number;
    available_rooms: number;
    total_beds: number;
    available_beds: number;
    average_rating: number;
    review_count: number;
    view_count: number;
    is_verified: boolean;
    is_featured: boolean;
    thumbnail_url: string | null;
    owner_name: string;
    distance_km?: number;
    created_at: Date;
}
export declare class SearchFacetsDto {
    cities: FacetItem[];
    room_types: FacetItem[];
    gender_preferences: FacetItem[];
    food_types: FacetItem[];
    rent_ranges: RentRangeFacet[];
    amenities: FacetItem[];
}
export declare class FacetItem {
    value: string;
    count: number;
}
export declare class RentRangeFacet {
    min: number;
    max: number;
    count: number;
}
export declare class AutocompleteDto {
    query: string;
    limit?: number;
}
export declare class AutocompleteResponseDto {
    suggestions: AutocompleteSuggestion[];
}
export declare class AutocompleteSuggestion {
    type: 'city' | 'area' | 'listing' | 'landmark';
    value: string;
    display: string;
    metadata?: {
        city?: string;
        state?: string;
        listing_id?: number;
        count?: number;
    };
}
