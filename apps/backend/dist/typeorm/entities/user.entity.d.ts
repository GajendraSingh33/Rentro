export declare enum UserRole {
    SEEKER = "seeker",
    OWNER = "owner",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    avatar_url: string;
    role: UserRole;
    bio: string;
    email_verified: boolean;
    phone_verified: boolean;
    last_login_at: Date;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    get full_name(): string;
    toJSON(): Omit<this, "password_hash" | "full_name" | "toJSON">;
}
