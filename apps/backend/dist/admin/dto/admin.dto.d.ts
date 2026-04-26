export declare enum UserRole {
    SEEKER = "SEEKER",
    OWNER = "OWNER",
    ADMIN = "ADMIN"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    PENDING = "pending"
}
export declare enum ListingStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    FLAGGED = "flagged",
    SUSPENDED = "suspended"
}
export declare class ListUsersDto {
    search?: string;
    role?: UserRole;
    status?: UserStatus;
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: 'ASC' | 'DESC';
}
export declare class UpdateUserStatusDto {
    status: UserStatus;
    reason?: string;
}
export declare class UpdateUserRoleDto {
    role: UserRole;
}
export declare class AdminUpdateUserDto {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
}
export declare class ListListingsDto {
    search?: string;
    status?: ListingStatus;
    city?: string;
    owner_id?: number;
    is_verified?: boolean;
    is_featured?: boolean;
    page?: number;
    limit?: number;
}
export declare class ModerationActionDto {
    status: ListingStatus;
    reason?: string;
    notify_owner?: boolean;
}
export declare class VerifyListingDto {
    is_verified: boolean;
    verification_notes?: string;
}
export declare class FeatureListingDto {
    is_featured: boolean;
    feature_until?: string;
}
export declare class AnalyticsQueryDto {
    start_date?: string;
    end_date?: string;
    granularity?: 'day' | 'week' | 'month';
}
export declare class PlatformOverviewDto {
    total_users: number;
    total_seekers: number;
    total_owners: number;
    total_admins: number;
    new_users_today: number;
    new_users_this_week: number;
    new_users_this_month: number;
    total_listings: number;
    active_listings: number;
    pending_listings: number;
    verified_listings: number;
    featured_listings: number;
    new_listings_today: number;
    new_listings_this_week: number;
    total_inquiries: number;
    pending_inquiries: number;
    responded_inquiries: number;
    new_inquiries_today: number;
    total_reviews: number;
    average_platform_rating: number;
}
export declare class UserGrowthDto {
    date: string;
    total_users: number;
    new_seekers: number;
    new_owners: number;
}
export declare class ListingStatsDto {
    date: string;
    total_listings: number;
    new_listings: number;
    approved_listings: number;
    rejected_listings: number;
}
export declare class CityStatsDto {
    city: string;
    total_listings: number;
    average_rent: number;
    total_inquiries: number;
}
export declare class AdminUserResponseDto {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string | null;
    role: string;
    status: string;
    email_verified: boolean;
    phone_verified: boolean;
    listings_count?: number;
    inquiries_count?: number;
    reviews_count?: number;
    created_at: Date;
    last_login_at?: Date;
}
export declare class AdminListingResponseDto {
    id: number;
    title: string;
    city: string;
    monthly_rent: number;
    room_type: string;
    status: string;
    is_verified: boolean;
    is_featured: boolean;
    view_count: number;
    inquiry_count: number;
    average_rating: number | null;
    owner: {
        id: number;
        name: string;
        email: string;
    };
    created_at: Date;
    updated_at: Date;
}
