import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PGListing, ListingStatus } from '../typeorm/entities/pg-listing.entity';

@Injectable()
export class ModerationService {
  constructor(
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
  ) {}

  async getPendingListings(page: number = 1, limit: number = 20) {
    const [listings, total] = await this.listingRepository.findAndCount({
      where: { status: ListingStatus.PENDING_APPROVAL },
      relations: ['owner'],
      order: { created_at: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: listings,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async approveListing(listingId: number, moderatorId: number): Promise<PGListing> {
    const listing = await this.listingRepository.findOne({ where: { id: listingId } });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.status !== ListingStatus.PENDING_APPROVAL) {
      throw new BadRequestException('Listing is not pending approval');
    }

    listing.status = ListingStatus.ACTIVE;
    listing.approved_at = new Date();
    listing.approved_by = moderatorId;
    listing.rejection_reason = null;

    return await this.listingRepository.save(listing);
  }

  async rejectListing(listingId: number, moderatorId: number, reason: string): Promise<PGListing> {
    const listing = await this.listingRepository.findOne({ where: { id: listingId } });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.status !== ListingStatus.PENDING_APPROVAL) {
      throw new BadRequestException('Listing is not pending approval');
    }

    listing.status = ListingStatus.REJECTED;
    listing.rejection_reason = reason;
    listing.approved_by = moderatorId;

    return await this.listingRepository.save(listing);
  }

  async flagListing(listingId: number, reason: string): Promise<PGListing> {
    const listing = await this.listingRepository.findOne({ where: { id: listingId } });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    listing.is_flagged = true;
    listing.flag_reason = reason;
    listing.status = ListingStatus.PENDING_APPROVAL;

    return await this.listingRepository.save(listing);
  }

  async unflagListing(listingId: number): Promise<PGListing> {
    const listing = await this.listingRepository.findOne({ where: { id: listingId } });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    listing.is_flagged = false;
    listing.flag_reason = null;

    return await this.listingRepository.save(listing);
  }

  async getModerationStats(): Promise<any> {
    const pending = await this.listingRepository.count({ where: { status: ListingStatus.PENDING_APPROVAL } });
    const flagged = await this.listingRepository.count({ where: { is_flagged: true } });
    const rejected = await this.listingRepository.count({ where: { status: ListingStatus.REJECTED } });

    return { pending, flagged, rejected };
  }
}
