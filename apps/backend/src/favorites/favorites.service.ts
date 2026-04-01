import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../typeorm/entities/favorite.entity';
import { PGListing, ListingStatus } from '../typeorm/entities/pg-listing.entity';
import {
  AddFavoriteDto,
  UpdateFavoriteDto,
  FavoritesQueryDto,
  FavoriteResponseDto,
  FavoritesListResponseDto,
  FavoriteCheckResponseDto,
} from './dto/favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
  ) {}

  /**
   * Add a listing to favorites
   */
  async addFavorite(
    userId: number,
    dto: AddFavoriteDto,
  ): Promise<FavoriteResponseDto> {
    // Check if listing exists and is active
    const listing = await this.listingRepository.findOne({
      where: {
        id: dto.listing_id,
        status: ListingStatus.ACTIVE,
      },
      relations: ['media'],
    });

    if (!listing) {
      throw new NotFoundException('Listing not found or not active');
    }

    // Check if already favorited
    const existing = await this.favoriteRepository.findOne({
      where: {
        user_id: userId,
        listing_id: dto.listing_id,
      },
    });

    if (existing) {
      throw new ConflictException('Listing already in favorites');
    }

    // Create favorite
    const favorite = this.favoriteRepository.create({
      user_id: userId,
      listing_id: dto.listing_id,
      notes: dto.notes,
    });

    const saved = await this.favoriteRepository.save(favorite);
    return this.transformToResponse(saved, listing);
  }

  /**
   * Remove a listing from favorites
   */
  async removeFavorite(userId: number, listingId: number): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        user_id: userId,
        listing_id: listingId,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoriteRepository.remove(favorite);
  }

  /**
   * Toggle favorite status
   */
  async toggleFavorite(
    userId: number,
    listingId: number,
  ): Promise<{ is_favorite: boolean; favorite_id: number | null }> {
    const existing = await this.favoriteRepository.findOne({
      where: {
        user_id: userId,
        listing_id: listingId,
      },
    });

    if (existing) {
      await this.favoriteRepository.remove(existing);
      return { is_favorite: false, favorite_id: null };
    }

    // Add to favorites
    const listing = await this.listingRepository.findOne({
      where: {
        id: listingId,
        status: ListingStatus.ACTIVE,
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found or not active');
    }

    const favorite = this.favoriteRepository.create({
      user_id: userId,
      listing_id: listingId,
    });

    const saved = await this.favoriteRepository.save(favorite);
    return { is_favorite: true, favorite_id: saved.id };
  }

  /**
   * Update favorite notes
   */
  async updateFavorite(
    userId: number,
    favoriteId: number,
    dto: UpdateFavoriteDto,
  ): Promise<FavoriteResponseDto> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        id: favoriteId,
        user_id: userId,
      },
      relations: ['listing', 'listing.media'],
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    favorite.notes = dto.notes || null;
    const saved = await this.favoriteRepository.save(favorite);
    return this.transformToResponse(saved, favorite.listing);
  }

  /**
   * Get user's favorites list
   */
  async getFavorites(
    userId: number,
    query: FavoritesQueryDto,
  ): Promise<FavoritesListResponseDto> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const [favorites, total] = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.listing', 'listing')
      .leftJoinAndSelect('listing.media', 'media')
      .where('favorite.user_id = :userId', { userId })
      .andWhere('listing.deleted_at IS NULL')
      .orderBy('favorite.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: favorites.map((f) => this.transformToResponse(f, f.listing)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Check if a listing is favorited
   */
  async checkFavorite(
    userId: number,
    listingId: number,
  ): Promise<FavoriteCheckResponseDto> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        user_id: userId,
        listing_id: listingId,
      },
    });

    return {
      is_favorite: !!favorite,
      favorite_id: favorite?.id || null,
    };
  }

  /**
   * Check multiple listings for favorites (batch)
   */
  async checkMultipleFavorites(
    userId: number,
    listingIds: number[],
  ): Promise<Record<number, boolean>> {
    const favorites = await this.favoriteRepository.find({
      where: {
        user_id: userId,
      },
      select: ['listing_id'],
    });

    const favoriteSet = new Set(favorites.map((f) => f.listing_id));
    const result: Record<number, boolean> = {};

    listingIds.forEach((id) => {
      result[id] = favoriteSet.has(id);
    });

    return result;
  }

  /**
   * Get favorites count for user
   */
  async getFavoritesCount(userId: number): Promise<number> {
    return this.favoriteRepository.count({
      where: { user_id: userId },
    });
  }

  /**
   * Get listing IDs that user has favorited
   */
  async getFavoriteListingIds(userId: number): Promise<number[]> {
    const favorites = await this.favoriteRepository.find({
      where: { user_id: userId },
      select: ['listing_id'],
    });
    return favorites.map((f) => f.listing_id);
  }

  // Private helper methods
  private transformToResponse(
    favorite: Favorite,
    listing: PGListing,
  ): FavoriteResponseDto {
    const thumbnail =
      listing.media?.find((m) => m.type === 'image' && m.is_thumbnail)?.url ||
      listing.media?.find((m) => m.type === 'image')?.url ||
      null;

    return {
      id: favorite.id,
      listing_id: favorite.listing_id,
      notes: favorite.notes,
      created_at: favorite.created_at,
      listing: {
        id: listing.id,
        title: listing.title,
        address: listing.address,
        city: listing.city,
        monthly_rent: Number(listing.monthly_rent),
        room_type: listing.room_type,
        gender_preference: listing.gender_preference,
        available_rooms: listing.available_rooms,
        available_beds: listing.available_beds,
        average_rating: listing.average_rating
          ? Number(listing.average_rating)
          : null,
        thumbnail_url: thumbnail,
        is_available: listing.available_beds > 0 || listing.available_rooms > 0,
      },
    };
  }
}
