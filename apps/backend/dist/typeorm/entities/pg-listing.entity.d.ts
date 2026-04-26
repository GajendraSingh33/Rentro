import { User } from './user.entity';
export declare enum ListingStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING_APPROVAL = "pending_approval",
    REJECTED = "rejected"
}
export declare enum RoomType {
    SINGLE = "single",
    DOUBLE = "double",
    TRIPLE = "triple",
    DORMITORY = "dormitory"
}
export declare enum GenderPreference {
    MALE = "male",
    FEMALE = "female",
    ANY = "any"
}
export declare enum FoodType {
    VEG = "veg",
    NON_VEG = "non_veg",
    BOTH = "both",
    NONE = "none"
}
export declare class PGListing {
    id: number;
    owner_id: number;
    owner: User;
    title: string;
    description: string;
    status: ListingStatus;
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude: number;
    longitude: number;
    nearby_landmarks: string;
    room_type: RoomType;
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
    gender_preference: GenderPreference;
    min_age: number;
    max_age: number;
    preferred_occupation: string;
    amenities: string;
    food_type: FoodType;
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
    inquiry_count: number;
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
    get is_available(): boolean;
    get occupancy_rate(): number;
    get amenitiesList(): string[];
    set amenitiesList(value: string[]);
    get landmarksList(): string[];
    set landmarksList(value: string[]);
    toJSON(): Omit<this, "toJSON" | "contact_phone" | "contact_email" | "is_available" | "occupancy_rate" | "amenitiesList" | "landmarksList"> & {
        contact_phone: string | null;
        contact_email: string | null;
    };
}
