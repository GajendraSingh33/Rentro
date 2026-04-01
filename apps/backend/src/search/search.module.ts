import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { PGListing } from '../typeorm/entities/pg-listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PGListing])],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
