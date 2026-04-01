import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  AddFavoriteDto,
  UpdateFavoriteDto,
  FavoritesQueryDto,
  FavoritesListResponseDto,
  FavoriteResponseDto,
  FavoriteCheckResponseDto,
} from './dto/favorite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  /**
   * Add a listing to favorites
   * POST /favorites
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addFavorite(
    @GetUser('id') userId: number,
    @Body() dto: AddFavoriteDto,
  ): Promise<FavoriteResponseDto> {
    return this.favoritesService.addFavorite(userId, dto);
  }

  /**
   * Get user's favorites list
   * GET /favorites
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async getFavorites(
    @GetUser('id') userId: number,
    @Query() query: FavoritesQueryDto,
  ): Promise<FavoritesListResponseDto> {
    return this.favoritesService.getFavorites(userId, query);
  }

  /**
   * Get favorites count
   * GET /favorites/count
   */
  @Get('count')
  @HttpCode(HttpStatus.OK)
  async getFavoritesCount(
    @GetUser('id') userId: number,
  ): Promise<{ count: number }> {
    const count = await this.favoritesService.getFavoritesCount(userId);
    return { count };
  }

  /**
   * Check if a listing is favorited
   * GET /favorites/check/:listingId
   */
  @Get('check/:listingId')
  @HttpCode(HttpStatus.OK)
  async checkFavorite(
    @GetUser('id') userId: number,
    @Param('listingId', ParseIntPipe) listingId: number,
  ): Promise<FavoriteCheckResponseDto> {
    return this.favoritesService.checkFavorite(userId, listingId);
  }

  /**
   * Check multiple listings for favorites (batch)
   * POST /favorites/check-batch
   */
  @Post('check-batch')
  @HttpCode(HttpStatus.OK)
  async checkMultipleFavorites(
    @GetUser('id') userId: number,
    @Body() body: { listing_ids: number[] },
  ): Promise<{ favorites: Record<number, boolean> }> {
    const favorites = await this.favoritesService.checkMultipleFavorites(
      userId,
      body.listing_ids,
    );
    return { favorites };
  }

  /**
   * Toggle favorite status
   * POST /favorites/toggle/:listingId
   */
  @Post('toggle/:listingId')
  @HttpCode(HttpStatus.OK)
  async toggleFavorite(
    @GetUser('id') userId: number,
    @Param('listingId', ParseIntPipe) listingId: number,
  ): Promise<{ is_favorite: boolean; favorite_id: number | null }> {
    return this.favoritesService.toggleFavorite(userId, listingId);
  }

  /**
   * Update favorite notes
   * PUT /favorites/:favoriteId
   */
  @Put(':favoriteId')
  @HttpCode(HttpStatus.OK)
  async updateFavorite(
    @GetUser('id') userId: number,
    @Param('favoriteId', ParseIntPipe) favoriteId: number,
    @Body() dto: UpdateFavoriteDto,
  ): Promise<FavoriteResponseDto> {
    return this.favoritesService.updateFavorite(userId, favoriteId, dto);
  }

  /**
   * Remove from favorites by listing ID
   * DELETE /favorites/listing/:listingId
   */
  @Delete('listing/:listingId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavorite(
    @GetUser('id') userId: number,
    @Param('listingId', ParseIntPipe) listingId: number,
  ): Promise<void> {
    return this.favoritesService.removeFavorite(userId, listingId);
  }
}
