import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability, AvailabilityStatus } from '../typeorm/entities/availability.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
  ) {}

  async getAvailability(listingId: number): Promise<Availability[]> {
    return await this.availabilityRepository.find({
      where: { listing_id: listingId },
      order: { room_number: 'ASC' },
    });
  }

  async updateAvailability(
    listingId: number,
    roomNumber: string,
    data: Partial<Availability>,
  ): Promise<Availability> {
    let availability = await this.availabilityRepository.findOne({
      where: { listing_id: listingId, room_number: roomNumber },
    });

    if (!availability) {
      availability = this.availabilityRepository.create({
        listing_id: listingId,
        room_number: roomNumber,
        ...data,
      });
    } else {
      Object.assign(availability, data);
    }

    const saved = await this.availabilityRepository.save(availability);
    await this.syncListingAvailability(listingId);
    return saved;
  }

  async bulkUpdateAvailability(
    listingId: number,
    updates: Array<{ room_number: string; available_beds_in_room: number; status: AvailabilityStatus }>,
  ): Promise<Availability[]> {
    const results = [];
    for (const update of updates) {
      const result = await this.updateAvailability(listingId, update.room_number, update);
      results.push(result);
    }
    await this.syncListingAvailability(listingId);
    return results;
  }

  async createRoomAvailability(
    listingId: number,
    roomNumber: string,
    totalBeds: number,
  ): Promise<Availability> {
    const availability = this.availabilityRepository.create({
      listing_id: listingId,
      room_number: roomNumber,
      total_beds_in_room: totalBeds,
      available_beds_in_room: totalBeds,
      status: AvailabilityStatus.AVAILABLE,
    });
    return await this.availabilityRepository.save(availability);
  }

  private async syncListingAvailability(listingId: number): Promise<void> {
    const rooms = await this.availabilityRepository.find({ where: { listing_id: listingId } });
    
    const totalBeds = rooms.reduce((sum, r) => sum + r.total_beds_in_room, 0);
    const availableBeds = rooms.reduce((sum, r) => sum + r.available_beds_in_room, 0);
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(r => r.available_beds_in_room > 0).length;

    await this.listingRepository.update(listingId, {
      total_beds: totalBeds,
      available_beds: availableBeds,
      total_rooms: totalRooms,
      available_rooms: availableRooms,
    });
  }
}
