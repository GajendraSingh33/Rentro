import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListingService } from '../src/listings/listing.service';
import { PGListing, ListingStatus, RoomType, GenderPreference, FoodType } from '../src/typeorm/entities/pg-listing.entity';

describe('ListingService', () => {
  let service: ListingService;
  let repository: Repository<PGListing>;

  const mockListing: Partial<PGListing> = {
    id: 1,
    owner_id: 1,
    title: 'Test PG Listing',
    description: 'A test listing description that is long enough',
    rent_amount: 8000,
    deposit_amount: 16000,
    address: '123 Test Street',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    room_type: RoomType.DOUBLE,
    sharing_type: 2,
    gender_preference: GenderPreference.ANY,
    food_available: true,
    food_type: FoodType.BOTH,
    status: ListingStatus.ACTIVE,
    view_count: 0,
    is_verified: false,
    is_featured: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockListing),
    save: jest.fn().mockResolvedValue(mockListing),
    findOne: jest.fn().mockResolvedValue(mockListing),
    find: jest.fn().mockResolvedValue([mockListing]),
    findAndCount: jest.fn().mockResolvedValue([[mockListing], 1]),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    softDelete: jest.fn().mockResolvedValue({ affected: 1 }),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[mockListing], 1]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingService,
        {
          provide: getRepositoryToken(PGListing),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ListingService>(ListingService);
    repository = module.get<Repository<PGListing>>(getRepositoryToken(PGListing));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new listing', async () => {
      const createDto = {
        title: 'Test PG Listing',
        description: 'A test listing description that is long enough',
        rent_amount: 8000,
        deposit_amount: 16000,
        address: '123 Test Street',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        room_type: RoomType.DOUBLE,
        sharing_type: 2,
        gender_preference: GenderPreference.ANY,
        food_available: true,
        food_type: FoodType.BOTH,
      };

      const result = await service.create(1, createDto as any);

      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockListing);
    });
  });

  describe('findOne', () => {
    it('should return a single listing', async () => {
      const result = await service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['owner', 'media'],
      });
      expect(result).toEqual(mockListing);
    });

    it('should throw NotFoundException when listing not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a listing', async () => {
      const updateDto = { title: 'Updated Title' };

      mockRepository.findOne.mockResolvedValueOnce(mockListing);
      mockRepository.save.mockResolvedValueOnce({ ...mockListing, ...updateDto });

      const result = await service.update(1, 1, updateDto as any);

      expect(result.title).toBe('Updated Title');
    });
  });

  describe('findAll', () => {
    it('should return paginated listings', async () => {
      const filterDto = { page: 1, limit: 10, city: 'Bangalore' };

      const result = await service.findAll(filterDto as any);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(result.meta.total).toBe(1);
    });
  });

  describe('updateStatus', () => {
    it('should update listing status', async () => {
      mockRepository.findOne.mockResolvedValueOnce(mockListing);
      mockRepository.save.mockResolvedValueOnce({ ...mockListing, status: ListingStatus.INACTIVE });

      const result = await service.updateStatus(1, 1, ListingStatus.INACTIVE);

      expect(result.status).toBe(ListingStatus.INACTIVE);
    });
  });

  describe('incrementViewCount', () => {
    it('should increment view count', async () => {
      await service.incrementViewCount(1);

      expect(mockRepository.update).toHaveBeenCalled();
    });
  });
});
