import { ConfigService } from '@nestjs/config';
export declare class LocationService {
    private configService;
    private googleMapsClient;
    private apiKey;
    constructor(configService: ConfigService);
    /**
     * Geocode an address to get coordinates
     */
    geocodeAddress(address: string): Promise<{
        latitude: number;
        longitude: number;
        formatted_address: string;
    }>;
    /**
     * Reverse geocode coordinates to get address
     */
    reverseGeocode(latitude: number, longitude: number): Promise<string>;
    /**
     * Find nearby places
     */
    findNearbyLandmarks(latitude: number, longitude: number, radius?: number): Promise<string[]>;
    /**
     * Calculate distance between two points (in km)
     */
    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number;
    private toRad;
}
