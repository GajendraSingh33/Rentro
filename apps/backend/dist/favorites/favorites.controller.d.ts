import { FavoritesService } from './favorites.service';
import { AddFavoriteDto, UpdateFavoriteDto, FavoritesQueryDto, FavoritesListResponseDto, FavoriteResponseDto, FavoriteCheckResponseDto } from './dto/favorite.dto';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    /**
     * Add a listing to favorites
     * POST /favorites
     */
    addFavorite(userId: number, dto: AddFavoriteDto): Promise<FavoriteResponseDto>;
    /**
     * Get user's favorites list
     * GET /favorites
     */
    getFavorites(userId: number, query: FavoritesQueryDto): Promise<FavoritesListResponseDto>;
    /**
     * Get favorites count
     * GET /favorites/count
     */
    getFavoritesCount(userId: number): Promise<{
        count: number;
    }>;
    /**
     * Check if a listing is favorited
     * GET /favorites/check/:listingId
     */
    checkFavorite(userId: number, listingId: number): Promise<FavoriteCheckResponseDto>;
    /**
     * Check multiple listings for favorites (batch)
     * POST /favorites/check-batch
     */
    checkMultipleFavorites(userId: number, body: {
        listing_ids: number[];
    }): Promise<{
        favorites: Record<number, boolean>;
    }>;
    /**
     * Toggle favorite status
     * POST /favorites/toggle/:listingId
     */
    toggleFavorite(userId: number, listingId: number): Promise<{
        is_favorite: boolean;
        favorite_id: number | null;
    }>;
    /**
     * Update favorite notes
     * PUT /favorites/:favoriteId
     */
    updateFavorite(userId: number, favoriteId: number, dto: UpdateFavoriteDto): Promise<FavoriteResponseDto>;
    /**
     * Remove from favorites by listing ID
     * DELETE /favorites/listing/:listingId
     */
    removeFavorite(userId: number, listingId: number): Promise<void>;
}
