import { LocationService, GeocodingResult, NearbyLandmark } from './location.service';
declare class GeocodeDto {
    address: string;
}
declare class ReverseGeocodeDto {
    lat: number;
    lng: number;
}
declare class NearbyDto {
    lat: number;
    lng: number;
    radius?: number;
}
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    geocode(dto: GeocodeDto): Promise<GeocodingResult | null>;
    reverseGeocode(dto: ReverseGeocodeDto): Promise<GeocodingResult | null>;
    nearbyLandmarks(dto: NearbyDto): Promise<NearbyLandmark[]>;
    autocomplete(input: string): Promise<Array<{
        description: string;
        place_id: string;
    }>>;
    calculateDistance(dto: {
        from: {
            lat: number;
            lng: number;
        };
        to: {
            lat: number;
            lng: number;
        };
    }): Promise<{
        distance: number;
        unit: string;
    }>;
}
export {};
