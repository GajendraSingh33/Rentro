import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { Inquiry } from '../typeorm/entities/inquiry.entity';
import { Review } from '../typeorm/entities/review.entity';
import {
  ListUsersDto,
  UpdateUserStatusDto,
  UpdateUserRoleDto,
  AdminUpdateUserDto,
  ListListingsDto,
  ModerationActionDto,
  VerifyListingDto,
  FeatureListingDto,
  AnalyticsQueryDto,
  PlatformOverviewDto,
} from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  // ============ User Management ============

  async listUsers(dto: ListUsersDto) {
    const { search, role, status, page = 1, limit = 20, sort_by, sort_order } = dto;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    // Search by name or email
    if (search) {
      queryBuilder.andWhere(
        '(user.first_name ILIKE :search OR user.last_name ILIKE :search OR user.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Filter by role
    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    // Filter by status
    if (status) {
      queryBuilder.andWhere('user.status = :status', { status });
    }

    // Sorting
    const validSortFields = ['created_at', 'email', 'first_name', 'last_name', 'role'];
    const sortField = validSortFields.includes(sort_by) ? sort_by : 'created_at';
    queryBuilder.orderBy(`user.${sortField}`, sort_order === 'ASC' ? 'ASC' : 'DESC');

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [users, total] = await queryBuilder.getManyAndCount();

    // Get additional stats for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const [listingsCount, inquiriesCount, reviewsCount] = await Promise.all([
          this.listingRepository.count({ where: { owner_id: user.id } }),
          this.inquiryRepository.count({ where: { seeker_id: user.id } }),
          this.reviewRepository.count({ where: { user_id: user.id } }),
        ]);

        return {
          ...user,
          password_hash: undefined,
          listings_count: listingsCount,
          inquiries_count: inquiriesCount,
          reviews_count: reviewsCount,
        };
      }),
    );

    return {
      data: usersWithStats,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [listings, inquiries, reviews] = await Promise.all([
      this.listingRepository.find({
        where: { owner_id: id },
        select: ['id', 'title', 'city', 'status', 'created_at'],
        take: 10,
        order: { created_at: 'DESC' },
      }),
      this.inquiryRepository.find({
        where: { seeker_id: id },
        take: 10,
        order: { created_at: 'DESC' },
      }),
      this.reviewRepository.find({
        where: { user_id: id },
        take: 10,
        order: { created_at: 'DESC' },
      }),
    ]);

    return {
      ...user,
      password_hash: undefined,
      listings,
      inquiries,
      reviews,
    };
  }

  async updateUserStatus(id: number, dto: UpdateUserStatusDto, adminId: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id === adminId) {
      throw new BadRequestException('Cannot change your own status');
    }

    user.status = dto.status;
    // Could add status_reason field to user entity if needed
    await this.userRepository.save(user);

    return { message: 'User status updated', user: { ...user, password_hash: undefined } };
  }

  async updateUserRole(id: number, dto: UpdateUserRoleDto, adminId: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id === adminId) {
      throw new BadRequestException('Cannot change your own role');
    }

    user.role = dto.role as any;
    await this.userRepository.save(user);

    return { message: 'User role updated', user: { ...user, password_hash: undefined } };
  }

  async updateUser(id: number, dto: AdminUpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, dto);
    await this.userRepository.save(user);

    return { message: 'User updated', user: { ...user, password_hash: undefined } };
  }

  async deleteUser(id: number, adminId: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id === adminId) {
      throw new BadRequestException('Cannot delete yourself');
    }

    // Soft delete
    await this.userRepository.softDelete(id);

    return { message: 'User deleted successfully' };
  }

  // ============ Listing Moderation ============

  async listListings(dto: ListListingsDto) {
    const { search, status, city, owner_id, is_verified, is_featured, page = 1, limit = 20 } = dto;

    const queryBuilder = this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.owner', 'owner');

    // Search
    if (search) {
      queryBuilder.andWhere(
        '(listing.title ILIKE :search OR listing.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Filters
    if (status) {
      queryBuilder.andWhere('listing.status = :status', { status });
    }

    if (city) {
      queryBuilder.andWhere('listing.city ILIKE :city', { city: `%${city}%` });
    }

    if (owner_id) {
      queryBuilder.andWhere('listing.owner_id = :owner_id', { owner_id });
    }

    if (is_verified !== undefined) {
      queryBuilder.andWhere('listing.is_verified = :is_verified', { is_verified });
    }

    if (is_featured !== undefined) {
      queryBuilder.andWhere('listing.is_featured = :is_featured', { is_featured });
    }

    // Order by pending first, then by created_at
    queryBuilder.orderBy('listing.created_at', 'DESC');

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [listings, total] = await queryBuilder.getManyAndCount();

    // Get inquiry counts
    const listingsWithStats = await Promise.all(
      listings.map(async (listing) => {
        const inquiryCount = await this.inquiryRepository.count({
          where: { listing_id: listing.id },
        });

        return {
          ...listing,
          inquiry_count: inquiryCount,
          owner: listing.owner
            ? {
                id: listing.owner.id,
                name: `${listing.owner.first_name} ${listing.owner.last_name}`,
                email: listing.owner.email,
              }
            : null,
        };
      }),
    );

    return {
      data: listingsWithStats,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async getListingById(id: number) {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['owner', 'media'],
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    const [inquiryCount, reviewCount] = await Promise.all([
      this.inquiryRepository.count({ where: { listing_id: id } }),
      this.reviewRepository.count({ where: { listing_id: id } }),
    ]);

    return {
      ...listing,
      inquiry_count: inquiryCount,
      review_count: reviewCount,
      owner: listing.owner
        ? {
            id: listing.owner.id,
            name: `${listing.owner.first_name} ${listing.owner.last_name}`,
            email: listing.owner.email,
            phone: listing.owner.phone,
          }
        : null,
    };
  }

  async moderateListing(id: number, dto: ModerationActionDto, adminId: number) {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    listing.status = dto.status;
    // Could store moderation history with admin_id, reason, etc.
    await this.listingRepository.save(listing);

    // TODO: If notify_owner is true, send email notification

    return { message: `Listing ${dto.status}`, listing };
  }

  async verifyListing(id: number, dto: VerifyListingDto) {
    const listing = await this.listingRepository.findOne({ where: { id } });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    listing.is_verified = dto.is_verified;
    await this.listingRepository.save(listing);

    return { message: `Listing ${dto.is_verified ? 'verified' : 'unverified'}`, listing };
  }

  async featureListing(id: number, dto: FeatureListingDto) {
    const listing = await this.listingRepository.findOne({ where: { id } });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    listing.is_featured = dto.is_featured;
    // Could add featured_until field to listing entity
    await this.listingRepository.save(listing);

    return { message: `Listing ${dto.is_featured ? 'featured' : 'unfeatured'}`, listing };
  }

  async deleteListing(id: number) {
    const listing = await this.listingRepository.findOne({ where: { id } });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    await this.listingRepository.softDelete(id);

    return { message: 'Listing deleted successfully' };
  }

  // ============ Analytics ============

  async getPlatformOverview(): Promise<PlatformOverviewDto> {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(todayStart);
    monthStart.setMonth(monthStart.getMonth() - 1);

    // User stats
    const [
      totalUsers,
      totalSeekers,
      totalOwners,
      totalAdmins,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
    ] = await Promise.all([
      this.userRepository.count(),
      this.userRepository.count({ where: { role: 'SEEKER' as any } }),
      this.userRepository.count({ where: { role: 'OWNER' as any } }),
      this.userRepository.count({ where: { role: 'ADMIN' as any } }),
      this.userRepository.count({ where: { created_at: MoreThanOrEqual(todayStart) } }),
      this.userRepository.count({ where: { created_at: MoreThanOrEqual(weekStart) } }),
      this.userRepository.count({ where: { created_at: MoreThanOrEqual(monthStart) } }),
    ]);

    // Listing stats
    const [
      totalListings,
      activeListings,
      pendingListings,
      verifiedListings,
      featuredListings,
      newListingsToday,
      newListingsThisWeek,
    ] = await Promise.all([
      this.listingRepository.count(),
      this.listingRepository.count({ where: { status: 'approved' } }),
      this.listingRepository.count({ where: { status: 'pending' } }),
      this.listingRepository.count({ where: { is_verified: true } }),
      this.listingRepository.count({ where: { is_featured: true } }),
      this.listingRepository.count({ where: { created_at: MoreThanOrEqual(todayStart) } }),
      this.listingRepository.count({ where: { created_at: MoreThanOrEqual(weekStart) } }),
    ]);

    // Inquiry stats
    const [totalInquiries, pendingInquiries, respondedInquiries, newInquiriesToday] =
      await Promise.all([
        this.inquiryRepository.count(),
        this.inquiryRepository.count({ where: { status: 'pending' } }),
        this.inquiryRepository.count({ where: { status: 'responded' } }),
        this.inquiryRepository.count({ where: { created_at: MoreThanOrEqual(todayStart) } }),
      ]);

    // Review stats
    const totalReviews = await this.reviewRepository.count();
    const avgRatingResult = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.overall_rating)', 'avg')
      .getRawOne();

    return {
      total_users: totalUsers,
      total_seekers: totalSeekers,
      total_owners: totalOwners,
      total_admins: totalAdmins,
      new_users_today: newUsersToday,
      new_users_this_week: newUsersThisWeek,
      new_users_this_month: newUsersThisMonth,

      total_listings: totalListings,
      active_listings: activeListings,
      pending_listings: pendingListings,
      verified_listings: verifiedListings,
      featured_listings: featuredListings,
      new_listings_today: newListingsToday,
      new_listings_this_week: newListingsThisWeek,

      total_inquiries: totalInquiries,
      pending_inquiries: pendingInquiries,
      responded_inquiries: respondedInquiries,
      new_inquiries_today: newInquiriesToday,

      total_reviews: totalReviews,
      average_platform_rating: parseFloat(avgRatingResult?.avg) || 0,
    };
  }

  async getUserGrowthStats(dto: AnalyticsQueryDto) {
    const { start_date, end_date, granularity = 'day' } = dto;

    const startDate = start_date ? new Date(start_date) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = end_date ? new Date(end_date) : new Date();

    // Get daily/weekly/monthly user registrations
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .select(
        granularity === 'day'
          ? "DATE(user.created_at) as date"
          : granularity === 'week'
          ? "DATE_TRUNC('week', user.created_at) as date"
          : "DATE_TRUNC('month', user.created_at) as date",
      )
      .addSelect('COUNT(*)', 'total')
      .addSelect("COUNT(CASE WHEN user.role = 'SEEKER' THEN 1 END)", 'seekers')
      .addSelect("COUNT(CASE WHEN user.role = 'OWNER' THEN 1 END)", 'owners')
      .where('user.created_at BETWEEN :start AND :end', { start: startDate, end: endDate })
      .groupBy('date')
      .orderBy('date', 'ASC');

    const results = await queryBuilder.getRawMany();

    return results.map((r) => ({
      date: r.date,
      total_users: parseInt(r.total),
      new_seekers: parseInt(r.seekers),
      new_owners: parseInt(r.owners),
    }));
  }

  async getListingStats(dto: AnalyticsQueryDto) {
    const { start_date, end_date } = dto;

    const startDate = start_date ? new Date(start_date) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = end_date ? new Date(end_date) : new Date();

    const queryBuilder = this.listingRepository
      .createQueryBuilder('listing')
      .select('DATE(listing.created_at)', 'date')
      .addSelect('COUNT(*)', 'total')
      .addSelect("COUNT(CASE WHEN listing.status = 'approved' THEN 1 END)", 'approved')
      .addSelect("COUNT(CASE WHEN listing.status = 'rejected' THEN 1 END)", 'rejected')
      .where('listing.created_at BETWEEN :start AND :end', { start: startDate, end: endDate })
      .groupBy('date')
      .orderBy('date', 'ASC');

    const results = await queryBuilder.getRawMany();

    return results.map((r) => ({
      date: r.date,
      total_listings: parseInt(r.total),
      new_listings: parseInt(r.total),
      approved_listings: parseInt(r.approved),
      rejected_listings: parseInt(r.rejected),
    }));
  }

  async getCityStats() {
    const results = await this.listingRepository
      .createQueryBuilder('listing')
      .select('listing.city', 'city')
      .addSelect('COUNT(*)', 'total_listings')
      .addSelect('AVG(listing.monthly_rent)', 'average_rent')
      .where("listing.status = 'approved'")
      .groupBy('listing.city')
      .orderBy('total_listings', 'DESC')
      .limit(20)
      .getRawMany();

    // Get inquiry counts per city
    const citiesWithInquiries = await Promise.all(
      results.map(async (r) => {
        const inquiryCount = await this.inquiryRepository
          .createQueryBuilder('inquiry')
          .leftJoin('inquiry.listing', 'listing')
          .where('listing.city = :city', { city: r.city })
          .getCount();

        return {
          city: r.city,
          total_listings: parseInt(r.total_listings),
          average_rent: Math.round(parseFloat(r.average_rent)),
          total_inquiries: inquiryCount,
        };
      }),
    );

    return citiesWithInquiries;
  }

  async getRecentActivity(limit: number = 20) {
    const [recentUsers, recentListings, recentInquiries, recentReviews] = await Promise.all([
      this.userRepository.find({
        select: ['id', 'email', 'first_name', 'last_name', 'role', 'created_at'],
        order: { created_at: 'DESC' },
        take: limit,
      }),
      this.listingRepository.find({
        select: ['id', 'title', 'city', 'status', 'created_at'],
        relations: ['owner'],
        order: { created_at: 'DESC' },
        take: limit,
      }),
      this.inquiryRepository.find({
        order: { created_at: 'DESC' },
        take: limit,
        relations: ['seeker', 'listing'],
      }),
      this.reviewRepository.find({
        order: { created_at: 'DESC' },
        take: limit,
        relations: ['user', 'listing'],
      }),
    ]);

    // Combine and sort by timestamp
    const activities = [
      ...recentUsers.map((u) => ({
        type: 'user_registered',
        timestamp: u.created_at,
        data: { id: u.id, name: `${u.first_name} ${u.last_name}`, role: u.role },
      })),
      ...recentListings.map((l) => ({
        type: 'listing_created',
        timestamp: l.created_at,
        data: { id: l.id, title: l.title, city: l.city, status: l.status },
      })),
      ...recentInquiries.map((i) => ({
        type: 'inquiry_sent',
        timestamp: i.created_at,
        data: {
          id: i.id,
          seeker: i.seeker ? `${i.seeker.first_name} ${i.seeker.last_name}` : 'Unknown',
          listing: i.listing?.title || 'Unknown',
        },
      })),
      ...recentReviews.map((r) => ({
        type: 'review_posted',
        timestamp: r.created_at,
        data: {
          id: r.id,
          user: r.user ? `${r.user.first_name} ${r.user.last_name}` : 'Unknown',
          listing: r.listing?.title || 'Unknown',
          rating: r.overall_rating,
        },
      })),
    ];

    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return activities.slice(0, limit);
  }
}
