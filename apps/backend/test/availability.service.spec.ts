import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailabilityService } from '../src/availability/availability.service';
import { Availability, AvailabilityStatus } from '../src/typeorm/entities/availability.entity';
import { PGListing } from '../src/typeorm/entities/pg-listing.entity';

describe('AvailabilityService', () => {
  let service: AvailabilityService;
  let availabilityRepository: Repository<Availability>;
  let listingRepository: Repository<PGListing>;

  const mockAvailability: Partial<Availability> = {
    id: 1,
    listing_id: 1,
    room_number: 'A1',
    total_beds_in_room: 3,
    available_beds_in_room: 2,
    status: AvailabilityStatus.AVAILABLE,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockAvailabilityRepository = {
    create: jest.fn().mockReturnValue(mockAvailability),
    save: jest.fn().mockResolvedValue(mockAvailability),
    findOne: jest.fn().mockResolvedValue(mockAvailability),
    find: jest.fn().mockResolvedValue([mockAvailability]),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const mockListingRepository = {
    update: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityService,
        {
          provide: getRepositoryToken(Availability),
          useValue: mockAvailabilityRepository,
        },
        {
          provide: getRepositoryToken(PGListing),
          useValue: mockListingRepository,
        },
      ],
    }).compile();

    service = module.get<AvailabilityService>(AvailabilityService);
    availabilityRepository = module.get<Repository<Availability>>(getRepositoryToken(Availability));
    listingRepository = module.get<Repository<PGListing>>(getRepositoryToken(PGListing));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAvailability', () => {
    it('should return availability for a listing', async () => {
      const result = await service.getAvailability(1);

      expect(mockAvailabilityRepository.find).toHaveBeenCalledWith({
        where: { listing_id: 1 },
        order: { room_number: 'ASC' },
      });
      expect(result).toEqual([mockAvailability]);
    });
  });

  describe('updateAvailability', () => {
    it('should update existing room availability', async () => {
      mockAvailabilityRepository.findOne.mockResolvedValueOnce(mockAvailability);
      mockAvailabilityRepository.save.mockResolvedValueOnce({
        ...mockAvailability,
        available_beds_in_room: 1,
      });

      const result = await service.updateAvailability(1, 'A1', { available_beds_in_room: 1 });

      expect(result.available_beds_in_room).toBe(1);
    });

    it('should create new room if not exists', async () => {
      mockAvailabilityRepository.findOne.mockResolvedValueOnce(null);
      mockAvailabilityRepository.create.mockReturnValueOnce(mockAvailability);
      mockAvailabilityRepository.save.mockResolvedValueOnce(mockAvailability);

      const result = await service.updateAvailability(1, 'B1', {
        total_beds_in_room: 2,
        available_beds_in_room: 2,
      });

      expect(mockAvailabilityRepository.create).toHaveBeenCalled();
      expect(result).toEqual(mockAvailability);
    });
  });

  describe('createRoomAvailability', () => {
    it('should create a new room', async () => {
      const result = await service.createRoomAvailability(1, 'C1', 4);

      expect(mockAvailabilityRepository.create).toHaveBeenCalledWith({
        listing_id: 1,
        room_number: 'C1',
        total_beds_in_room: 4,
        available_beds_in_room: 4,
        status: AvailabilityStatus.AVAILABLE,
      });
      expect(mockAvailabilityRepository.save).toHaveBeenCalled();
    });
  });

  describe('bulkUpdateAvailability', () => {
    it('should update multiple rooms', async () => {
      const updates = [
        { room_number: 'A1', available_beds_in_room: 1, status: AvailabilityStatus.AVAILABLE },
        { room_number: 'A2', available_beds_in_room: 0, status: AvailabilityStatus.OCCUPIED },
      ];

      mockAvailabilityRepository.findOne
        .mockResolvedValueOnce(mockAvailability)
        .mockResolvedValueOnce({ ...mockAvailability, room_number: 'A2' });

      const result = await service.bulkUpdateAvailability(1, updates);

      expect(result).toHaveLength(2);
    });
  });
});
