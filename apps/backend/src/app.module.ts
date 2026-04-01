import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { ListingModule } from './listings/listing.module';
import { LocationModule } from './location/location.module';
import { AvailabilityModule } from './availability/availability.module';
import { InquiryModule } from './inquiries/inquiry.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ContactModule } from './contact/contact.module';
import { ModerationModule } from './moderation/moderation.module';
import { NotificationModule } from './notifications/notification.module';
// Phase 4 modules
import { SearchModule } from './search/search.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SeekerDashboardModule } from './seeker-dashboard/seeker-dashboard.module';
// Phase 5 modules
import { AdminModule } from './admin/admin.module';
import { ContentModule } from './content/content.module';
import {
  User,
  PGListing,
  Inquiry,
  Availability,
  Media,
  Favorite,
  Review,
  StaticPage,
} from './typeorm/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'rentro_user',
      password: process.env.DB_PASSWORD || 'rentro_password',
      database: process.env.DB_NAME || 'rentro_dev',
      entities: [User, PGListing, Inquiry, Availability, Media, Favorite, Review, StaticPage],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    MediaModule,
    ListingModule,
    LocationModule,
    AvailabilityModule,
    InquiryModule,
    AnalyticsModule,
    DashboardModule,
    ContactModule,
    ModerationModule,
    NotificationModule,
    // Phase 4 modules
    SearchModule,
    FavoritesModule,
    ReviewsModule,
    SeekerDashboardModule,
    // Phase 5 modules
    AdminModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
