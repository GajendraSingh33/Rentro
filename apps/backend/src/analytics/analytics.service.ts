import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { Inquiry } from '../typeorm/entities/inquiry.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>,
  ) {}

  async getOwnerDashboardOverview(ownerId: number): Promise<any> {
    const [listings, inquiries] = await Promise.all([
      this.listingRepository.find({ where: { owner_id: ownerId } }),
      this.inquiryRepository.find({ where: { owner_id: ownerId } }),
    ]);

    const totalListings = listings.length;
    const activeListings = listings.filter(l => l.status === 'active').length;
    const draftListings = listings.filter(l => l.status === 'draft').length;
    const totalViews = listings.reduce((sum, l) => sum + l.view_count, 0);
    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter(i => i.status === 'new').length;
    const respondedInquiries = inquiries.filter(i => i.status === 'responded').length;

    return {
      listings: { total: totalListings, active: activeListings, draft: draftListings },
      views: { total: totalViews },
      inquiries: { total: totalInquiries, new: newInquiries, responded: respondedInquiries },
      inquiryRate: totalViews > 0 ? ((totalInquiries / totalViews) * 100).toFixed(2) : 0,
    };
  }

  async getListingAnalytics(listingId: number): Promise<any> {
    const listing = await this.listingRepository.findOne({ where: { id: listingId } });
    if (!listing) return null;

    const inquiries = await this.inquiryRepository.count({ where: { listing_id: listingId } });
    
    return {
      views: listing.view_count,
      inquiries,
      inquiryRate: listing.view_count > 0 ? ((inquiries / listing.view_count) * 100).toFixed(2) : 0,
      averageRating: listing.average_rating,
      reviewCount: listing.review_count,
    };
  }

  async getTopPerformingListings(ownerId: number, limit: number = 5): Promise<any[]> {
    return await this.listingRepository
      .createQueryBuilder('listing')
      .where('listing.owner_id = :ownerId', { ownerId })
      .orderBy('listing.view_count', 'DESC')
      .take(limit)
      .getMany();
  }

  async getViewsOverTime(ownerId: number, days: number = 30): Promise<any[]> {
    // Simplified - in production, use a separate analytics table
    const listings = await this.listingRepository.find({ where: { owner_id: ownerId } });
    const totalViews = listings.reduce((sum, l) => sum + l.view_count, 0);
    return [{ date: new Date().toISOString().split('T')[0], views: totalViews }];
  }

  async getInquiriesOverTime(ownerId: number, days: number = 30): Promise<any[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const inquiries = await this.inquiryRepository
      .createQueryBuilder('inquiry')
      .where('inquiry.owner_id = :ownerId', { ownerId })
      .andWhere('inquiry.created_at >= :startDate', { startDate })
      .select("DATE(inquiry.created_at)", "date")
      .addSelect("COUNT(*)", "count")
      .groupBy("DATE(inquiry.created_at)")
      .getRawMany();

    return inquiries;
  }
}
