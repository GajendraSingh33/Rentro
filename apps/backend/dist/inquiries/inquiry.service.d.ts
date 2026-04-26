import { Repository } from 'typeorm';
import { Inquiry } from '../typeorm/entities/inquiry.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { User } from '../typeorm/entities/user.entity';
import { CreateInquiryDto, UpdateInquiryStatusDto, RespondToInquiryDto, InquiryFilterDto } from './dto/inquiry.dto';
export declare class InquiryService {
    private inquiryRepository;
    private listingRepository;
    private userRepository;
    constructor(inquiryRepository: Repository<Inquiry>, listingRepository: Repository<PGListing>, userRepository: Repository<User>);
    createInquiry(createInquiryDto: CreateInquiryDto, seekerId: number): Promise<Inquiry>;
    getInquiries(userId: number, isOwner: boolean, filterDto: InquiryFilterDto): Promise<any>;
    updateStatus(inquiryId: number, statusDto: UpdateInquiryStatusDto, userId: number): Promise<Inquiry>;
    respondToInquiry(inquiryId: number, respondDto: RespondToInquiryDto, userId: number): Promise<Inquiry>;
    revealContact(inquiryId: number, userId: number): Promise<any>;
    getInquiryStats(userId: number): Promise<any>;
}
