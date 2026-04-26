import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
export declare class ContactService {
    private userRepository;
    private listingRepository;
    constructor(userRepository: Repository<User>, listingRepository: Repository<PGListing>);
    maskPhone(phone: string): string;
    maskEmail(email: string): string;
    getOwnerContact(ownerId: number, revealed?: boolean): Promise<any>;
    getListingContact(listingId: number, revealed?: boolean): Promise<any>;
    updateListingContact(listingId: number, data: {
        contact_name?: string;
        contact_phone?: string;
        contact_email?: string;
        whatsapp_number?: string;
    }): Promise<PGListing>;
}
