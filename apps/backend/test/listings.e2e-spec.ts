import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Listings API (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    // Get auth token (mock or real login)
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'owner@test.com', password: 'TestPassword123!' });
    
    authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/listings (GET)', () => {
    it('should return paginated listings', () => {
      return request(app.getHttpServer())
        .get('/listings')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should filter listings by city', () => {
      return request(app.getHttpServer())
        .get('/listings?city=Bangalore')
        .expect(200)
        .expect((res) => {
          res.body.data.forEach((listing: any) => {
            expect(listing.city.toLowerCase()).toContain('bangalore');
          });
        });
    });

    it('should filter listings by rent range', () => {
      return request(app.getHttpServer())
        .get('/listings?min_rent=5000&max_rent=10000')
        .expect(200)
        .expect((res) => {
          res.body.data.forEach((listing: any) => {
            expect(listing.rent_amount).toBeGreaterThanOrEqual(5000);
            expect(listing.rent_amount).toBeLessThanOrEqual(10000);
          });
        });
    });
  });

  describe('/listings (POST)', () => {
    const validListing = {
      title: 'E2E Test PG Listing',
      description: 'This is a test listing created during e2e testing with enough description length',
      rent_amount: 8000,
      deposit_amount: 16000,
      address: '123 Test Street, Test Area',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      room_type: 'double',
      sharing_type: 2,
      gender_preference: 'any',
      food_available: true,
      food_type: 'both',
      amenities: ['wifi', 'ac', 'parking'],
    };

    it('should require authentication', () => {
      return request(app.getHttpServer())
        .post('/listings')
        .send(validListing)
        .expect(401);
    });

    it('should create a listing with valid data', () => {
      return request(app.getHttpServer())
        .post('/listings')
        .set('Authorization', `Bearer ${authToken}`)
        .send(validListing)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe(validListing.title);
          expect(res.body.status).toBe('draft');
        });
    });

    it('should validate required fields', () => {
      return request(app.getHttpServer())
        .post('/listings')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Short' })
        .expect(400);
    });
  });

  describe('/listings/:id (GET)', () => {
    it('should return a single listing', () => {
      return request(app.getHttpServer())
        .get('/listings/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('title');
        });
    });

    it('should return 404 for non-existent listing', () => {
      return request(app.getHttpServer())
        .get('/listings/99999')
        .expect(404);
    });
  });
});

describe('Inquiries API (e2e)', () => {
  let app: INestApplication;
  let ownerToken: string;
  let seekerToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/inquiries (POST)', () => {
    it('should require authentication', () => {
      return request(app.getHttpServer())
        .post('/inquiries')
        .send({ listing_id: 1, message: 'Test inquiry' })
        .expect(401);
    });
  });

  describe('/inquiries (GET)', () => {
    it('should return user inquiries', () => {
      return request(app.getHttpServer())
        .get('/inquiries')
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });
  });
});

describe('Owner Dashboard API (e2e)', () => {
  let app: INestApplication;
  let ownerToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/owner/dashboard/overview (GET)', () => {
    it('should require OWNER role', () => {
      return request(app.getHttpServer())
        .get('/owner/dashboard/overview')
        .expect(401);
    });
  });
});
