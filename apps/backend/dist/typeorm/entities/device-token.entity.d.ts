import { User } from './user.entity';
export declare enum DevicePlatform {
    WEB = "web",
    ANDROID = "android",
    IOS = "ios"
}
export declare class DeviceToken {
    id: number;
    user_id: number;
    user: User;
    token: string;
    platform: DevicePlatform;
    device_model: string;
    app_version: string;
    is_active: boolean;
    last_used_at: Date;
    created_at: Date;
    updated_at: Date;
}
