import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [ConfigModule],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule {}
