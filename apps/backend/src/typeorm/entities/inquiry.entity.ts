import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { PGListing } from './pg-listing.entity';

export enum InquiryStatus {
  NEW = 'new',
  VIEWED = 'viewed',
  RESPONDED = 'responded',
  REJECTED = 'rejected',
  CLOSED = 'closed',
}

@Entity('inquiries')
@Index(['seeker_id'])
@Index(['listing_id'])
@Index(['owner_id'])
@Index(['status'])
@Index(['created_at'])
export class Inquiry {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false })
  seeker_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seeker_id' })
  seeker: User;

  @Column({ type: 'int', nullable: false })
  listing_id: number;

  @ManyToOne(() => PGListing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listing_id' })
  listing: PGListing;

  @Column({ type: 'int', nullable: false })
  owner_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ type: 'text', nullable: false })
  message: string;

  @Column({
    type: 'enum',
    enum: InquiryStatus,
    default: InquiryStatus.NEW,
  })
  status: InquiryStatus;

  @Column({ type: 'text', nullable: true })
  owner_response: string;

  @Column({ type: 'timestamp', nullable: true })
  viewed_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  responded_at: Date;

  @Column({ type: 'text', nullable: true })
  rejection_reason: string;

  // Seeker details snapshot (in case user deletes account later)
  @Column({ type: 'varchar', length: 255, nullable: true })
  seeker_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  seeker_email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  seeker_phone: string;

  // Additional inquiry details
  @Column({ type: 'date', nullable: true })
  preferred_move_in_date: Date;

  @Column({ type: 'int', nullable: true })
  number_of_people: number;

  @Column({ type: 'int', nullable: true })
  duration_months: number;

  @Column({ type: 'text', nullable: true })
  additional_requirements: string;

  // Contact revealed tracking
  @Column({ type: 'boolean', default: false })
  contact_revealed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  contact_revealed_at: Date;

  // Timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Virtual properties
  get is_new(): boolean {
    return this.status === InquiryStatus.NEW;
  }

  get response_time_hours(): number | null {
    if (!this.responded_at) return null;
    return Math.floor(
      (this.responded_at.getTime() - this.created_at.getTime()) / (1000 * 60 * 60)
    );
  }
}
