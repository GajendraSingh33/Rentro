import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PGListing)
    private listingRepository: Repository<PGListing>,
  ) {}

  maskPhone(phone: string): string {
    if (!phone || phone.length < 10) return '******';
    return phone.slice(0, 3) + '*'.repeat(phone.length - 6) + phone.slice(-3);
  }

  maskEmail(email: string): string {
    if (!email) return '***@***.***';
    const [local, domain] = email.split('@');
    const maskedLocal = local.slice(0, 2) + '*'.repeat(Math.max(local.length - 2, 3));
    return `${maskedLocal}@${domain}`;
  }

  async getOwnerContact(ownerId: number, revealed: boolean = false): Promise<any> {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner) return null;

    if (revealed) {
      return {
        name: owner.name,
        email: owner.email,
        phone: owner.phone,
        preferred_contact: 'phone',
      };
    }

    return {
      name: owner.name,
      email: this.maskEmail(owner.email),
      phone: owner.phone ? this.maskPhone(owner.phone) : null,
      preferred_contact: 'inquiry',
    };
  }

  async getListingContact(listingId: number, revealed: boolean = false): Promise<any> {
    const listing = await this.listingRepository.findOne({
      where: { id: listingId },
      relations: ['owner'],
    });
    if (!listing) return null;

    if (revealed) {
      return {
        contact_name: listing.contact_name || listing.owner?.name,
        contact_phone: listing.contact_phone || listing.owner?.phone,
        contact_email: listing.contact_email || listing.owner?.email,
        whatsapp: listing.whatsapp_number,
      };
    }

    return {
      contact_name: listing.contact_name || listing.owner?.name,
      contact_phone: listing.contact_phone ? this.maskPhone(listing.contact_phone) : null,
      contact_email: listing.contact_email ? this.maskEmail(listing.contact_email) : null,
      whatsapp: listing.whatsapp_number ? this.maskPhone(listing.whatsapp_number) : null,
    };
  }

  async updateListingContact(
    listingId: number,
    data: { contact_name?: string; contact_phone?: string; contact_email?: string; whatsapp_number?: string },
  ): Promise<PGListing> {
    await this.listingRepository.update(listingId, data);
    return await this.listingRepository.findOne({ where: { id: listingId } });
  }
}
