import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { PgListing } from './pg-listing.entity';
import { User } from './user.entity';

export enum PremiumPlanType {
  FEATURED = 'featured',           // 7 days featured listing
  PREMIUM_30 = 'premium_30',       // 30 days premium
  PREMIUM_90 = 'premium_90',       // 90 days premium
  PREMIUM_365 = 'premium_365',     // 1 year premium
}

export enum PremiumStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

@Entity('premium_listings')
@Index(['listing_id', 'status'])
@Index(['end_date'])
export class PremiumListing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  listing_id: number;

  @ManyToOne(() => PgListing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listing_id' })
  listing: PgListing;

  @Column()
  @Index()
  owner_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({
    type: 'enum',
    enum: PremiumPlanType,
  })
  plan_type: PremiumPlanType;

  @Column({
    type: 'enum',
    enum: PremiumStatus,
    default: PremiumStatus.ACTIVE,
  })
  @Index()
  status: PremiumStatus;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  @Index()
  end_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount_paid: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  payment_id: string;

  @Column({ type: 'int', default: 0 })
  boost_score: number; // Higher score = higher in search results

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
