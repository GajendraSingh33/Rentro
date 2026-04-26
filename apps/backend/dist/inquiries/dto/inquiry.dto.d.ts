import { InquiryStatus } from '../../typeorm/entities/inquiry.entity';
export declare class CreateInquiryDto {
    listing_id: number;
    message: string;
    preferred_move_in_date?: Date;
    number_of_people?: number;
    duration_months?: number;
    additional_requirements?: string;
}
export declare class UpdateInquiryStatusDto {
    status: InquiryStatus;
}
export declare class RespondToInquiryDto {
    response: string;
}
export declare class InquiryFilterDto {
    status?: InquiryStatus;
    listing_id?: number;
    page?: number;
    limit?: number;
}
