import { ContactService } from './contact.service';
declare class UpdateContactDto {
    contact_name?: string;
    contact_phone?: string;
    contact_email?: string;
    whatsapp_number?: string;
}
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    getListingContact(id: number, req: any): Promise<any>;
    revealListingContact(id: number, req: any): Promise<any>;
    updateListingContact(id: number, updateDto: UpdateContactDto): Promise<import("../typeorm/entities").PGListing>;
}
export {};
