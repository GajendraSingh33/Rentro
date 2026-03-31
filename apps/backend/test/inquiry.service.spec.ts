import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InquiryService } from '../src/inquiries/inquiry.service';
import { Inquiry, InquiryStatus } from '../src/typeorm/entities/inquiry.entity';
import { PGListing } from '../src/typeorm/entities/pg-listing.entity';
import { User } from '../src/typeorm/entities/user.entity';

describe('InquiryService', () => {
  let service: InquiryService;
  let inquiryRepository: Repository<Inquiry>;

  const mockUser: Partial<User> = {
    id: 1,
    name: 'Test Seeker',
    email: 'seeker@test.com',
    phone: '9876543210',
  };

  const mockListing: Partial<PGListing> = {
    id: 1,
    owner_id: 2,
    title: 'Test Listing',
  };

  const mockInquiry: Partial<Inquiry> = {
    id: 1,
    seeker_id: 1,
    owner_id: 2,
    listing_id: 1,
    message: 'I am interested in this PG',
    status: InquiryStatus.NEW,
    contact_revealed: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockInquiryRepository = {
    create: jest.fn().mockReturnValue(mockInquiry),
    save: jest.fn().mockResolvedValue(mockInquiry),
    findOne: jest.fn().mockResolvedValue(mockInquiry),
    find: jest.fn().mockResolvedValue([mockInquiry]),
    findAndCount: jest.fn().mockResolvedValue([[mockInquiry], 1]),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    count: jest.fn().mockResolvedValue(5),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[mockInquiry], 1]),
    })),
  };

  const mockListingRepository = {
    findOne: jest.fn().mockResolvedValue(mockListing),
  };

  const mockUserRepository = {
    findOne: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InquiryService,
        {
          provide: getRepositoryToken(Inquiry),
          useValue: mockInquiryRepository,
        },
        {
          provide: getRepositoryToken(PGListing),
          useValue: mockListingRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<InquiryService>(InquiryService);
    inquiryRepository = module.get<Repository<Inquiry>>(getRepositoryToken(Inquiry));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createInquiry', () => {
    it('should create a new inquiry', async () => {
      const createDto = {
        listing_id: 1,
        message: 'I am interested in this PG',
        preferred_move_in_date: new Date(),
      };

      const result = await service.createInquiry(1, createDto as any);

      expect(mockListingRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockInquiryRepository.create).toHaveBeenCalled();
      expect(mockInquiryRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockInquiry);
    });

    it('should throw error if listing not found', async () => {
      mockListingRepository.findOne.mockResolvedValueOnce(null);

      const createDto = {
        listing_id: 999,
        message: 'I am interested',
      };

      await expect(service.createInquiry(1, createDto as any)).rejects.toThrow();
    });
  });

  describe('getInquiryById', () => {
    it('should return an inquiry by id', async () => {
      const result = await service.getInquiryById(1);

      expect(mockInquiryRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockInquiry);
    });

    it('should throw NotFoundException when inquiry not found', async () => {
      mockInquiryRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.getInquiryById(999)).rejects.toThrow();
    });
  });

  describe('updateStatus', () => {
    it('should update inquiry status', async () => {
      mockInquiryRepository.findOne.mockResolvedValueOnce(mockInquiry);
      mockInquiryRepository.save.mockResolvedValueOnce({ ...mockInquiry, status: InquiryStatus.VIEWED });

      const result = await service.updateStatus(1, { status: InquiryStatus.VIEWED });

      expect(result.status).toBe(InquiryStatus.VIEWED);
    });
  });

  describe('respondToInquiry', () => {
    it('should add response to inquiry', async () => {
      const responseMessage = 'Thank you for your interest!';
      mockInquiryRepository.findOne.mockResolvedValueOnce(mockInquiry);
      mockInquiryRepository.save.mockResolvedValueOnce({
        ...mockInquiry,
        response_message: responseMessage,
        status: InquiryStatus.RESPONDED,
      });

      const result = await service.respondToInquiry(1, responseMessage);

      expect(result.response_message).toBe(responseMessage);
      expect(result.status).toBe(InquiryStatus.RESPONDED);
    });
  });

  describe('revealContact', () => {
    it('should reveal seeker contact', async () => {
      mockInquiryRepository.findOne.mockResolvedValueOnce({
        ...mockInquiry,
        seeker: mockUser,
      });
      mockInquiryRepository.save.mockResolvedValueOnce({
        ...mockInquiry,
        contact_revealed: true,
      });

      const result = await service.revealContact(1);

      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('phone');
    });
  });

  describe('getOwnerInquiryStats', () => {
    it('should return inquiry statistics', async () => {
      mockInquiryRepository.count
        .mockResolvedValueOnce(10) // total
        .mockResolvedValueOnce(3)  // new
        .mockResolvedValueOnce(5)  // responded
        .mockResolvedValueOnce(2); // rejected

      const result = await service.getOwnerInquiryStats(2);

      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('new');
      expect(result).toHaveProperty('responded');
    });
  });
});
