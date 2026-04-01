import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Favorite } from '../typeorm/entities/favorite.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, PGListing])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
