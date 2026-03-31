import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModerationService } from '../src/moderation/moderation.service';
import { PGListing, ListingStatus } from '../src/typeorm/entities/pg-listing.entity';

describe('ModerationService', () => {
  let service: ModerationService;
  let repository: Repository<PGListing>;

  const mockListing: Partial<PGListing> = {
    id: 1,
    owner_id: 1,
    title: 'Test Listing',
    status: ListingStatus.PENDING_APPROVAL,
    is_flagged: false,
    created_at: new Date(),
  };

  const mockRepository = {
    findOne: jest.fn().mockResolvedValue(mockListing),
    findAndCount: jest.fn().mockResolvedValue([[mockListing], 1]),
    save: jest.fn().mockResolvedValue(mockListing),
    count: jest.fn().mockResolvedValue(5),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModerationService,
        {
          provide: getRepositoryToken(PGListing),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ModerationService>(ModerationService);
    repository = module.get<Repository<PGListing>>(getRepositoryToken(PGListing));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPendingListings', () => {
    it('should return paginated pending listings', async () => {
      const result = await service.getPendingListings(1, 10);

      expect(mockRepository.findAndCount).toHaveBeenCalled();
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(result.meta.total).toBe(1);
    });
  });

  describe('approveListing', () => {
    it('should approve a pending listing', async () => {
      mockRepository.findOne.mockResolvedValueOnce(mockListing);
      mockRepository.save.mockResolvedValueOnce({
        ...mockListing,
        status: ListingStatus.ACTIVE,
        approved_at: expect.any(Date),
      });

      const result = await service.approveListing(1, 99);

      expect(result.status).toBe(ListingStatus.ACTIVE);
    });

    it('should throw error if listing not pending', async () => {
      mockRepository.findOne.mockResolvedValueOnce({
        ...mockListing,
        status: ListingStatus.ACTIVE,
      });

      await expect(service.approveListing(1, 99)).rejects.toThrow();
    });
  });

  describe('rejectListing', () => {
    it('should reject a pending listing', async () => {
      const reason = 'Inappropriate content';
      mockRepository.findOne.mockResolvedValueOnce(mockListing);
      mockRepository.save.mockResolvedValueOnce({
        ...mockListing,
        status: ListingStatus.REJECTED,
        rejection_reason: reason,
      });

      const result = await service.rejectListing(1, 99, reason);

      expect(result.status).toBe(ListingStatus.REJECTED);
      expect(result.rejection_reason).toBe(reason);
    });
  });

  describe('flagListing', () => {
    it('should flag a listing', async () => {
      const reason = 'Spam content';
      mockRepository.findOne.mockResolvedValueOnce({ ...mockListing, status: ListingStatus.ACTIVE });
      mockRepository.save.mockResolvedValueOnce({
        ...mockListing,
        is_flagged: true,
        flag_reason: reason,
      });

      const result = await service.flagListing(1, reason);

      expect(result.is_flagged).toBe(true);
      expect(result.flag_reason).toBe(reason);
    });
  });

  describe('unflagListing', () => {
    it('should unflag a listing', async () => {
      mockRepository.findOne.mockResolvedValueOnce({ ...mockListing, is_flagged: true });
      mockRepository.save.mockResolvedValueOnce({
        ...mockListing,
        is_flagged: false,
        flag_reason: null,
      });

      const result = await service.unflagListing(1);

      expect(result.is_flagged).toBe(false);
    });
  });

  describe('getModerationStats', () => {
    it('should return moderation statistics', async () => {
      mockRepository.count
        .mockResolvedValueOnce(10) // pending
        .mockResolvedValueOnce(3)  // flagged
        .mockResolvedValueOnce(5); // rejected

      const result = await service.getModerationStats();

      expect(result).toHaveProperty('pending');
      expect(result).toHaveProperty('flagged');
      expect(result).toHaveProperty('rejected');
    });
  });
});
