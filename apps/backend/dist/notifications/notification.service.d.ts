import { ConfigService } from '@nestjs/config';
export interface NotificationPayload {
    to: string;
    subject: string;
    html: string;
    text?: string;
}
export declare class NotificationService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendEmail(payload: NotificationPayload): Promise<boolean>;
    sendNewInquiryNotification(ownerEmail: string, data: {
        seekerName: string;
        listingTitle: string;
        message: string;
    }): Promise<boolean>;
    sendInquiryResponseNotification(seekerEmail: string, data: {
        ownerName: string;
        listingTitle: string;
        response: string;
    }): Promise<boolean>;
    sendListingApprovedNotification(ownerEmail: string, data: {
        listingTitle: string;
        listingId: number;
    }): Promise<boolean>;
    sendListingRejectedNotification(ownerEmail: string, data: {
        listingTitle: string;
        reason: string;
    }): Promise<boolean>;
}
