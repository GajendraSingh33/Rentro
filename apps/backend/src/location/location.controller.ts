import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { LocationService, GeocodingResult, NearbyLandmark } from './location.service';

class GeocodeDto {
  address: string;
}

class ReverseGeocodeDto {
  lat: number;
  lng: number;
}

class NearbyDto {
  lat: number;
  lng: number;
  radius?: number;
}

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('geocode')
  async geocode(@Body() dto: GeocodeDto): Promise<GeocodingResult | null> {
    return await this.locationService.geocode(dto.address);
  }

  @Post('reverse-geocode')
  async reverseGeocode(@Body() dto: ReverseGeocodeDto): Promise<GeocodingResult | null> {
    return await this.locationService.reverseGeocode(dto.lat, dto.lng);
  }

  @Post('nearby')
  async nearbyLandmarks(@Body() dto: NearbyDto): Promise<NearbyLandmark[]> {
    return await this.locationService.searchNearbyLandmarks(dto.lat, dto.lng, dto.radius || 1000);
  }

  @Get('autocomplete')
  async autocomplete(@Query('input') input: string): Promise<Array<{ description: string; place_id: string }>> {
    if (!input || input.length < 3) return [];
    return await this.locationService.autocomplete(input);
  }

  @Post('distance')
  async calculateDistance(
    @Body() dto: { from: { lat: number; lng: number }; to: { lat: number; lng: number } },
  ): Promise<{ distance: number; unit: string }> {
    const distance = this.locationService.calculateDistance(
      dto.from.lat,
      dto.from.lng,
      dto.to.lat,
      dto.to.lng,
    );
    return { distance, unit: 'meters' };
  }
}
