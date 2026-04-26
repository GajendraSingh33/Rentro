import { InquiryService } from './inquiry.service';
import { CreateInquiryDto, UpdateInquiryStatusDto, RespondInquiryDto, InquiryFilterDto } from './dto/inquiry.dto';
export declare class InquiryController {
    private readonly inquiryService;
    constructor(inquiryService: InquiryService);
    createInquiry(createDto: CreateInquiryDto, req: any): Promise<import("../typeorm/entities").Inquiry>;
    getInquiries(filterDto: InquiryFilterDto, req: any): Promise<any>;
    getInquiry(id: number, req: any): Promise<any>;
    updateStatus(id: number, updateDto: UpdateInquiryStatusDto, req: any): Promise<import("../typeorm/entities").Inquiry>;
    respondToInquiry(id: number, respondDto: RespondInquiryDto, req: any): Promise<import("../typeorm/entities").Inquiry>;
    getOwnerStats(req: any): Promise<any>;
    revealContact(id: number, req: any): Promise<any>;
}
