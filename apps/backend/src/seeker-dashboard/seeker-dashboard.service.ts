import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../typeorm/entities/favorite.entity';
import { Inquiry, InquiryStatus } from '../typeorm/entities/inquiry.entity';
import { Review } from '../typeorm/entities/review.entity';
import { PGListing, ListingStatus } from '../typeorm/entities/pg-listing.entity';
import {
  SeekerDashboardOverviewDto,
  DashboardQueryDto,
  InquiryHistoryDto,
  InquiryHistoryListDto,
  RecentFavoriteDto,
  RecentInquiryDto,
  RecommendedListingDto,
} from './dto/seeker-dashboard.dto';

@Injectable()
export class SeekerDashboardService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
  ) {}

  /**
   * Get seeker dashboard overview
   */
  async getDashboardOverview(userId: number): Promise<SeekerDashboardOverviewDto> {
    // Get counts
    const [
      favoritesCount,
      inquiriesSent,
      inquiriesResponded,
      reviewsWritten,
    ] = await Promise.all([
      this.favoriteRepository.count({ where: { user_id: userId } }),
      this.inquiryRepository.count({ where: { seeker_id: userId } }),
      this.inquiryRepository.count({
        where: {
          seeker_id: userId,
          status: InquiryStatus.RESPONDED,
        },
      }),
      this.reviewRepository.count({ where: { user_id: userId } }),
    ]);

    // Get recent favorites
    const recentFavorites = await this.getRecentFavorites(userId, 5);

    // Get recent inquiries
    const recentInquiries = await this.getRecentInquiries(userId, 5);

    // Get recommended listings
    const recommendedListings = await this.getRecommendedListings(userId, 6);

    return {
      favorites_count: favoritesCount,
      inquiries_sent: inquiriesSent,
      inquiries_responded: inquiriesResponded,
      reviews_written: reviewsWritten,
      recent_favorites: recentFavorites,
      recent_inquiries: recentInquiries,
      recommended_listings: recommendedListings,
    };
  }

  /**
   * Get seeker's inquiry history
   */
  async getInquiryHistory(
    userId: number,
    query: DashboardQueryDto,
  ): Promise<InquiryHistoryListDto> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [inquiries, total] = await this.inquiryRepository
      .createQueryBuilder('inquiry')
      .leftJoinAndSelect('inquiry.listing', 'listing')
      .leftJoinAndSelect('listing.owner', 'owner')
      .leftJoinAndSelect('listing.media', 'media')
      .where('inquiry.seeker_id = :userId', { userId })
      .orderBy('inquiry.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const data: InquiryHistoryDto[] = inquiries.map((inquiry) => {
      const thumbnail =
        inquiry.listing?.media?.find((m) => m.type === 'image' && m.is_thumbnail)?.url ||
        inquiry.listing?.media?.find((m) => m.type === 'image')?.url ||
        null;

      return {
        id: inquiry.id,
        listing_id: inquiry.listing_id,
        listing: {
          id: inquiry.listing?.id,
          title: inquiry.listing?.title || 'Listing Unavailable',
          address: inquiry.listing?.address || '',
          city: inquiry.listing?.city || '',
          monthly_rent: Number(inquiry.listing?.monthly_rent) || 0,
          thumbnail_url: thumbnail,
          owner_name: inquiry.listing?.owner
            ? `${inquiry.listing.owner.first_name} ${inquiry.listing.owner.last_name || ''}`
            : 'Unknown',
        },
        message: inquiry.message,
        status: inquiry.status,
        response: inquiry.response || null,
        responded_at: inquiry.responded_at || null,
        contact_revealed: inquiry.contact_revealed || false,
        created_at: inquiry.created_at,
      };
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get inquiry statistics
   */
  async getInquiryStats(userId: number): Promise<{
    total: number;
    pending: number;
    viewed: number;
    responded: number;
    rejected: number;
  }> {
    const stats = await this.inquiryRepository
      .createQueryBuilder('inquiry')
      .select('inquiry.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('inquiry.seeker_id = :userId', { userId })
      .groupBy('inquiry.status')
      .getRawMany();

    const result = {
      total: 0,
      pending: 0,
      viewed: 0,
      responded: 0,
      rejected: 0,
    };

    stats.forEach((s) => {
      const count = parseInt(s.count);
      result.total += count;
      
      switch (s.status) {
        case InquiryStatus.NEW:
          result.pending = count;
          break;
        case InquiryStatus.VIEWED:
          result.viewed = count;
          break;
        case InquiryStatus.RESPONDED:
          result.responded = count;
          break;
        case InquiryStatus.REJECTED:
          result.rejected = count;
          break;
      }
    });

    return result;
  }

  /**
   * Get activity timeline
   */
  async getActivityTimeline(
    userId: number,
    limit: number = 20,
  ): Promise<Array<{
    type: 'favorite' | 'inquiry' | 'review' | 'inquiry_response';
    title: string;
    description: string;
    listing_id: number | null;
    created_at: Date;
  }>> {
    // Get recent favorites
    const favorites = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.listing', 'listing')
      .where('favorite.user_id = :userId', { userId })
      .orderBy('favorite.created_at', 'DESC')
      .limit(10)
      .getMany();

    // Get recent inquiries
    const inquiries = await this.inquiryRepository
      .createQueryBuilder('inquiry')
      .leftJoinAndSelect('inquiry.listing', 'listing')
      .where('inquiry.seeker_id = :userId', { userId })
      .orderBy('inquiry.created_at', 'DESC')
      .limit(10)
      .getMany();

    // Get recent reviews
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.listing', 'listing')
      .where('review.user_id = :userId', { userId })
      .orderBy('review.created_at', 'DESC')
      .limit(10)
      .getMany();

    // Combine and sort
    const timeline: Array<{
      type: 'favorite' | 'inquiry' | 'review' | 'inquiry_response';
      title: string;
      description: string;
      listing_id: number | null;
      created_at: Date;
    }> = [];

    favorites.forEach((f) => {
      timeline.push({
        type: 'favorite',
        title: 'Added to favorites',
        description: f.listing?.title || 'Unknown listing',
        listing_id: f.listing_id,
        created_at: f.created_at,
      });
    });

    inquiries.forEach((i) => {
      timeline.push({
        type: 'inquiry',
        title: 'Sent inquiry',
        description: i.listing?.title || 'Unknown listing',
        listing_id: i.listing_id,
        created_at: i.created_at,
      });

      if (i.responded_at) {
        timeline.push({
          type: 'inquiry_response',
          title: 'Received response',
          description: i.listing?.title || 'Unknown listing',
          listing_id: i.listing_id,
          created_at: i.responded_at,
        });
      }
    });

    reviews.forEach((r) => {
      timeline.push({
        type: 'review',
        title: 'Posted review',
        description: `${r.rating} stars - ${r.listing?.title || 'Unknown listing'}`,
        listing_id: r.listing_id,
        created_at: r.created_at,
      });
    });

    // Sort by date and limit
    return timeline
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(0, limit);
  }

  // Private helper methods

  private async getRecentFavorites(
    userId: number,
    limit: number,
  ): Promise<RecentFavoriteDto[]> {
    const favorites = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.listing', 'listing')
      .leftJoinAndSelect('listing.media', 'media')
      .where('favorite.user_id = :userId', { userId })
      .orderBy('favorite.created_at', 'DESC')
      .limit(limit)
      .getMany();

    return favorites.map((f) => {
      const thumbnail =
        f.listing?.media?.find((m) => m.type === 'image' && m.is_thumbnail)?.url ||
        f.listing?.media?.find((m) => m.type === 'image')?.url ||
        null;

      return {
        id: f.id,
        listing_id: f.listing_id,
        title: f.listing?.title || 'Unavailable',
        city: f.listing?.city || '',
        monthly_rent: Number(f.listing?.monthly_rent) || 0,
        thumbnail_url: thumbnail,
        created_at: f.created_at,
      };
    });
  }

  private async getRecentInquiries(
    userId: number,
    limit: number,
  ): Promise<RecentInquiryDto[]> {
    const inquiries = await this.inquiryRepository
      .createQueryBuilder('inquiry')
      .leftJoinAndSelect('inquiry.listing', 'listing')
      .leftJoinAndSelect('listing.owner', 'owner')
      .where('inquiry.seeker_id = :userId', { userId })
      .orderBy('inquiry.created_at', 'DESC')
      .limit(limit)
      .getMany();

    return inquiries.map((i) => ({
      id: i.id,
      listing_id: i.listing_id,
      listing_title: i.listing?.title || 'Unavailable',
      status: i.status,
      owner_name: i.listing?.owner
        ? `${i.listing.owner.first_name} ${i.listing.owner.last_name || ''}`
        : 'Unknown',
      has_response: !!i.response,
      created_at: i.created_at,
    }));
  }

  private async getRecommendedListings(
    userId: number,
    limit: number,
  ): Promise<RecommendedListingDto[]> {
    // Get user's favorite cities and price ranges for recommendations
    const favorites = await this.favoriteRepository.find({
      where: { user_id: userId },
      relations: ['listing'],
      take: 10,
    });

    const favoriteCities = [...new Set(favorites.map((f) => f.listing?.city).filter(Boolean))];
    const favoriteListingIds = favorites.map((f) => f.listing_id);

    // Build query for recommendations
    const queryBuilder = this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.media', 'media')
      .where('listing.status = :status', { status: ListingStatus.ACTIVE })
      .andWhere('listing.deleted_at IS NULL')
      .andWhere('(listing.available_beds > 0 OR listing.available_rooms > 0)');

    // Exclude already favorited
    if (favoriteListingIds.length > 0) {
      queryBuilder.andWhere('listing.id NOT IN (:...favoriteIds)', {
        favoriteIds: favoriteListingIds,
      });
    }

    // Prefer user's favorite cities
    if (favoriteCities.length > 0) {
      queryBuilder.addOrderBy(
        `CASE WHEN listing.city IN ('${favoriteCities.join("','")}') THEN 0 ELSE 1 END`,
        'ASC',
      );
    }

    // Order by quality metrics
    queryBuilder
      .addOrderBy('listing.is_featured', 'DESC')
      .addOrderBy('listing.average_rating', 'DESC', 'NULLS LAST')
      .addOrderBy('listing.view_count', 'DESC')
      .limit(limit);

    const listings = await queryBuilder.getMany();

    return listings.map((l) => {
      const thumbnail =
        l.media?.find((m) => m.type === 'image' && m.is_thumbnail)?.url ||
        l.media?.find((m) => m.type === 'image')?.url ||
        null;

      return {
        id: l.id,
        title: l.title,
        address: l.address,
        city: l.city,
        monthly_rent: Number(l.monthly_rent),
        room_type: l.room_type,
        average_rating: l.average_rating ? Number(l.average_rating) : null,
        thumbnail_url: thumbnail,
      };
    });
  }
}
