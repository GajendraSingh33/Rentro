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
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { PGListing } from './pg-listing.entity';

export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FLAGGED = 'flagged',
}

@Entity('reviews')
@Unique(['user_id', 'listing_id']) // One review per user per listing
@Index(['listing_id'])
@Index(['user_id'])
@Index(['rating'])
@Index(['status'])
@Index(['created_at'])
export class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'int', nullable: false })
  listing_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PGListing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listing_id' })
  listing: PGListing;

  // Overall rating (1-5)
  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: false })
  rating: number;

  // Individual ratings (optional breakdown)
  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  cleanliness_rating: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  amenities_rating: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  location_rating: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  value_for_money_rating: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  owner_response_rating: number;

  // Review content
  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  // Pros and cons (stored as JSON arrays)
  @Column({ type: 'text', nullable: true })
  pros: string; // JSON array of strings

  @Column({ type: 'text', nullable: true })
  cons: string; // JSON array of strings

  // Stay information
  @Column({ type: 'int', nullable: true })
  stay_duration_months: number;

  @Column({ type: 'date', nullable: true })
  stayed_from: Date;

  @Column({ type: 'date', nullable: true })
  stayed_until: Date;

  @Column({ type: 'boolean', default: false })
  is_current_resident: boolean;

  // Verification & status
  @Column({
    type: 'enum',
    enum: ReviewStatus,
    default: ReviewStatus.PENDING,
  })
  status: ReviewStatus;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean; // Verified stay through booking

  // Moderation
  @Column({ type: 'int', nullable: true })
  moderated_by: number;

  @Column({ type: 'timestamp', nullable: true })
  moderated_at: Date;

  @Column({ type: 'text', nullable: true })
  moderation_notes: string;

  // Engagement
  @Column({ type: 'int', default: 0 })
  helpful_count: number;

  @Column({ type: 'int', default: 0 })
  report_count: number;

  // Owner response
  @Column({ type: 'text', nullable: true })
  owner_response: string;

  @Column({ type: 'timestamp', nullable: true })
  owner_responded_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Virtual getters for JSON fields
  get prosList(): string[] {
    try {
      return this.pros ? JSON.parse(this.pros) : [];
    } catch {
      return [];
    }
  }

  set prosList(value: string[]) {
    this.pros = JSON.stringify(value);
  }

  get consList(): string[] {
    try {
      return this.cons ? JSON.parse(this.cons) : [];
    } catch {
      return [];
    }
  }

  set consList(value: string[]) {
    this.cons = JSON.stringify(value);
  }
}
