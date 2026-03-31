import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PGListing, ListingStatus } from '../typeorm/entities/pg-listing.entity';
import {
  CreateListingDto,
  UpdateListingDto,
  ListingFilterDto,
  UpdateListingStatusDto,
} from './dto/listing.dto';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
  ) {}

  /**
   * Create a new PG listing
   */
  async createListing(
    createListingDto: CreateListingDto,
    userId: number,
  ): Promise<PGListing> {
    // Validate available counts
    if (createListingDto.available_rooms > createListingDto.total_rooms) {
      throw new BadRequestException(
        'Available rooms cannot exceed total rooms',
      );
    }

    if (createListingDto.available_beds > createListingDto.total_beds) {
      throw new BadRequestException('Available beds cannot exceed total beds');
    }

    // Convert arrays to JSON strings
    const listingData = {
      ...createListingDto,
      owner_id: userId,
      status: ListingStatus.DRAFT, // Start as draft
      amenities: createListingDto.amenities
        ? JSON.stringify(createListingDto.amenities)
        : null,
      nearby_landmarks: createListingDto.nearby_landmarks
        ? JSON.stringify(createListingDto.nearby_landmarks)
        : null,
    };

    const listing = this.listingRepository.create(listingData);
    return await this.listingRepository.save(listing);
  }

  /**
   * Update an existing listing
   */
  async updateListing(
    listingId: number,
    updateListingDto: UpdateListingDto,
    userId: number,
  ): Promise<PGListing> {
    const listing = await this.findListingById(listingId);

    // Check ownership
    if (listing.owner_id !== userId) {
      throw new ForbiddenException('You can only update your own listings');
    }

    // Validate available counts if provided
    if (
      updateListingDto.available_rooms !== undefined &&
      updateListingDto.available_rooms > (updateListingDto.total_rooms || listing.total_rooms)
    ) {
      throw new BadRequestException(
        'Available rooms cannot exceed total rooms',
      );
    }

    if (
      updateListingDto.available_beds !== undefined &&
      updateListingDto.available_beds > (updateListingDto.total_beds || listing.total_beds)
    ) {
      throw new BadRequestException('Available beds cannot exceed total beds');
    }

    // Convert arrays to JSON strings if provided
    const updateData: any = { ...updateListingDto };
    if (updateListingDto.amenities) {
      updateData.amenities = JSON.stringify(updateListingDto.amenities);
    }
    if (updateListingDto.nearby_landmarks) {
      updateData.nearby_landmarks = JSON.stringify(
        updateListingDto.nearby_landmarks,
      );
    }

    await this.listingRepository.update(listingId, updateData);
    return await this.findListingById(listingId);
  }

  /**
   * Soft delete a listing
   */
  async deleteListing(listingId: number, userId: number): Promise<void> {
    const listing = await this.findListingById(listingId);

    // Check ownership
    if (listing.owner_id !== userId) {
      throw new ForbiddenException('You can only delete your own listings');
    }

    await this.listingRepository.softDelete(listingId);
  }

  /**
   * Get paginated and filtered listings
   */
  async getListings(filterDto: ListingFilterDto): Promise<{
    data: PGListing[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const page = filterDto.page || 1;
    const limit = filterDto.limit || 20;
    const skip = (page - 1) * limit;

    const queryBuilder = this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.owner', 'owner')
      .leftJoinAndSelect('listing.media', 'media')
      .where('listing.deleted_at IS NULL');

    // Apply filters
    if (filterDto.city) {
      queryBuilder.andWhere('LOWER(listing.city) = LOWER(:city)', {
        city: filterDto.city,
      });
    }

    if (filterDto.state) {
      queryBuilder.andWhere('LOWER(listing.state) = LOWER(:state)', {
        state: filterDto.state,
      });
    }

    if (filterDto.min_rent !== undefined) {
      queryBuilder.andWhere('listing.monthly_rent >= :minRent', {
        minRent: filterDto.min_rent,
      });
    }

    if (filterDto.max_rent !== undefined) {
      queryBuilder.andWhere('listing.monthly_rent <= :maxRent', {
        maxRent: filterDto.max_rent,
      });
    }

    if (filterDto.room_type) {
      queryBuilder.andWhere('listing.room_type = :roomType', {
        roomType: filterDto.room_type,
      });
    }

    if (filterDto.gender_preference) {
      queryBuilder.andWhere('listing.gender_preference = :genderPreference', {
        genderPreference: filterDto.gender_preference,
      });
    }

    if (filterDto.food_type) {
      queryBuilder.andWhere('listing.food_type = :foodType', {
        foodType: filterDto.food_type,
      });
    }

    if (filterDto.status) {
      queryBuilder.andWhere('listing.status = :status', {
        status: filterDto.status,
      });
    } else {
      // By default, only show active listings
      queryBuilder.andWhere('listing.status = :status', {
        status: ListingStatus.ACTIVE,
      });
    }

    // Amenities filter (JSON contains)
    if (filterDto.amenities && filterDto.amenities.length > 0) {
      filterDto.amenities.forEach((amenity, index) => {
        queryBuilder.andWhere(`listing.amenities LIKE :amenity${index}`, {
          [`amenity${index}`]: `%${amenity}%`,
        });
      });
    }

    // Sorting
    const sortBy = filterDto.sort_by || 'created_at';
    const sortOrder = filterDto.sort_order || 'DESC';

    if (sortBy === 'rent') {
      queryBuilder.orderBy('listing.monthly_rent', sortOrder);
    } else if (sortBy === 'popularity') {
      queryBuilder.orderBy('listing.view_count', sortOrder);
    } else {
      queryBuilder.orderBy(`listing.${sortBy}`, sortOrder);
    }

    // Get total count
    const total = await queryBuilder.getCount();

    // Apply pagination
    const data = await queryBuilder.skip(skip).take(limit).getMany();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get a single listing by ID
   */
  async getListingById(listingId: number): Promise<PGListing> {
    const listing = await this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.owner', 'owner')
      .leftJoinAndSelect('listing.media', 'media')
      .where('listing.id = :id', { id: listingId })
      .andWhere('listing.deleted_at IS NULL')
      .getOne();

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    // Increment view count
    await this.listingRepository.increment({ id: listingId }, 'view_count', 1);

    return listing;
  }

  /**
   * Get all listings for a specific owner
   */
  async getOwnerListings(userId: number): Promise<PGListing[]> {
    return await this.listingRepository.find({
      where: { owner_id: userId },
      relations: ['media'],
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Toggle listing status (active/inactive/draft)
   */
  async toggleListingStatus(
    listingId: number,
    statusDto: UpdateListingStatusDto,
    userId: number,
  ): Promise<PGListing> {
    const listing = await this.findListingById(listingId);

    // Check ownership
    if (listing.owner_id !== userId) {
      throw new ForbiddenException(
        'You can only update status of your own listings',
      );
    }

    // Update status
    await this.listingRepository.update(listingId, {
      status: statusDto.status,
      rejection_reason: statusDto.rejection_reason || null,
    });

    return await this.findListingById(listingId);
  }

  /**
   * Approve a listing (admin/moderator only)
   */
  async approveListing(
    listingId: number,
    approverId: number,
  ): Promise<PGListing> {
    const listing = await this.findListingById(listingId);

    if (listing.status !== ListingStatus.PENDING_APPROVAL) {
      throw new BadRequestException(
        'Only pending listings can be approved',
      );
    }

    await this.listingRepository.update(listingId, {
      status: ListingStatus.ACTIVE,
      approved_by: approverId,
      approved_at: new Date(),
      rejection_reason: null,
    });

    return await this.findListingById(listingId);
  }

  /**
   * Reject a listing (admin/moderator only)
   */
  async rejectListing(
    listingId: number,
    reason: string,
  ): Promise<PGListing> {
    const listing = await this.findListingById(listingId);

    if (listing.status !== ListingStatus.PENDING_APPROVAL) {
      throw new BadRequestException(
        'Only pending listings can be rejected',
      );
    }

    await this.listingRepository.update(listingId, {
      status: ListingStatus.REJECTED,
      rejection_reason: reason,
    });

    return await this.findListingById(listingId);
  }

  /**
   * Submit listing for approval
   */
  async submitForApproval(
    listingId: number,
    userId: number,
  ): Promise<PGListing> {
    const listing = await this.findListingById(listingId);

    // Check ownership
    if (listing.owner_id !== userId) {
      throw new ForbiddenException(
        'You can only submit your own listings for approval',
      );
    }

    if (listing.status !== ListingStatus.DRAFT) {
      throw new BadRequestException('Only draft listings can be submitted');
    }

    await this.listingRepository.update(listingId, {
      status: ListingStatus.PENDING_APPROVAL,
    });

    return await this.findListingById(listingId);
  }

  // Private helper method
  private async findListingById(listingId: number): Promise<PGListing> {
    const listing = await this.listingRepository.findOne({
      where: { id: listingId },
      relations: ['owner', 'media'],
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }
}
