import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry, InquiryStatus } from '../typeorm/entities/inquiry.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { User } from '../typeorm/entities/user.entity';
import {
  CreateInquiryDto,
  UpdateInquiryStatusDto,
  RespondToInquiryDto,
  InquiryFilterDto,
} from './dto/inquiry.dto';

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>,
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createInquiry(
    createInquiryDto: CreateInquiryDto,
    seekerId: number,
  ): Promise<Inquiry> {
    const listing = await this.listingRepository.findOne({
      where: { id: createInquiryDto.listing_id },
      relations: ['owner'],
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    const seeker = await this.userRepository.findOne({
      where: { id: seekerId },
    });

    const inquiry = this.inquiryRepository.create({
      ...createInquiryDto,
      seeker_id: seekerId,
      owner_id: listing.owner_id,
      seeker_name: seeker.full_name,
      seeker_email: seeker.email,
      seeker_phone: seeker.phone_number,
      status: InquiryStatus.NEW,
    });

    // Increment inquiry count on listing
    await this.listingRepository.increment(
      { id: listing.id },
      'inquiry_count',
      1,
    );

    return await this.inquiryRepository.save(inquiry);
  }

  async getInquiries(
    userId: number,
    isOwner: boolean,
    filterDto: InquiryFilterDto,
  ): Promise<any> {
    const page = filterDto.page || 1;
    const limit = filterDto.limit || 20;
    const skip = (page - 1) * limit;

    const query = this.inquiryRepository
      .createQueryBuilder('inquiry')
      .leftJoinAndSelect('inquiry.listing', 'listing')
      .leftJoinAndSelect('inquiry.seeker', 'seeker')
      .leftJoinAndSelect('inquiry.owner', 'owner');

    if (isOwner) {
      query.where('inquiry.owner_id = :userId', { userId });
    } else {
      query.where('inquiry.seeker_id = :userId', { userId });
    }

    if (filterDto.status) {
      query.andWhere('inquiry.status = :status', { status: filterDto.status });
    }

    if (filterDto.listing_id) {
      query.andWhere('inquiry.listing_id = :listingId', {
        listingId: filterDto.listing_id,
      });
    }

    const total = await query.getCount();
    const data = await query
      .orderBy('inquiry.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getMany();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateStatus(
    inquiryId: number,
    statusDto: UpdateInquiryStatusDto,
    userId: number,
  ): Promise<Inquiry> {
    const inquiry = await this.inquiryRepository.findOne({
      where: { id: inquiryId },
    });

    if (!inquiry) {
      throw new NotFoundException('Inquiry not found');
    }

    if (inquiry.owner_id !== userId) {
      throw new ForbiddenException('Only the owner can update inquiry status');
    }

    await this.inquiryRepository.update(inquiryId, {
      status: statusDto.status,
      viewed_at: statusDto.status === InquiryStatus.VIEWED ? new Date() : inquiry.viewed_at,
    });

    return await this.inquiryRepository.findOne({ where: { id: inquiryId } });
  }

  async respondToInquiry(
    inquiryId: number,
    respondDto: RespondToInquiryDto,
    userId: number,
  ): Promise<Inquiry> {
    const inquiry = await this.inquiryRepository.findOne({
      where: { id: inquiryId },
    });

    if (!inquiry) {
      throw new NotFoundException('Inquiry not found');
    }

    if (inquiry.owner_id !== userId) {
      throw new ForbiddenException('Only the owner can respond');
    }

    await this.inquiryRepository.update(inquiryId, {
      owner_response: respondDto.response,
      status: InquiryStatus.RESPONDED,
      responded_at: new Date(),
    });

    return await this.inquiryRepository.findOne({ where: { id: inquiryId } });
  }

  async revealContact(inquiryId: number, userId: number): Promise<any> {
    const inquiry = await this.inquiryRepository.findOne({
      where: { id: inquiryId },
      relations: ['listing'],
    });

    if (!inquiry) {
      throw new NotFoundException('Inquiry not found');
    }

    if (inquiry.seeker_id !== userId) {
      throw new ForbiddenException('Unauthorized');
    }

    if (!inquiry.contact_revealed) {
      await this.inquiryRepository.update(inquiryId, {
        contact_revealed: true,
        contact_revealed_at: new Date(),
      });
    }

    return {
      contact_phone: inquiry.listing.contact_phone,
      contact_email: inquiry.listing.contact_email,
      preferred_contact_method: inquiry.listing.preferred_contact_method,
    };
  }

  async getInquiryStats(userId: number): Promise<any> {
    const [total, newCount, respondedCount, rejectedCount] = await Promise.all([
      this.inquiryRepository.count({ where: { owner_id: userId } }),
      this.inquiryRepository.count({
        where: { owner_id: userId, status: InquiryStatus.NEW },
      }),
      this.inquiryRepository.count({
        where: { owner_id: userId, status: InquiryStatus.RESPONDED },
      }),
      this.inquiryRepository.count({
        where: { owner_id: userId, status: InquiryStatus.REJECTED },
      }),
    ]);

    return {
      total,
      new: newCount,
      responded: respondedCount,
      rejected: rejectedCount,
    };
  }
}
