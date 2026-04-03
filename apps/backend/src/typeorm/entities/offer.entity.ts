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

export enum OfferStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  PAUSED = 'paused',
}

@Entity('offers')
@Index(['listing_id', 'status'])
@Index(['start_date', 'end_date'])
export class Offer {
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

  @Column({ type: 'varchar', length: 255 })
  title: string; // e.g., "Early Bird Discount", "Festive Offer"

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  discount_percent: number; // 1-100

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  @Index()
  end_date: Date;

  @Column({
    type: 'enum',
    enum: OfferStatus,
    default: OfferStatus.ACTIVE,
  })
  @Index()
  status: OfferStatus;

  @Column({ type: 'int', default: 0 })
  redemptions_count: number; // How many times used

  @Column({ type: 'int', nullable: true })
  max_redemptions: number; // Null = unlimited

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
