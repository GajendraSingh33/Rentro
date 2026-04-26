import { AdminService } from './admin.service';
import { ListUsersDto, UpdateUserStatusDto, UpdateUserRoleDto, AdminUpdateUserDto, ListListingsDto, ModerationActionDto, VerifyListingDto, FeatureListingDto, AnalyticsQueryDto } from './dto/admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    listUsers(dto: ListUsersDto): Promise<{
        data: {
            password_hash: undefined;
            listings_count: number;
            inquiries_count: number;
            reviews_count: number;
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            phone_number: string;
            avatar_url: string;
            role: import("../typeorm/entities").UserRole;
            bio: string;
            email_verified: boolean;
            phone_verified: boolean;
            last_login_at: Date;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    getUserById(id: number): Promise<{
        password_hash: undefined;
        listings: import("../typeorm/entities").PGListing[];
        inquiries: import("../typeorm/entities").Inquiry[];
        reviews: import("../typeorm/entities").Review[];
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        avatar_url: string;
        role: import("../typeorm/entities").UserRole;
        bio: string;
        email_verified: boolean;
        phone_verified: boolean;
        last_login_at: Date;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date;
    }>;
    updateUser(id: number, dto: AdminUpdateUserDto): Promise<{
        message: string;
        user: {
            password_hash: undefined;
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            phone_number: string;
            avatar_url: string;
            role: import("../typeorm/entities").UserRole;
            bio: string;
            email_verified: boolean;
            phone_verified: boolean;
            last_login_at: Date;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date;
        };
    }>;
    updateUserStatus(id: number, dto: UpdateUserStatusDto, adminId: number): Promise<{
        message: string;
        user: {
            password_hash: undefined;
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            phone_number: string;
            avatar_url: string;
            role: import("../typeorm/entities").UserRole;
            bio: string;
            email_verified: boolean;
            phone_verified: boolean;
            last_login_at: Date;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date;
        };
    }>;
    updateUserRole(id: number, dto: UpdateUserRoleDto, adminId: number): Promise<{
        message: string;
        user: {
            password_hash: undefined;
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            phone_number: string;
            avatar_url: string;
            role: import("../typeorm/entities").UserRole;
            bio: string;
            email_verified: boolean;
            phone_verified: boolean;
            last_login_at: Date;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date;
        };
    }>;
    deleteUser(id: number, adminId: number): Promise<{
        message: string;
    }>;
    listListings(dto: ListListingsDto): Promise<{
        data: {
            inquiry_count: number;
            owner: {
                id: number;
                name: string;
                email: string;
            } | null;
            id: number;
            owner_id: number;
            title: string;
            description: string;
            status: import("../typeorm/entities").ListingStatus;
            address: string;
            city: string;
            state: string;
            pincode: string;
            latitude: number;
            longitude: number;
            nearby_landmarks: string;
            room_type: import("../typeorm/entities").RoomType;
            sharing_capacity: number;
            monthly_rent: number;
            security_deposit: number;
            electricity_included: boolean;
            water_included: boolean;
            wifi_included: boolean;
            total_rooms: number;
            available_rooms: number;
            total_beds: number;
            available_beds: number;
            available_from: Date;
            gender_preference: import("../typeorm/entities").GenderPreference;
            min_age: number;
            max_age: number;
            preferred_occupation: string;
            amenities: string;
            food_type: import("../typeorm/entities").FoodType;
            breakfast_included: boolean;
            lunch_included: boolean;
            dinner_included: boolean;
            food_cost_per_month: number;
            house_rules: string;
            gate_closing_time: string;
            visitors_allowed: boolean;
            smoking_allowed: boolean;
            drinking_allowed: boolean;
            pets_allowed: boolean;
            contact_phone: string;
            contact_email: string;
            preferred_contact_method: string;
            contact_verified: boolean;
            view_count: number;
            booking_count: number;
            average_rating: number;
            review_count: number;
            approved_by: number;
            approved_at: Date;
            rejection_reason: string;
            is_featured: boolean;
            is_verified: boolean;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    getListingById(id: number): Promise<{
        inquiry_count: number;
        review_count: number;
        owner: {
            id: number;
            name: string;
            email: string;
            phone: any;
        } | null;
        id: number;
        owner_id: number;
        title: string;
        description: string;
        status: import("../typeorm/entities").ListingStatus;
        address: string;
        city: string;
        state: string;
        pincode: string;
        latitude: number;
        longitude: number;
        nearby_landmarks: string;
        room_type: import("../typeorm/entities").RoomType;
        sharing_capacity: number;
        monthly_rent: number;
        security_deposit: number;
        electricity_included: boolean;
        water_included: boolean;
        wifi_included: boolean;
        total_rooms: number;
        available_rooms: number;
        total_beds: number;
        available_beds: number;
        available_from: Date;
        gender_preference: import("../typeorm/entities").GenderPreference;
        min_age: number;
        max_age: number;
        preferred_occupation: string;
        amenities: string;
        food_type: import("../typeorm/entities").FoodType;
        breakfast_included: boolean;
        lunch_included: boolean;
        dinner_included: boolean;
        food_cost_per_month: number;
        house_rules: string;
        gate_closing_time: string;
        visitors_allowed: boolean;
        smoking_allowed: boolean;
        drinking_allowed: boolean;
        pets_allowed: boolean;
        contact_phone: string;
        contact_email: string;
        preferred_contact_method: string;
        contact_verified: boolean;
        view_count: number;
        booking_count: number;
        average_rating: number;
        approved_by: number;
        approved_at: Date;
        rejection_reason: string;
        is_featured: boolean;
        is_verified: boolean;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date;
    }>;
    moderateListing(id: number, dto: ModerationActionDto, adminId: number): Promise<{
        message: string;
        listing: import("../typeorm/entities").PGListing;
    }>;
    verifyListing(id: number, dto: VerifyListingDto): Promise<{
        message: string;
        listing: import("../typeorm/entities").PGListing;
    }>;
    featureListing(id: number, dto: FeatureListingDto): Promise<{
        message: string;
        listing: import("../typeorm/entities").PGListing;
    }>;
    deleteListing(id: number): Promise<{
        message: string;
    }>;
    getPlatformOverview(): Promise<import("./dto/admin.dto").PlatformOverviewDto>;
    getUserGrowthStats(dto: AnalyticsQueryDto): Promise<{
        date: any;
        total_users: number;
        new_seekers: number;
        new_owners: number;
    }[]>;
    getListingStats(dto: AnalyticsQueryDto): Promise<{
        date: any;
        total_listings: number;
        new_listings: number;
        approved_listings: number;
        rejected_listings: number;
    }[]>;
    getCityStats(): Promise<{
        city: any;
        total_listings: number;
        average_rent: number;
        total_inquiries: number;
    }[]>;
    getRecentActivity(limit?: number): Promise<({
        type: string;
        timestamp: Date;
        data: {
            id: number;
            name: string;
            role: import("../typeorm/entities").UserRole;
        };
    } | {
        type: string;
        timestamp: Date;
        data: {
            id: number;
            title: string;
            city: string;
            status: import("../typeorm/entities").ListingStatus;
        };
    } | {
        type: string;
        timestamp: Date;
        data: {
            id: number;
            seeker: string;
            listing: string;
        };
    } | {
        type: string;
        timestamp: Date;
        data: {
            id: number;
            user: string;
            listing: string;
            rating: any;
        };
    })[]>;
}
