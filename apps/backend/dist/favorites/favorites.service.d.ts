import { Repository } from 'typeorm';
import { Favorite } from '../typeorm/entities/favorite.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { AddFavoriteDto, UpdateFavoriteDto, FavoritesQueryDto, FavoriteResponseDto, FavoritesListResponseDto, FavoriteCheckResponseDto } from './dto/favorite.dto';
export declare class FavoritesService {
    private favoriteRepository;
    private listingRepository;
    constructor(favoriteRepository: Repository<Favorite>, listingRepository: Repository<PGListing>);
    /**
     * Add a listing to favorites
     */
    addFavorite(userId: number, dto: AddFavoriteDto): Promise<FavoriteResponseDto>;
    /**
     * Remove a listing from favorites
     */
    removeFavorite(userId: number, listingId: number): Promise<void>;
    /**
     * Toggle favorite status
     */
    toggleFavorite(userId: number, listingId: number): Promise<{
        is_favorite: boolean;
        favorite_id: number | null;
    }>;
    /**
     * Update favorite notes
     */
    updateFavorite(userId: number, favoriteId: number, dto: UpdateFavoriteDto): Promise<FavoriteResponseDto>;
    /**
     * Get user's favorites list
     */
    getFavorites(userId: number, query: FavoritesQueryDto): Promise<FavoritesListResponseDto>;
    /**
     * Check if a listing is favorited
     */
    checkFavorite(userId: number, listingId: number): Promise<FavoriteCheckResponseDto>;
    /**
     * Check multiple listings for favorites (batch)
     */
    checkMultipleFavorites(userId: number, listingIds: number[]): Promise<Record<number, boolean>>;
    /**
     * Get favorites count for user
     */
    getFavoritesCount(userId: number): Promise<number>;
    /**
     * Get listing IDs that user has favorited
     */
    getFavoriteListingIds(userId: number): Promise<number[]>;
    private transformToResponse;
}
