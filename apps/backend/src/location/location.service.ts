import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GeocodeResult } from '@googlemaps/google-maps-services-js';

@Injectable()
export class LocationService {
  private googleMapsClient: Client;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
    this.googleMapsClient = new Client({});
  }

  /**
   * Geocode an address to get coordinates
   */
  async geocodeAddress(address: string): Promise<{
    latitude: number;
    longitude: number;
    formatted_address: string;
  }> {
    try {
      const response = await this.googleMapsClient.geocode({
        params: {
          address,
          key: this.apiKey,
        },
      });

      if (response.data.results.length === 0) {
        throw new Error('Address not found');
      }

      const result = response.data.results[0];
      return {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        formatted_address: result.formatted_address,
      };
    } catch (error) {
      throw new Error(`Geocoding failed: ${error.message}`);
    }
  }

  /**
   * Reverse geocode coordinates to get address
   */
  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    try {
      const response = await this.googleMapsClient.reverseGeocode({
        params: {
          latlng: { lat: latitude, lng: longitude },
          key: this.apiKey,
        },
      });

      if (response.data.results.length === 0) {
        throw new Error('Location not found');
      }

      return response.data.results[0].formatted_address;
    } catch (error) {
      throw new Error(`Reverse geocoding failed: ${error.message}`);
    }
  }

  /**
   * Find nearby places
   */
  async findNearbyLandmarks(
    latitude: number,
    longitude: number,
    radius: number = 1000,
  ): Promise<string[]> {
    try {
      const response = await this.googleMapsClient.placesNearby({
        params: {
          location: { lat: latitude, lng: longitude },
          radius,
          type: 'point_of_interest',
          key: this.apiKey,
        },
      });

      return response.data.results
        .slice(0, 5)
        .map((place) => place.name);
    } catch (error) {
      throw new Error(`Finding landmarks failed: ${error.message}`);
    }
  }

  /**
   * Calculate distance between two points (in km)
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radius of Earth in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
